import { useEffect, useState } from 'react';

import style from './style.module.css';
import TextButton from '@components/buttons/TextButton';
import ModalTitle from '@components/modals/ModalTitle';
import AddServiceTypeForm from '@components/forms/AddServiceTypeForm';
import EditServiceTypeForm from '@components/forms/EditServiceTypeForm';
import Title from '@components/texts/Title';
import Subtitle from '@components/texts/Subtitle';
import { IServiceType } from '@interfaces/servicetype/servicetype';
import { getServiceType } from '@services/index';
import ServiceTypesTable from '@components/tables/ServicesTypeTabel';

export default function ServiceTypes() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [serviceTypes, setServiceTypes] = useState<IServiceType[]>([]);
  const [selectedServiceType, setSelectedServiceType] =
    useState<IServiceType | null>(null);

  useEffect(() => {
    (async () => {
      const res = await getServiceType();
      if (res) setServiceTypes(res);
    })();
  }, []);

  const handleOpenEditModal = (serviceType: IServiceType) => {
    setSelectedServiceType(serviceType);
    setOpenEditModal(true);
  };

  const handleUpdateServiceType = (updated: IServiceType) => {
    setServiceTypes((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item)),
    );
  };

  return (
    <>
      {/* Modal de Adição */}
      <ModalTitle
        title='Adicionar tipo de serviço'
        onClose={() => setOpenAddModal(false)}
        isVisible={openAddModal}
      >
        <AddServiceTypeForm
          onCloseForm={() => setOpenAddModal(false)}
          onAddNewServiceType={(newServiceType) =>
            setServiceTypes([...serviceTypes, newServiceType])
          }
        />
      </ModalTitle>

      {/* Modal de Edição */}
      <ModalTitle
        title='Editar tipo de serviço'
        onClose={() => setOpenEditModal(false)}
        isVisible={openEditModal}
      >
        {selectedServiceType && (
          <EditServiceTypeForm
            onCloseForm={() => setOpenEditModal(false)}
            onEditServiceType={handleUpdateServiceType}
            serviceType={selectedServiceType}
          />
        )}
      </ModalTitle>

      <div className={style.container}>
        <Title title='Gestão de Tipos de Serviço' />
        <div className={style.subContainer}>
          <Subtitle
            subtitleType='secondary'
            text={`Tipos de Serviço (${serviceTypes.length})`}
          />
          <TextButton
            text='Adicionar Tipo de Serviço'
            onClick={() => setOpenAddModal(true)}
          />
        </div>
        <ServiceTypesTable
          serviceTypes={serviceTypes}
          setServiceTypes={setServiceTypes}
          onEditServiceType={handleOpenEditModal}
        />
      </div>
    </>
  );
}
