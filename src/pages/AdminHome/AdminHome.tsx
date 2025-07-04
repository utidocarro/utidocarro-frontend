//ADICIONANDO TextArea para comentar nas O.S
//ADICIONEI BOTÃO DE SALVAR

import React, { useEffect, useState, useMemo } from 'react';
import styles from './AdminHome.module.css';
import { api } from '../../services/api';
import StatusDropdown from '../../components/dropdown/statusdropdown';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// --- Novas Interfaces para os Serviços ---
interface TipoServico {
  id: number;
  nome: string;
  valor: string; // O valor vem como string do backend
}

interface Orcamento {
  id: number;
  OS: number;
  valorTotal: string;
  detalhes: string | null;
}

interface ServicosDaOS {
  tiposServico: TipoServico[];
  orcamento: Orcamento;
}
// --- Fim Novas Interfaces ---

interface UsuarioRel {
  id_usuario: number;
  nome: string;
  deletado: boolean;
}

interface VeiculoRel {
  id: number;
  modelo: string;
  marca: string;
  placa: string;
  ano: number;
}

interface OrdemServico {
  id: number;
  descricao: string;
  dataInicio: string;
  dataFim?: string | null;
  status: 'Em_Andamento' | 'Pendente' | 'Pausado' | 'Fechado' | 'Cancelado';
  veiculo: number | null; // ID do veículo
  cliente: number; // ID do cliente
  feedback?: string | null;
  comentario?: string | null; // Este é o campo que você usa no frontend para o textarea
  deletado: boolean;
  cliente_rel?: UsuarioRel; // Pode vir populado ou não
  veiculo_rel?: VeiculoRel | null; // Pode vir populado ou não
  // Campos temporários para armazenar os dados buscados no frontend
  _fetched_cliente_nome?: string;
  _fetched_veiculo_info?: string;
}

