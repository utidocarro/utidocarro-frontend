import { useEffect, useState } from 'react';

import style from './style.module.css';
import TextButton from '@components/buttons/TextButton';
import ModalTitle from '@components/modals/ModalTitle';
import AddVehicleForm from '@components/forms/AddVehicleForm';
import Title from '@components/texts/Title';
import Subtitle from '@components/texts/Subtitle';
import { IVehicle } from '@interfaces/vehicle/vehicle';
import { getVehicles } from '@services/index';
import VehiclesTable from '@components/tables/VehiclesTable';
import EditVehicleForm, {
  IEditVehicleFormFields,
} from '@components/forms/EditVehicleForm';

export interface IEditUserModalState {
  open: boolean;
  user: IEditVehicleFormFields;
}

const defaultVehicle: IEditVehicleFormFields = {
  id: 0,
  model: '',
  brand: '',
  year: '',
  plate: '',
  customer: 0,
};

export default function Vehicles() {
  const [openAddVehicleModal, setOpenAddVehicleModal] =
    useState<boolean>(false);
  const [openEditVehicleModal, setOpenEditVehicleModal] =
    useState<IEditUserModalState>({ open: false, user: defaultVehicle });
  const [vehicles, setVehicles] = useState<Array<Omit<IVehicle, 'token'>>>([]);

  useEffect(() => {
    (async () => {
      const res = await getVehicles();
      if (res) {
        setVehicles(res);
      }
    })();
  }, []);

  function handleEditUser(editedUser: Omit<IVehicle, 'token'>) {
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
        <AddVehicleForm
          onCloseForm={() => setOpenAddVehicleModal(false)}
          onAddNewVehicle={(newVehicle) =>
            setVehicles([...vehicles, newVehicle])
          }
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
        <VehiclesTable
          vehicles={vehicles}
          setVehicles={setVehicles}
          onEditVehicle={setOpenEditVehicleModal}
        />
      </div>
    </>
  );
}
