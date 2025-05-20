import { useEffect, useState } from 'react';

import style from './style.module.css';
import TextButton from '@components/buttons/TextButton';
import ModalTitle from '@components/modals/ModalTitle';
import AddUserForm from '@components/forms/AddUserForm';
import Title from '@components/texts/Title';
import Subtitle from '@components/texts/Subtitle';
import { EUserType, IUser } from '@interfaces/user/user';
import { getUsers } from '@services/index';
import UsersTable from '@components/tables/UsersTable';
import EditUserForm, {
  IEditUserFormFields,
} from '@components/forms/EditUserForm';

export interface IEditUserModalState {
  open: boolean;
  user: IEditUserFormFields;
}

const defaultUser: IEditUserFormFields = {
  id: 0,
  name: '',
  email: '',
  type: EUserType.USER,
};

export default function Users() {
  const [openAddUserModal, setOpenAddUserModal] = useState<boolean>(false);
  const [openEditUserModal, setOpenEditUserModal] =
    useState<IEditUserModalState>({ open: false, user: defaultUser });
  const [users, setUsers] = useState<Array<Omit<IUser, 'token'>>>([]);

  useEffect(() => {
    (async () => {
      const res = await getUsers();
      if (res) {
        setUsers(res);
      }
    })();
  }, []);

  function handleEditUser(editedUser: Omit<IUser, 'token'>) {
    const newUsers = users.map((u) => {
      if (u.id_usuario === editedUser.id_usuario) {
        return {
          ...u,
          email: editedUser.email,
          nome: editedUser.nome,
          senha: editedUser.senha,
          tipo: editedUser.tipo,
        };
      }
      return u;
    });

    setUsers(newUsers);
  }

  return (
    <>
      {/* ----- Add User Modal ----- */}
      <ModalTitle
        title='Adicionar usuário'
        onClose={() => setOpenAddUserModal(false)}
        isVisible={openAddUserModal}
      >
        <AddUserForm
          onCloseForm={() => setOpenAddUserModal(false)}
          onAddNewUser={(newUser) => setUsers([...users, newUser])}
        />
      </ModalTitle>

      {/* ----- Edit User Modal ----- */}
      <ModalTitle
        title='Editar usuário'
        onClose={() => setOpenEditUserModal({ open: false, user: defaultUser })}
        isVisible={openEditUserModal.open}
      >
        <EditUserForm
          onCloseForm={() =>
            setOpenEditUserModal({ open: false, user: defaultUser })
          }
          onEditUser={(editedUser) => handleEditUser(editedUser)}
          user={openEditUserModal.user}
        />
      </ModalTitle>

      {/* ----- Screen ----- */}
      <div className={style.container}>
        <Title title='Gestão de Usuários' />
        <div className={style.subContainer}>
          <Subtitle
            subtitleType='secondary'
            text={`Usuários (${users.length})`}
          />
          <TextButton
            text='Adicionar usuário'
            onClick={() => setOpenAddUserModal(true)}
          />
        </div>
        <UsersTable
          users={users}
          setUsers={setUsers}
          onEditUser={setOpenEditUserModal}
        />
      </div>
    </>
  );
}
