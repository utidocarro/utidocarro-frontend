/*import React, { useEffect, useState } from 'react';
import styles from './AdminHome.module.css';
import { api } from '../../services/api'; // Ajuste o caminho se necessário




interface UsuarioRel {
  id_usuario: number;
  nome: string;
  deletado: boolean; // Usaremos para status ativo/inativo
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
  veiculo: number | null;
  cliente: number;
  feedback?: string | null;
  deletado: boolean;
  cliente_rel: UsuarioRel;
  veiculo_rel: VeiculoRel | null;
}

const AdminHomePage: React.FC = () => {
  const [ordens, setOrdens] = useState<OrdemServico[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchOrdens = async () => {
      try {
        setLoading(true);
        const response = await api.get<OrdemServico[]>('/api/ordemServico/ordens');
        setOrdens(response.data);
        setError(null);
      } catch (err) {
        console.error("Erro ao buscar ordens de serviço:", err);
        setError('Falha ao carregar ordens de serviço.');
      }
      setLoading(false);
    };

    fetchOrdens();
  }, []);


  const formatStatusOS = (status: OrdemServico['status']) => {
    return status.replace('_', ' ');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  if (loading) {
    return <div className={styles.loading}>Carregando ordens de serviço...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1><i className={`fas fa-clipboard-list ${styles.iconClipboard}`}></i> Ordens de Serviço</h1>
        <div className={styles.searchBar}>
          <i className="fas fa-search"></i>
          <input type="text" placeholder="Buscar O.S..." />
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
            </tr>
          </thead>
          <tbody>
            {ordens.length > 0 ? (
              ordens.map((os) => (
                <tr key={os.id}>
                  <td className={styles.colIdOs}>{`OS-${String(os.id).padStart(3, '0')}`}</td>
                  <td>
                    <span 
                      className={`${styles.userStatus} ${!os.cliente_rel.deletado ? styles.active : styles.inactive}`}>
                    </span>
                    {os.cliente_rel.nome}
                  </td>
                  <td>{os.veiculo_rel ? `${os.veiculo_rel.marca} ${os.veiculo_rel.modelo} ${os.veiculo_rel.ano}` : 'N/A'}</td>
                  <td>
                    <span className={`${styles.status} ${styles[os.status.toLowerCase().replace('_', '')]}`}>
                      {formatStatusOS(os.status)}
                    </span>
                  </td>
                  <td className={styles.colData}>{formatDate(os.dataInicio)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className={styles.noData}>Nenhuma ordem de serviço encontrada.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHomePage;*/
/*
import React, { useEffect, useState } from 'react';
import styles from './AdminHome.module.css';
import { api } from '../../services/api';
import StatusDropdown from '../../components/dropdown/statusdropdown';

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
  veiculo: number | null;
  cliente: number;
  feedback?: string | null;
  deletado: boolean;
  cliente_rel: UsuarioRel;
  veiculo_rel: VeiculoRel | null;
}

const AdminHomePage: React.FC = () => {
  const [ordens, setOrdens] = useState<OrdemServico[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [textoBusca, setTextoBusca] = useState<string>('');

  const fetchOrdens = async (filtro?: string) => {
    try {
      setLoading(true);
      const response = await api.get<OrdemServico[]>('/api/ordemServico/ordens', {
        params: { filtro: filtro || '' },
      });
      setOrdens(response.data);
      setError(null);
    } catch (err) {
      console.error('Erro ao buscar ordens de serviço:', err);
      setError('Falha ao carregar ordens de serviço.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrdens();
  }, []);

  const handleBuscar = () => {
    fetchOrdens(textoBusca);
  };

  const formatStatusOS = (status: OrdemServico['status']) => {
    return status.replace('_', ' ');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

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
          <i className={`fas fa-clipboard-list ${styles.iconClipboard}`}></i> Ordens de Serviço
        </h1>
        <div className={styles.searchBar}>
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Buscar O.S..."
            value={textoBusca}
            onChange={(e) => setTextoBusca(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleBuscar();
              }
            }}
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
            </tr>
          </thead>
          <tbody>
            {ordens.length > 0 ? (
              ordens.map((os) => (
                <tr key={os.id}>
                  <td className={styles.colIdOs}>{`OS-${String(os.id).padStart(3, '0')}`}</td>
                  <td>
                    <span
                      className={`${styles.userStatus} ${
                        !os.cliente_rel.deletado ? styles.active : styles.inactive
                      }`}
                    ></span>
                    {os.cliente_rel.nome}
                  </td>
                  <td>
                    {os.veiculo_rel
                      ? `${os.veiculo_rel.marca} ${os.veiculo_rel.modelo} ${os.veiculo_rel.ano}`
                      : 'N/A'}
                  </td>
                  <td>
                    <StatusDropdown
                      currentStatus={os.status}
                      onChange={async (newStatus) => {
                        try {
                          await api.patch(`/api/ordemServico/${os.id}`, {
                            status: newStatus,
                          });

                          setOrdens((prev) =>
                            prev.map((ordem) =>
                              ordem.id === os.id ? { ...ordem, status: newStatus } : ordem
                            )
                          );
                        } catch (error) {
                          console.error('Erro ao atualizar status:', error);
                          alert('Erro ao atualizar status');
                        }
                      }}
                    />
                  </td>
                  <td className={styles.colData}>{formatDate(os.dataInicio)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className={styles.noData}>
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

export default AdminHomePage;*/

