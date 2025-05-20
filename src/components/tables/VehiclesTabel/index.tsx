import { Dispatch, memo, SetStateAction } from 'react';
import { toast } from 'react-toastify';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';

import style from './style.module.css';
import { IVehicle } from '@interfaces/vehicle/vehicle';
import { deleteVehicleById } from '@services/index';
import { Colors } from '@styles/Colors';
import { formatBoolean } from '@utils/index';
import { Pen, Trash } from '@assets/icons';
import { IEditVehicleModalState } from '@pages/Vehicles';

export interface IVehiclesTableProps {
  vehicles: Array<IVehicle>;
  setVehicles: Dispatch<SetStateAction<Array<IVehicle>>>;
  onEditVehicle: Dispatch<SetStateAction<IEditVehicleModalState>>;
}

function VehiclesTable({
  vehicles,
  setVehicles,
  onEditVehicle,
}: IVehiclesTableProps) {
  async function deleteVehicle(id: number) {
    try {
      const res = await deleteVehicleById(id);

      if (res.message) {
        const updatedVehicles = vehicles.map((vehicle) => {
          if (vehicle.id === id) {
            return { ...vehicle, deletado: true };
          }
          return vehicle;
        });
        setVehicles(updatedVehicles);
        toast.success('Veículo desativado!');
      }
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  }

  const statusBodyTemplate = ({ deletado }: IVehicle) => {
    return (
      <Tag
        className={[
          style.tag,
          deletado ? style.tagError : style.tagSuccess,
        ].join(' ')}
        value={formatBoolean(deletado)}
      ></Tag>
    );
  };

  const actionsBodyTemplate = (vehicle: IVehicle) => {
    return (
      <div className={style.actionsContainer}>
        <Pen
          fill={Colors.white}
          width={22}
          height={22}
          style={{ cursor: 'pointer' }}
          onClick={() =>
            onEditVehicle({
              open: true,
              vehicle: {
                id: vehicle.id,
                model: vehicle.modelo,
                brand: vehicle.marca,
                year: vehicle.ano.toString(),
                plate: vehicle.placa,
                customer: vehicle.cliente,
              },
            })
          }
        />
        <Trash
          fill={Colors.error}
          width={22}
          height={22}
          style={{ cursor: 'pointer' }}
          onClick={async () => await deleteVehicle(vehicle.id)}
        />
      </div>
    );
  };

  return (
    <DataTable
      value={vehicles}
      paginator
      rows={10}
      style={{
        color: Colors.white,
        backgroundColor: Colors.lightShape,
      }}
      className={style.tableContainer}
    >
      <Column field='id' header='ID' />
      <Column field='modelo' header='Modelo' />
      <Column field='marca' header='Marca' />
      <Column field='ano' header='Ano' />
      <Column field='placa' header='Placa' />
      <Column field='cliente' header='Cliente' />
      <Column field='deletado' header='Deletado' body={statusBodyTemplate} />
      <Column header='Ações' body={actionsBodyTemplate} />
    </DataTable>
  );
}

export default memo(VehiclesTable);
