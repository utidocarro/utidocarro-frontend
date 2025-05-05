import { useEffect, useState } from 'react';

import style from './style.module.css';
import TextButton from '@components/buttons/TextButton';
import ModalTitle from '@components/modals/ModalTitle';
import AddUserForm from '@components/forms/AddUserForm';
import Title from '@components/texts/Title';
import Subtitle from '@components/texts/Subtitle';
import { IUser } from '@interfaces/user/user';
import { getUsers } from '@services/index';
import UsersTable from '@components/tables/UsersTable';

export default function Users() {
  const [openAddUserModal, setOpenAddUserModal] = useState<boolean>(false);
  const [users, setUsers] = useState<Array<Omit<IUser, 'token'>>>([]);

  useEffect(() => {
    (async () => {
      const res = await getUsers();
      if (res) {
        setUsers(res);
      }
    })();
  }, []);

  return (
    <>
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
        <UsersTable users={users} setUsers={setUsers} />
      </div>
    </>
  );
}