import React, { useEffect, useState } from 'react';
import styles from './AdminHome.module.css';
import { api } from '../../services/api';
import StatusDropdown from '../../components/dropdown/statusdropdown';

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
  veiculo: number | null;
  cliente: number;
  feedback?: string | null;
  deletado: boolean;
  cliente_rel: UsuarioRel;
  veiculo_rel: VeiculoRel | null;
}

const AdminHomePage: React.FC = () => {
  const [ordens, setOrdens] = useState<OrdemServico[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [textoBusca, setTextoBusca] = useState<string>('');

  const fetchOrdens = async (filtro?: string) => {
    try {
      setLoading(true);
      const response = await api.get<OrdemServico[]>('/api/ordemServico/ordens', {
        params: { filtro: filtro || '' },
      });
      setOrdens(response.data);
      setError(null);
    } catch (err) {
      console.error("Erro ao buscar ordens de serviço:", err);
      setError('Falha ao carregar ordens de serviço.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrdens();
  }, []);

  const handleBuscar = () => {
    fetchOrdens(textoBusca);
  };

  const formatStatusOS = (status: OrdemServico['status']) => {
    return status.replace('_', ' ');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

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
          {' '}Ordens de Serviço
        </h1>
        <div className={styles.searchBar}>
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Buscar O.S..."
            value={textoBusca}
            onChange={(e) => setTextoBusca(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleBuscar();
              }
            }}
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
            </tr>
          </thead>
          <tbody>
            {ordens.length > 0 ? (
              ordens.map((os) => (
                <tr key={os.id}>
                  <td className={styles.colIdOs}>{`OS-${String(os.id).padStart(3, '0')}`}</td>
                  <td>
                    <span 
                      className={`${styles.userStatus} ${!os.cliente_rel.deletado ? styles.active : styles.inactive}`}>
                    </span>
                    {os.cliente_rel.nome}
                  </td>
                  <td>
                    {os.veiculo_rel
                      ? `${os.veiculo_rel.marca} ${os.veiculo_rel.modelo} ${os.veiculo_rel.ano}`
                      : 'N/A'}
                  </td>
                  <td>
                    <div>
                      <StatusDropdown
                        currentStatus={os.status}
                        onChange={async (newStatus) => {
                          try {
                            await api.put(`/api/ordemServico/${os.id}`, {
                              status: newStatus,
                            });
                           setOrdens((prev) =>
                              prev.map((ordem) =>
                                ordem.id === os.id ? { ...ordem, status: newStatus } : ordem
                              )
                            );
                            await api.put(`/api/ordemServico/${os.id}`, {
  status: newStatus,
});
fetchOrdens(textoBusca); // Refaz a busca para atualizar tudo corretamente
                            
                          } catch (error) {
                            console.error('Erro ao atualizar status:', error);
                            alert('Erro ao atualizar status');
                          }
                        }}
                      />
                      <div className={styles.statusText}>
                        {formatStatusOS(os.status)}
                      </div>
                    </div>
                  </td>
                  <td className={styles.colData}>{formatDate(os.dataInicio)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className={styles.noData}>
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

export default AdminHomePage;


