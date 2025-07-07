import { useEffect, useState } from 'react';

import style from './style.module.css';
import TextButton from '@components/buttons/TextButton';
import ModalTitle from '@components/modals/ModalTitle';
import AddVehicleForm from '@components/forms/AddVehicleForm';
import Title from '@components/texts/Title';
import Subtitle from '@components/texts/Subtitle';
import { IVehicle } from '@interfaces/vehicle/vehicle';
import { getUserById, getVehicles } from '@services/index';
import VehiclesTable from '@components/tables/VehiclesTabel';
import EditVehicleForm, {
  IEditVehicleFormFields,
} from '@components/forms/EditVehicleForm';
import { useGlobalStore } from '@/storage/useGlobalStorage';
import { EUserType } from '@interfaces/user/user';

export interface IEditVehicleModalState {
  open: boolean;
  vehicle: IEditVehicleFormFields;
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
  const { user } = useGlobalStore();
  const userIsAdmin = user?.tipo === EUserType.ADMIN;

  const [openAddVehicleModal, setOpenAddVehicleModal] =
    useState<boolean>(false);
  const [openEditVehicleModal, setOpenEditVehicleModal] =
    useState<IEditVehicleModalState>({ open: false, vehicle: defaultVehicle });
  const [vehicles, setVehicles] = useState<Array<IVehicle>>([]);

  // = ============================================================
  useEffect(() => {
    const fetchVehiclesWithUsers = async () => {
      try {
        const res = await getVehicles();
        if (!res) return;

        const vehiclesWithUsers = await Promise.all(
          res.map(async (vehicle) => {
            try {
              const userResponse = await getUserById(vehicle.cliente);
              return {
                ...vehicle,
                cliente_nome: userResponse.nome,
              };
            } catch (error) {
              console.error(
                `Erro ao buscar usuário ${vehicle.cliente}:`,
                error,
              );
              return {
                ...vehicle,
                cliente_nome: 'Usuário não encontrado',
              };
            }
          }),
        );

        const filteredVehicles = userIsAdmin
          ? vehiclesWithUsers
          : vehiclesWithUsers.filter(
              (vehicle) => vehicle.cliente === user?.id_usuario,
            );

        setVehicles(filteredVehicles);
      } catch (error) {
        console.error('Erro ao buscar veículos:', error);
      }
    };

    fetchVehiclesWithUsers();
  }, [user?.id_usuario, userIsAdmin]);

  // = ============================================================
  function handleEditVehicle(editedVehicle: IVehicle) {
    const newVehicles = vehicles.map((v) => {
      if (v.id === editedVehicle.id) {
        return {
          ...v,
          modelo: editedVehicle.modelo,
          marca: editedVehicle.marca,
          ano: editedVehicle.ano,
          placa: editedVehicle.placa,
          cliente: editedVehicle.cliente,
          deletado: editedVehicle.deletado,
        };
      }
      return v;
    });

    setVehicles(newVehicles);
  }

  // = ============================================================
  return (
    <>
      {/* ----- Add Vehicle Modal ----- */}
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

      {/* ----- Edit Vehicle Modal ----- */}
      <ModalTitle
        title='Editar veículo'
        onClose={() =>
          setOpenEditVehicleModal({ open: false, vehicle: defaultVehicle })
        }
        isVisible={openEditVehicleModal.open && userIsAdmin}
      >
        <EditVehicleForm
          onCloseForm={() =>
            setOpenEditVehicleModal({ open: false, vehicle: defaultVehicle })
          }
          onEditVehicle={(editedVehicle) => handleEditVehicle(editedVehicle)}
          vehicle={openEditVehicleModal.vehicle}
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
