import { Dispatch, memo, SetStateAction } from 'react';

import style from './style.module.css';
import { IUser } from '@interfaces/user/user';
import { toast } from 'react-toastify';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';

import { deleteUserById } from '@services/index';
import { Colors } from '@styles/Colors';
import { formatBoolean, formatDate, formatUserType } from '@utils/index';
import { Trash } from '@assets/icons';

export interface IUsersTableProps {
  users: Array<Omit<IUser, 'token'>>;
  setUsers: Dispatch<SetStateAction<Omit<IUser, 'token'>[]>>;
}

function UsersTable({ users, setUsers }: IUsersTableProps) {
  async function deleteUser(id: number) {
    try {
      const res = await deleteUserById(id);

      if (res.message) {
        const updatedUsers = users.map((user) => {
          if (user.id_usuario === id) {
            return { ...user, deletado: true };
          }
          return user;
        });
        setUsers(updatedUsers);
        toast.success('Usuário desativado!');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  const userTypeBodyTemplate = ({ tipo }: IUser) => {
    return formatUserType(tipo);
  };

  const dateBodyTemplate = ({ data_criacao }: IUser) => {
    return formatDate(data_criacao);
  };

  const statusBodyTemplate = ({ deletado }: IUser) => {
    return <Tag value={formatBoolean(deletado)} severity='success'></Tag>;
  };

  const actionsBodyTemplate = ({ id_usuario }: IUser) => {
    return (
      <div className={style.actionsContainer}>
        <Trash
          fill={Colors.error}
          width={22}
          height={22}
          style={{ cursor: 'pointer' }}
          onClick={async () => await deleteUser(id_usuario)}
        />
      </div>
    );
  };

  return (
    <DataTable
      value={users}
      paginator
      rows={10}
      style={{
        color: Colors.white,
        backgroundColor: Colors.lightShape,
      }}
      className={style.tableContainer}
    >
      <Column field='id_usuario' header='ID' />
      <Column field='nome' header='Nome' />
      <Column field='email' header='Email' />
      <Column field='tipo' header='Tipo' body={userTypeBodyTemplate} />
      <Column
        field='data_criacao'
        header='Data de Criação'
        body={dateBodyTemplate}
      />
      <Column field='deletado' header='Deletado' body={statusBodyTemplate} />
      <Column header='Ações' body={actionsBodyTemplate} />
    </DataTable>
  );
}

export default memo(UsersTable);
