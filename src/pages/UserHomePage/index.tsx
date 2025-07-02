/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import { api } from '../../services/api';
import { useGlobalStore } from '@/storage/useGlobalStorage';
import { toast } from 'react-toastify';
import ModalTiposServico from '../../components/modals/ServicesTypesModal/index';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

interface Veiculo {
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
  dataFim: string;
  status: 'Em_Andamento' | 'Pendente' | 'Pausado' | 'Fechado' | 'Cancelado';
  veiculo: number | null;
  cliente: number;
  feedback?: string | null;
  deletado: boolean;
  veiculo_rel?: Veiculo | null;
  veiculo_nome?: string;
}

const HomeUsuarioPage: React.FC = () => {
  const [ordens, setOrdens] = useState<OrdemServico[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ordemSelecionada, setOrdemSelecionada] = useState<number | null>(null);

  const { user } = useGlobalStore();

  const fetchOrdensUsuario = async () => {
    try {
      setLoading(true);

      if (!user?.id_usuario) {
        setError('Usuário não autenticado.');
        return;
      }

      const response = await api.get<OrdemServico[]>(
        `/api/ordemServico/busca_cliente/${user.id_usuario}`,
      );

      const ordensComVeiculo = await Promise.all(
        response.data.map(async (os) => {
          let veiculo_nome = 'N/A';

          if (os.veiculo !== null) {
            try {
              const veiculoResp = await api.get<Veiculo>(
                `/api/veiculos/${os.veiculo}`,
              );
              veiculo_nome = `${veiculoResp.data.marca} ${veiculoResp.data.modelo} ${veiculoResp.data.ano}`;
            } catch (veiculoErr) {
              console.warn(`Erro ao buscar veículo ${os.veiculo}:`, veiculoErr);
            }
          }

          return {
            ...os,
            veiculo_nome,
          };
        }),
      );

      setOrdens(ordensComVeiculo);
      setError(null);
    } catch (err) {
      console.error('Erro ao buscar ordens do cliente:', err);
      setError('Falha ao carregar ordens de serviço.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrdensUsuario();
  }, []);

  const formatStatusOS = (status: OrdemServico['status']) => {
    return status.replace('_', ' ');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const adjustedDate = new Date(
      date.getTime() + date.getTimezoneOffset() * 60000,
    );
    return adjustedDate.toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <div className={styles.loading}>Carregando ordens de serviço...</div>
    );
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 style={{ textAlign: 'center' }}>
          <i className={`fas fa-clipboard-list ${styles.iconClipboard}`}></i>{' '}
          Minhas Ordens de Serviço
        </h1>
      </div>

      <div style={{backgroundColor: '#292C2D'}} className={styles.osList}>
        <DataTable
          style={{backgroundColor: '#292C2D' }}
          value={ordens}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 20]}
          emptyMessage='Nenhuma ordem de serviço encontrada.'
          className={styles.dataTableCustom}
        >
          <Column
            field='id'
            header='ID O.S'
            body={(rowData) => `OS-${String(rowData.id).padStart(3, '0')}`}
            style={{ textAlign: 'center', backgroundColor: '#292C2D' }}
          />
          <Column
            field='descricao'
            header='Nome'
            style={{textAlign: 'left', backgroundColor: '#292C2D'}}
          />
          <Column
            field='veiculo_nome'
            header='Veículo'
            style={{ textAlign: 'left', backgroundColor: '#292C2D' }}
          />
          <Column
            field='status'
            header='Status'
            body={(rowData) => (
              <span
                className={`${styles.status} ${styles[rowData.status.toLowerCase().replace('_', '')]}`}
              >
                {formatStatusOS(rowData.status)}
              </span>
            )}
            style={{ textAlign: 'center', backgroundColor: '#292C2D' }}
          />
          <Column
            field='dataInicio'
            header='Data do Início do Serviço'
            body={(rowData) => formatDate(rowData.dataInicio)}
            style={{ textAlign: 'center', backgroundColor: '#292C2D' }}
          />
          <Column
            field='dataFim'
            header='Data do Fim do Serviço'
            body={(rowData) => formatDate(rowData.dataFim)}
            style={{ textAlign: 'center', backgroundColor: '#292C2D' }}
          />
          <Column
            style={{backgroundColor: '#292C2D', textAlign: 'center'}}
            header='Feedback'
            body={(rowData) => (
              <div style={{ textAlign: 'center', backgroundColor: '#292C2D' }}>
                <textarea
                  className={styles.feedbackTextarea}
                  rows={3}
                  value={rowData.feedback ?? ''}
                  onChange={(e) =>
                    setOrdens((prev) =>
                      prev.map((item) =>
                        item.id === rowData.id
                          ? { ...item, feedback: e.target.value }
                          : item,
                      ),
                    )
                  }
                />
                <button
                  className={styles.feedbackButton}
                  onClick={async () => {
                    try {
                      await api.put(`/api/ordemServico/${rowData.id}`, {
                        feedback: rowData.feedback,
                      });
                      toast.success('Feedback salvo com sucesso!');
                    } catch {
                      toast.error('Erro ao salvar feedback!');
                    }
                  }}
                >
                  Salvar
                </button>
              </div>
            )}
          />
          <Column
            header='Tipos de Serviço'
            body={(rowData) => (
              <button
                onClick={() => setOrdemSelecionada(rowData.id)}
                className={styles.feedbackButton}
              >
                Ver Serviços
              </button>
            )}
            style={{ textAlign: 'center', backgroundColor: '#292C2D' }}
          />
        </DataTable>
      </div>

      {/* Modal de Tipos de Serviço */}
      {ordemSelecionada !== null && (
        <ModalTiposServico
          ordemId={ordemSelecionada}
          onClose={() => setOrdemSelecionada(null)}
        />
      )}
    </div>
  );
};

export default HomeUsuarioPage;
