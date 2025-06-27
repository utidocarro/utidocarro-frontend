import React, { useEffect, useState } from 'react';
import { api } from '@/services/api';
import styles from './style.module.css';

interface TipoServico {
  id: number;
  nome: string;
  valor: number;
}

interface Props {
  ordemId: number;
  onClose: () => void;
}

const ModalTiposServico: React.FC<Props> = ({ ordemId, onClose }) => {
  const [tipos, setTipos] = useState<TipoServico[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        setLoading(true);

        const assocRes = await api.get<{ id_tipo_servico: number }[]>(
          `/api/associacao/porOrdem/${ordemId}`,
        );

        const tiposCompletos: TipoServico[] = await Promise.all(
          assocRes.data.map(async ({ id_tipo_servico }) => {
            const tipoRes = await api.get(
              `/api/tiposervico/${id_tipo_servico}`,
            );
            return {
              id: tipoRes.data.id,
              nome: tipoRes.data.nome,
              valor: Number(tipoRes.data.valor ?? 0),
            };
          }),
        );

        setTipos(tiposCompletos);

        const totalRes = await api.get(
          `/api/orcamentos/ordemservico/${ordemId}`,
        );
        const orcamento = totalRes.data[0];
        setTotal(Number(orcamento?.valorTotal ?? 0));
      } catch (err) {
        console.error('Erro ao buscar tipos de serviço e orçamento:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDados();
  }, [ordemId]);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 style={{color: 'white'}}>Serviços da OS-0{ordemId}</h2>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <>
            {tipos.length === 0 ? (
              <p>Nenhum tipo de serviço encontrado para esta O.S.</p>
            ) : (
              <ul>
                {tipos.map((t) => (
                  <li key={t.id}>
                    {t.nome} = R$ {t.valor.toFixed(2)}
                  </li>
                ))}
              </ul>
            )}
            <hr />
            <p>
              <strong>Orçamento Total:</strong> R$ {total.toFixed(2)}
            </p>
            <button onClick={onClose} className={styles.fecharBtn}>
              Fechar
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalTiposServico;
