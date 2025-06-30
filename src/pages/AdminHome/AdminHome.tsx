//ADICIONANDO TextArea para comentar nas O.S
//ADICIONEI BOTÃO DE SALVAR

import React, { useEffect, useState, useMemo } from 'react';
import styles from './AdminHome.module.css';
import { api } from '../../services/api';
import StatusDropdown from '../../components/dropdown/statusdropdown';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  // Removendo pendingChanges para comentario, pois ele terá seu próprio botão de salvar
  // Manter pendingChanges para status, se você quiser que o status ainda seja salvo com o botão geral da linha
  const [pendingStatusChanges, setPendingStatusChanges] = useState<{ [key: number]: OrdemServico['status'] | undefined }>({});


  useEffect(() => {
    const fetchOrdens = async () => {
      try {
        setLoading(true);
        const response = await api.get<OrdemServico[]>('/api/ordemServico/ordens');
        
        // Processar cada ordem para buscar cliente e veículo se não estiverem populados
        const ordensProcessadas = await Promise.all(
          response.data.map(async (os) => {
            let clienteNome = os.cliente_rel?.nome || '';
            let veiculoInfo = os.veiculo_rel
              ? `${os.veiculo_rel.marca} ${os.veiculo_rel.modelo} ${os.veiculo_rel.ano}`
              : 'N/A';

            // Se cliente_rel não veio populado, buscar o nome do cliente
            if (!os.cliente_rel?.nome && os.cliente) {
              try {
                const clienteResp = await api.get<UsuarioRel>(`/api/usuarios/${os.cliente}`);
                clienteNome = clienteResp.data.nome;
              } catch (clienteErr) {
                console.warn(`Erro ao buscar cliente ${os.cliente}:`, clienteErr);
                clienteNome = 'Cliente Desconhecido';
              }
            }

            // Se veiculo_rel não veio populado, buscar os detalhes do veículo
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
              _fetched_cliente_nome: clienteNome, // Armazena o nome buscado
              _fetched_veiculo_info: veiculoInfo, // Armazena a info do veículo buscada
            };
          })
        );

        setOrdens(ordensProcessadas);
        setOrdensFiltradas(ordensProcessadas); // Inicializa ordensFiltradas aqui também
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

  // useEffect para aplicar o filtro de busca
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
  }, [textoBusca, ordens]); // Depende de textoBusca e ordens

  // NOVO useEffect para resetar a página APENAS quando o texto de busca muda
  useEffect(() => {
    setCurrentPage(1);
  }, [textoBusca]); // Depende apenas de textoBusca

  //Mudei a data para PT-BR
  const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const adjustedDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  return adjustedDate.toLocaleDateString('pt-BR');
};

  // Função para lidar com a mudança no comentário (agora atualiza diretamente o estado 'ordens')
  const handleComentarioChange = (id: number, comentario: string) => {
    setOrdens(prev => prev.map(os => os.id === id ? { ...os, comentario } : os));
    // Não precisa atualizar ordensFiltradas aqui, pois o useEffect de filtro já fará isso
    // setOrdensFiltradas(prev => prev.map(os => os.id === id ? { ...os, comentario } : os));
  };

  // Função para lidar com a mudança no status (ainda usa pendingStatusChanges)
  const handleStatusChange = (id: number, newStatus: OrdemServico['status']) => {
    setPendingStatusChanges(prev => ({
      ...prev,
      [id]: newStatus
    }));
    // Atualiza o estado local das ordens para refletir a mudança imediatamente na UI
    setOrdens(prev => prev.map(os => os.id === id ? { ...os, status: newStatus } : os));
    // Não precisa atualizar ordensFiltradas aqui, pois o useEffect de filtro já fará isso
    // setOrdensFiltradas(prev => prev.map(os => os.id === id ? { ...os, status: newStatus } : os));
  };

  // Nova função para salvar APENAS o comentário de uma OS específica
  const handleSaveComentario = async (osId: number, comentario: string | null | undefined) => {
    try {
      // Mapeia 'comentario' do frontend para 'descricao' do backend
      // Mantendo PATCH como discutido, pois é mais adequado para atualização parcial
      await api.put(`/api/ordemServico/${osId}`, { descricao: comentario }); 
      toast.success('Descrição salvo com sucesso!');
    } catch (error) {
      console.error(`Erro ao salvar comentário para OS ${osId}:`, error);
      toast.error('Erro ao salvar comentário (descrição).');
    }
  };

  // Função para salvar APENAS o status de uma OS específica (chamada pelo botão geral da linha)
  const handleSaveStatus = async (osId: number) => {
    const newStatus = pendingStatusChanges[osId];
    if (newStatus === undefined) {
      toast.info('Nenhuma alteração de status pendente para salvar.');
      return;
    }

    try {
      await api.patch(`/api/ordemServico/status/${osId}`, { status: newStatus });
      toast.success('Status atualizado com sucesso!');
      // Limpa a alteração pendente de status após o sucesso
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


  // --- Estados para Paginação ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); //  ajustei este valor das quantidades de linhas vai mostrar de O.S
  // --- Fim Estados para Paginação ---

  // --- Lógica de Paginação ---
  const totalPages = Math.ceil(ordensFiltradas.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return ordensFiltradas.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, itemsPerPage, ordensFiltradas]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };
  // --- Fim Lógica de Paginação ---


  if (loading) {
    return <div className={styles.loading}>Carregando ordens de serviço...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>
          <i className={`fas fa-clipboard-list ${styles.iconClipboard}`}></i>
          Ordens de Serviço
        </h1>
        <div className={styles.searchBar}>
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Busca..."
            value={textoBusca}
            onChange={(e) => setTextoBusca(e.target.value)}
          />
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
              <th>Data</th>
              <th>Descrição</th>
              <th>Ações</th> 
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? ( // Usar currentItems para renderizar
              currentItems.map((os) => (
                <tr key={os.id}>
                  <td>{`OS-${String(os.id).padStart(3, '0')}`}</td>
                  <td>
                    <span
                      className={`${styles.userStatus} ${
                        !os.cliente_rel?.deletado ? styles.active : styles.inactive
                      }`}
                    ></span>
                    {/* Exibe o nome buscado, ou o que veio da API, ou um fallback */}
                    {os._fetched_cliente_nome || os.cliente_rel?.nome || 'N/A'}
                  </td>
                  <td>
                    {/* Exibe a info do veículo buscada, ou o que veio da API, ou um fallback */}
                    {os._fetched_veiculo_info || (os.veiculo_rel
                      ? `${os.veiculo_rel.marca} ${os.veiculo_rel.modelo} ${os.veiculo_rel.ano}`
                      : 'N/A')}
                  </td>
                  <td>
                    <StatusDropdown
                      currentStatus={os.status}
                      onChange={(newStatus) => handleStatusChange(os.id, newStatus)}
                    />
                  </td>
                  <td>{formatDate(os.dataInicio)}</td>
                  <td>
                    {/* Coluna da Descrição com textarea e botão Salvar individual */}
                    <div className={styles.descriptionCell}>
                      <textarea
                        className={styles.textarea}
                        value={os.comentario || ''}
                        onChange={(e) => handleComentarioChange(os.id, e.target.value)}
                        placeholder="comentário..."
                        rows={6}
                      />
                      <button
                        className={styles.saveComentarioButton} // Nova classe para estilização
                        onClick={() => handleSaveComentario(os.id, os.comentario)}
                      >
                        Salvar Descrição
                      </button>
                    </div>
                  </td>
                  <td>
                    {/* Botão Salvar Status (se houver alteração pendente de status) */}
                    <button
                      className={styles.saveButton}
                      onClick={() => handleSaveStatus(os.id)}
                      // Desabilita o botão se não houver alteração de status pendente para esta OS
                      disabled={pendingStatusChanges[os.id] === undefined}
                    >
                      Salvar Status
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className={styles.noData}> {/* Colspan ajustado para 7 colunas */}
                  Nenhuma ordem de serviço encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- Controles de Paginação --- */}
      {totalPages > 0 && ( // Mostra a paginação se houver pelo menos uma página
        <div className={styles.pagination}>
          {/* Botão para ir para a primeira página (<<) */}
          <button onClick={() => paginate(1)} disabled={currentPage === 1}>
            &lt;&lt;
          </button>
          {/* Botão para ir para a página anterior (<) */}
          <button onClick={goToPrevPage} disabled={currentPage === 1}>
            &lt;
          </button>

          {/* Exibição da página atual e total de páginas */}
          <span className={styles.paginationInfo}>
            ({currentPage} of {totalPages})
          </span>

          {/* Botão para ir para a próxima página (>) */}
          <button onClick={goToNextPage} disabled={currentPage === totalPages}>
            &gt;
          </button>
          {/* Botão para ir para a última página (>>) */}
          <button onClick={() => paginate(totalPages)} disabled={currentPage === totalPages}>
            &gt;&gt;
          </button>
        </div>
      )}
      {/* --- Fim Controles de Paginação --- */}

      {/* O ToastContainer deve estar no nível mais alto do seu componente ou no App.tsx */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default AdminHomePage;
