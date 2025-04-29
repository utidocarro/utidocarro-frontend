import TextButton from '@components/buttons/TextButton';
import style from './style.module.css';
import ModalTitle from '@components/modals/ModalTitle';
import { useState } from 'react';
import AddUserForm from '@components/forms/AddUserForm';

export default function Users() {
  const [openAddUserModal, setOpenAddUserModal] = useState<boolean>(false);

  return (
    <div>
      <TextButton
        text='Adicionar usuário'
        onClick={() => setOpenAddUserModal(true)}
      />
      <ModalTitle
        title='Adicionar usuário'
        onClose={() => setOpenAddUserModal(false)}
        isVisible={openAddUserModal}
      >
        <AddUserForm />
      </ModalTitle>
    </div>
  );
}
