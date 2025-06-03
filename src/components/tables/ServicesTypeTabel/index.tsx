import { Dispatch, memo, SetStateAction } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { toast } from 'react-toastify';

import { IServiceType } from '@interfaces/servicetype/servicetype';
import { deleteServiceTypeById } from '@services/index';
import { Pen, Trash } from '@assets/icons';
import { Colors } from '@styles/Colors';
import style from './style.module.css';
import { formatBoolean } from '@utils/index';

interface Props {
  serviceTypes: IServiceType[];
  setServiceTypes: Dispatch<SetStateAction<IServiceType[]>>;
  onEditServiceType: (serviceType: IServiceType) => void;
}

function ServiceTypesTable({
  serviceTypes,
  setServiceTypes,
  onEditServiceType,
}: Props) {
  async function deleteServiceType(id: number) {
    try {
      const res = await deleteServiceTypeById(id);
      if (res.message) {
        const updated = serviceTypes.map((s) =>
          s.id === id ? { ...s, deletado: true } : s,
        );
        setServiceTypes(updated);
        toast.success('Tipo de serviço desativado!');
      }
    } catch (error) {
      console.error('Erro ao deletar tipo de serviço:', error);
    }
  }

  const statusBodyTemplate = ({ deletado }: IServiceType) => (
    <Tag
      className={[style.tag, deletado ? style.tagError : style.tagSuccess].join(
        ' ',
      )}
      value={formatBoolean(deletado)}
    />
  );

  const valorBodyTemplate = ({ valor }: IServiceType) =>
    `R$ ${parseFloat(valor).toFixed(2).replace('.', ',')}`;

  const actionsBodyTemplate = (service: IServiceType) => (
    <div className={style.actionsContainer}>
      <Pen
        fill={Colors.white}
        width={22}
        height={22}
        style={{ cursor: 'pointer' }}
        onClick={() => onEditServiceType(service)}
      />
      <Trash
        fill={Colors.error}
        width={22}
        height={22}
        style={{ cursor: 'pointer' }}
        onClick={() => deleteServiceType(service.id)}
      />
    </div>
  );

  return (
    <DataTable
      value={serviceTypes}
      paginator
      rows={10}
      className={style.tableContainer}
      style={{
        color: Colors.white,
        backgroundColor: Colors.lightShape,
      }}
    >
      <Column field='id' header='ID' />
      <Column field='nome' header='Nome' />
      <Column field='descricao' header='Descrição' />
      <Column field='valor' header='Valor' body={valorBodyTemplate} />
      <Column field='deletado' header='Deletado' body={statusBodyTemplate} />
      <Column header='Ações' body={actionsBodyTemplate} />
    </DataTable>
  );
}

export default memo(ServiceTypesTable);
