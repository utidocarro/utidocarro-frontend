/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import { api } from '../../services/api';
import { useGlobalStore } from '@/storage/useGlobalStorage';
import { toast } from 'react-toastify';

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
  veiculo_nome?: string; // <- Novo campo só para exibição
}

const HomeUsuarioPage: React.FC = () => {
  const [ordens, setOrdens] = useState<OrdemServico[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    return date.toLocaleDateString('pt-BR');
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

      <div className={styles.osList}>
        <table>
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>ID O.S</th>
              <th style={{ textAlign: 'center' }}>Nome</th>
              <th style={{ textAlign: 'center' }}>Veículo</th>
              <th style={{ textAlign: 'center' }}>Status</th>
              <th style={{ textAlign: 'center' }}>Data do Início do Serviço</th>
              <th style={{ textAlign: 'center' }}>Data do Fim do Serviço</th>
              <th style={{ textAlign: 'center' }}>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {ordens.length > 0 ? (
              ordens.map((os) => (
                <tr key={os.id}>
                  <td
                    style={{ textAlign: 'center' }}
                    className={styles.colIdOs}
                  >
                    {`OS-${String(os.id).padStart(3, '0')}`}
                  </td>
                  <td style={{ textAlign: 'center' }}>{os.descricao}</td>
                  <td style={{ textAlign: 'center' }}>{os.veiculo_nome}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span
                      className={`${styles.status} ${styles[os.status.toLowerCase().replace('_', '')]}`}
                    >
                      {formatStatusOS(os.status)}
                    </span>
                  </td>
                  <td
                    style={{ textAlign: 'center' }}
                    className={styles.colData}
                  >
                    {formatDate(os.dataInicio)}
                  </td>
                  <td
                    style={{ textAlign: 'center' }}
                    className={styles.colData}
                  >
                    {formatDate(os.dataFim)}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <textarea
                      className={styles.feedbackTextarea}
                      rows={3}
                      value={os.feedback ?? ''}
                      onChange={(e) =>
                        setOrdens((prev) =>
                          prev.map((item) =>
                            item.id === os.id
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
                          await api.put(`/api/ordemServico/${os.id}`, {
                            feedback: os.feedback,
                          });
                          toast.success('Feedback salvo com sucesso!');
                          setOrdens((prev) =>
                            prev.map((item) =>
                              item.id === os.id
                                ? { ...item, feedback: os.feedback }
                                : item,
                            ),
                          );
                        } catch {
                          toast.error('Erro ao salvar feedback!');
                        }
                      }}
                    >
                      Salvar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className={styles.noData}>
                  Nenhuma ordem de serviço encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomeUsuarioPage;
