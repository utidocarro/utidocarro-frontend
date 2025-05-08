import { useEffect, useState } from 'react';

import style from './style.module.css';
import TextButton from '@components/buttons/TextButton';
import ModalTitle from '@components/modals/ModalTitle';
import AddUserForm from '@components/forms/AddUserForm';
import Title from '@components/texts/Title';
import Subtitle from '@components/texts/Subtitle';
import { EUserType, IUser } from '@interfaces/user/user';
import { getUsers, getVehicles } from '@services/index';
import UsersTable from '@components/tables/UsersTable';
import EditUserForm, {
  IEditUserFormFields,
} from '@components/forms/EditUserForm';

export interface IEditUserModalState {
  open: boolean;
  user: IEditUserFormFields;
}

const defaultVehicle: IEditUserFormFields = {
  id: 0,
  name: '',
  email: '',
  password: '',
  type: EUserType.USER,
};

export default function Vehicles() {
  const [openAddVehicleModal, setOpenAddVehicleModal] =
    useState<boolean>(false);
  const [openEditVehicleModal, setOpenEditVehicleModal] =
    useState<IEditUserModalState>({ open: false, user: defaultVehicle });
  const [vehicles, setVehicles] = useState<Array<Omit<IUser, 'token'>>>([]);

  useEffect(() => {
    (async () => {
      const res = await getVehicles();
      if (res) {
        setVehicles(res);
      }
    })();
  }, []);

  function handleEditUser(editedUser: Omit<IUser, 'token'>) {
    const newUsers = vehicles.map((u) => {
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

    setVehicles(newUsers);
  }
  return (
    <>
      {/* ----- Add User Modal ----- */}
      <ModalTitle
        title='Adicionar veículo'
        onClose={() => setOpenAddVehicleModal(false)}
        isVisible={openAddVehicleModal}
      >
        <AddUserForm
          onCloseForm={() => setOpenAddVehicleModal(false)}
          onAddNewUser={(newUser) => setVehicles([...vehicles, newUser])}
        />
      </ModalTitle>

      {/* ----- Screen ----- */}
      <div className={style.container}>
        <Title title='Gestão de Veículos' />
        <div className={style.subContainer}>
          <Subtitle
            subtitleType='secondary'
            text={`Veículos (${vehicles.length})`}
          />
          <TextButton
            text='Adicionar Veículo'
            onClick={() => setOpenAddVehicleModal(true)}
          />
        </div>
        {/* <UsersTable
          users={users}
          setUsers={setUsers}
          onEditUser={setOpenEditUserModal}
        /> */}
      </div>
    </>
  );
}