const AdminHomePage: React.FC = () => {
  const [ordens, setOrdens] = useState<OrdemServico[]>([]);
  const [ordensFiltradas, setOrdensFiltradas] = useState<OrdemServico[]>([]);
  const [textoBusca, setTextoBusca] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingStatusChanges, setPendingStatusChanges] = useState<{ [key: number]: OrdemServico['status'] | undefined }>({});

  // --- Novos Estados para o Modal de Serviços ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOsId, setSelectedOsId] = useState<number | null>(null);
  const [servicos, setServicos] = useState<ServicosDaOS | null>(null);
  const [loadingServicos, setLoadingServicos] = useState(false);
  // --- Fim Novos Estados ---


  useEffect(() => {
    const fetchOrdens = async () => {
      try {
        setLoading(true);
        const response = await api.get<OrdemServico[]>('/api/ordemServico/ordens');
        
        const ordensProcessadas = await Promise.all(
          response.data.map(async (os) => {
            let clienteNome = os.cliente_rel?.nome || '';
            let veiculoInfo = os.veiculo_rel
              ? `${os.veiculo_rel.marca} ${os.veiculo_rel.modelo} ${os.veiculo_rel.ano}`
              : 'N/A';

            if (!os.cliente_rel?.nome && os.cliente) {
              try {
                const clienteResp = await api.get<UsuarioRel>(`/api/usuarios/${os.cliente}`);
                clienteNome = clienteResp.data.nome;
              } catch (clienteErr) {
                console.warn(`Erro ao buscar cliente ${os.cliente}:`, clienteErr);
                clienteNome = 'Cliente Desconhecido';
              }
            }

            if (!os.veiculo_rel && os.veiculo !== null) {
              try {
                const veiculoResp = await api.get<VeiculoRel>(`/api/veiculos/${os.veiculo}`);
                veiculoInfo = `${veiculoResp.data.marca} ${veiculoResp.data.modelo} ${veiculoResp.data.ano}`;
              } catch (veiculoErr) {
                console.warn(`Erro ao buscar veículo ${os.veiculo}:`, veiculoErr);
                veiculoInfo = 'N/A';
              }
            }

            return {
              ...os,
              _fetched_cliente_nome: clienteNome,
              _fetched_veiculo_info: veiculoInfo,
              comentario: os.descricao,
            };
          })
        );

        setOrdens(ordensProcessadas);
        setOrdensFiltradas(ordensProcessadas);
        setError(null);
      } catch (err) {
        console.error('Erro ao buscar ordens de serviço:', err);
        setError('Falha ao carregar ordens de serviço.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrdens();
  }, []);

  useEffect(() => {
    const texto = textoBusca.toLowerCase();
    const filtradas = ordens.filter((os) => {
      const idOS = `OS-${String(os.id).padStart(3, '0')}`;
      const nomeCliente = (os._fetched_cliente_nome || os.cliente_rel?.nome || '').toLowerCase();
      const veiculo = (os._fetched_veiculo_info || (os.veiculo_rel ? `${os.veiculo_rel.marca} ${os.veiculo_rel.modelo} ${os.veiculo_rel.ano}` : '')).toLowerCase();
      const status = os.status.toLowerCase().replace('_', ' ');
      return (
        idOS.includes(texto) ||
        nomeCliente.includes(texto) ||
        veiculo.includes(texto) ||
        status.includes(texto)
      );
    });
    setOrdensFiltradas(filtradas);
  }, [textoBusca, ordens]);

  useEffect(() => {
    setCurrentPage(1);
  }, [textoBusca]);

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'N/A'; // Retorna N/A se a data for nula ou indefinida
    const date = new Date(dateString);
    const adjustedDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    return adjustedDate.toLocaleDateString('pt-BR');
  };

  const handleComentarioChange = (id: number, comentario: string) => {
    setOrdens(prev => prev.map(os => os.id === id ? { ...os, comentario } : os));
  };

  const handleStatusChange = (id: number, newStatus: OrdemServico['status']) => {
    setPendingStatusChanges(prev => ({ ...prev, [id]: newStatus }));
    setOrdens(prev => prev.map(os => os.id === id ? { ...os, status: newStatus } : os));
  };

  const handleSaveComentario = async (osId: number, comentario: string | null | undefined) => {
    try {
      await api.put(`/api/ordemServico/${osId}`, { descricao: comentario });
      toast.success('Descrição salva com sucesso!');
      setOrdens(prev => prev.map(os => os.id === osId ? { ...os, comentario } : os));
    } catch (error) {
      console.error(`Erro ao salvar comentário para OS ${osId}:`, error);
      toast.error('Erro ao salvar comentário (descrição).');
    }
  };

  const handleSaveStatus = async (osId: number) => {
    const newStatus = pendingStatusChanges[osId];
    if (newStatus === undefined) {
      toast.info('Nenhuma alteração de status pendente para salvar.');
      return;
    }
    try {
      await api.patch(`/api/ordemServico/status/${osId}`, { status: newStatus });
      toast.success('Status atualizado com sucesso!');
      setPendingStatusChanges(prev => {
        const newPending = { ...prev };
        delete newPending[osId];
        return newPending;
      });
    } catch (error) {
      console.error(`Erro ao salvar status para OS ${osId}:`, error);
      toast.error('Erro ao salvar status.');
    }
  };

  // --- Novas Funções para o Modal ---
  const handleVerServicosClick = async (osId: number) => {
    setSelectedOsId(osId);
    setIsModalOpen(true);
    setLoadingServicos(true);
     try {
      // --- INÍCIO DA LÓGICA CORRETA DE BUSCA ---

      // 1. Buscar as associações de serviço para a OS
      const assocRes = await api.get<{ id_tipo_servico: number }[]>(
        `/api/associacao/porOrdem/${osId}`,
      );

      // 2. Para cada associação, buscar os detalhes do tipo de serviço
      const tiposCompletos: TipoServico[] = await Promise.all(
        assocRes.data.map(async ({ id_tipo_servico }) => {
          const tipoRes = await api.get(
            `/api/tiposervico/${id_tipo_servico}`,
          );
          return {
            id: tipoRes.data.id,
            nome: tipoRes.data.nome,
            valor: String(tipoRes.data.valor ?? 0), // Converte para string para corresponder à interface
          };
        }),
      );

      // 3. Buscar o orçamento
      const totalRes = await api.get(
        `/api/orcamentos/ordemservico/${osId}`,
      );
      const orcamento = totalRes.data[0]; // Pega o primeiro orçamento da lista

      // 4. Montar o objeto 'ServicosDaOS' para o estado
      if (orcamento) {
        setServicos({
          tiposServico: tiposCompletos,
          orcamento: {
            id: orcamento.id,
            OS: orcamento.OS,
            valorTotal: String(orcamento.valorTotal ?? 0), // Converte para string
            detalhes: orcamento.detalhes,
          },
        });
      } else {
        // Se não houver orçamento, ainda exibe os serviços
        setServicos({
          tiposServico: tiposCompletos,
          orcamento: {
            id: 0,
            OS: osId,
            valorTotal: tiposCompletos.reduce((acc, tipo) => acc + Number(tipo.valor), 0).toString(), // Calcula o total se não houver orçamento
            detalhes: null,
          },
        });
      }
      // --- FIM DA LÓGICA CORRETA DE BUSCA ---

    } catch (err) {
      console.error(`Erro ao buscar serviços para OS ${osId}:`, err);
      toast.error('Erro ao buscar serviços.');
      setServicos(null); // Limpa os serviços em caso de erro
    } finally {
      setLoadingServicos(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOsId(null);
    setServicos(null);
  };
  // --- Fim Novas Funções ---

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const totalPages = Math.ceil(ordensFiltradas.length / itemsPerPage);
  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return ordensFiltradas.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, itemsPerPage, ordensFiltradas]);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const goToNextPage = () => { if (currentPage < totalPages) setCurrentPage(prev => prev + 1); };
  const goToPrevPage = () => { if (currentPage > 1) setCurrentPage(prev => prev - 1); };

  if (loading) return <div className={styles.loading}>Carregando ordens de serviço...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1><i className={`fas fa-clipboard-list ${styles.iconClipboard}`}></i>Ordens de Serviço</h1>
        <div className={styles.searchBar}>
          <i className="fas fa-search"></i>
          <input type="text" placeholder="Busca..." value={textoBusca} onChange={(e) => setTextoBusca(e.target.value)} />
        </div>
      </div>

      <div className={styles.osList}>
        <table>
          <thead>
            <tr>
              <th>ID O.S</th>
              <th>Nome</th>
              <th>Veículo</th>
              <th>Status</th>
              <th>Data do início do serviço</th>
              <th>Data do fim do serviço</th>
              <th>Tipo de Serviço</th>
              <th>Descrição</th>
              <th>Salvar</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((os) => (
                <tr key={os.id}>
                  <td data-label="ID O.S">{`OS-${String(os.id).padStart(3, '0')}`}</td>
                  <td data-label="Nome">
                    <span className={`${styles.userStatus} ${!os.cliente_rel?.deletado ? styles.active : styles.inactive}`}></span>
                    {os._fetched_cliente_nome || os.cliente_rel?.nome || 'N/A'}
                  </td>
                  <td data-label="Veículo">
                    {os._fetched_veiculo_info || (os.veiculo_rel ? `${os.veiculo_rel.marca} ${os.veiculo_rel.modelo} ${os.veiculo_rel.ano}` : 'N/A')}
                  </td>
                  <td data-label="Status">
                    <StatusDropdown currentStatus={os.status} onChange={(newStatus) => handleStatusChange(os.id, newStatus)} />
                  </td>
                  <td data-label="Data Início">{formatDate(os.dataInicio)}</td>
                  <td data-label="Data Fim">{formatDate(os.dataFim)}</td>
                  <td data-label="Tipo de Serviço">
                    <button className={styles.verServicosButton} onClick={() => handleVerServicosClick(os.id)}>
                      Ver Serviços
                    </button>
                  </td>
                  <td data-label="Descrição">
                    <div className={styles.descriptionCell}>
                      <textarea className={styles.textarea} value={os.comentario || ''} onChange={(e) => handleComentarioChange(os.id, e.target.value)} placeholder="comentário..." rows={6} />
                      <button className={styles.saveComentarioButton} onClick={() => handleSaveComentario(os.id, os.comentario)}>Salvar Descrição</button>
                    </div>
                  </td>
                  <td data-label="Ações">
                    <button className={styles.saveButton} onClick={() => handleSaveStatus(os.id)} disabled={pendingStatusChanges[os.id] === undefined}>Salvar Status</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={9} className={styles.noData}>Nenhuma ordem de serviço encontrada.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 0 && (
        <div className={styles.pagination}>
          <button onClick={() => paginate(1)} disabled={currentPage === 1}>&lt;&lt;</button>
          <button onClick={goToPrevPage} disabled={currentPage === 1}>&lt;</button>
          <span className={styles.paginationInfo}>({currentPage} of {totalPages})</span>
          <button onClick={goToNextPage} disabled={currentPage === totalPages}>&gt;</button>
          <button onClick={() => paginate(totalPages)} disabled={currentPage === totalPages}>&gt;&gt;</button>
        </div>
      )}

      {/* --- Modal de Serviços --- */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            {loadingServicos ? (
              <p>Carregando serviços...</p>
            ) : servicos ? (
              <>
                <h2>Serviços da OS-{String(selectedOsId).padStart(3, '0')}</h2>
                <ul className={styles.servicosList}>
                  {servicos.tiposServico.map(servico => (
                    <li key={servico.id}>
                      <span>{servico.nome}</span>
                      <span>R$ {parseFloat(servico.valor).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className={styles.orcamentoTotal}>
                  <strong>Orçamento Total:</strong>
                  <strong>R$ {parseFloat(servicos.orcamento.valorTotal).toFixed(2)}</strong>
                </div>
                <button className={styles.modalCloseButton} onClick={closeModal}>
                  Fechar
                </button>
              </>
            ) : (
              <>
                <h2>Serviços da OS-{String(selectedOsId).padStart(3, '0')}</h2>
                <p>Nenhum serviço encontrado para esta Ordem de Serviço.</p>
                <button className={styles.modalCloseButton} onClick={closeModal}>
                  Fechar
                </button>
              </>
            )}
          </div>
        </div>
      )}
      {/* --- Fim Modal --- */}

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default AdminHomePage;
