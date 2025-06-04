/* eslint-disable @typescript-eslint/no-empty-object-type */
import { memo, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import style from './style.module.css';
import TextButton from '@components/buttons/TextButton';
import PressableText from '@components/buttons/PressableText';
import { ApiResponseError } from '@interfaces/api';
import InputWithError from '@components/inputs/InputWithError';
import { editVehicle, getUsers } from '@services/index';
import InputBase from '@components/inputs/InputBase';
import { IVehicle } from '@interfaces/vehicle/vehicle';
import Label from '@components/texts/Label';
import { Dropdown, DropdownProps } from 'primereact/dropdown';
import { IUser } from '@interfaces/user/user';
import { Colors } from '@styles/Colors';
import TextError from '@components/texts/TextError';

// = ============================================================
const schema = z.object({
  id: z.number(),
  model: z
    .string()
    .min(2, { message: 'O modelo deve ter no mínimo 2 caracteres.' }),
  brand: z
    .string()
    .min(2, { message: 'A marca deve ter no mínimo 2 caracteres.' }),
  year: z
    .string()
    .nonempty({ message: 'O ano do veículo é obrigatório.' })
    .refine(
      (value) => {
        const year = Number(value);
        return !isNaN(year) && year >= 1886 && year <= new Date().getFullYear();
      },
      {
        message: 'O ano do veículo deve estar entre 1886 e o ano atual.',
      },
    ),
  plate: z
    .string()
    .length(7, { message: 'A placa do veículo deve ter 7 caracteres.' }),
  customer: z
    .number({ required_error: 'Selecione um cliente para esse veículo.' })
    .int(),
});

export interface IEditVehicleFormFields extends z.infer<typeof schema> {}

export interface IEditVehicleForm {
  onCloseForm: VoidFunction;
  onEditVehicle: (newVehicle: IVehicle) => void;
  vehicle: IEditVehicleFormFields;
}

// = ============================================================
function EditVehicleForm({
  onCloseForm,
  onEditVehicle,
  vehicle,
}: IEditVehicleForm) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<IEditVehicleFormFields>({
    resolver: zodResolver(schema),
    defaultValues: vehicle,
  });

  const [allUsers, setAllUsers] = useState<
    Array<Pick<IUser, 'id_usuario' | 'nome'>>
  >([]);

  // = ============================================================
  useEffect(() => {
    (async () => {
      const res = await getUsers();
      if (res) {
        setAllUsers(res);
      }
    })();
  }, []);

  // = ============================================================
  const onSubmit: SubmitHandler<IEditVehicleFormFields> = async (data) => {
    try {
      const res = await editVehicle({
        id: data.id,
        modelo: data.model,
        marca: data.brand,
        ano: Number(data.year),
        placa: data.plate,
        cliente: data.customer,
      });

      if (res.veiculo) {
        toast.success('Veículo editado com sucesso!');
        onEditVehicle(res.veiculo);
        reset();
        onCloseForm();
      }
    } catch (error: ApiResponseError | unknown) {
      const errorMessage =
        (error as ApiResponseError)?.error ||
        'Servidor indisponível no momento!';
      toast.error(`Erro ao editar veículo: ${errorMessage}`);
    }
  };

  // = ============================================================
  function userOptionTemplate(user: Pick<IUser, 'id_usuario' | 'nome'>) {
    return (
      <div>
        <div>{user.nome}</div>
      </div>
    );
  }

  const selectedUserTemplate = (
    user: Pick<IUser, 'id_usuario' | 'nome'>,
    props: DropdownProps,
  ) => {
    if (user) {
      return (
        <div>
          <div>{user.nome}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  // = ============================================================
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.formContainer}>
      <InputBase
        text='Identificador'
        placeholder='ID'
        value={vehicle.id}
        disabled
      />

      <InputWithError
        text='Modelo'
        placeholder='Digite o modelo'
        errorMessage={errors?.model?.message ?? ''}
        register={register('model')}
      />

      <InputWithError
        text='Marca'
        placeholder='Digite a marca'
        errorMessage={errors?.brand?.message ?? ''}
        register={register('brand')}
      />

      <InputWithError
        text='Ano'
        placeholder='Digite o ano'
        errorMessage={errors?.year?.message ?? ''}
        register={register('year')}
        maxLength={4}
        onInput={(e) => {
          const input = e.target as HTMLInputElement;
          input.value = input.value.replace(/[^0-9]/g, '');
        }}
      />

      <InputWithError
        text='Placa'
        placeholder='Digite a placa'
        errorMessage={errors?.plate?.message ?? ''}
        register={register('plate')}
        maxLength={7}
      />

      <Label text={'Dono do veículo'} fontWeight={500} />
      <Controller
        name='customer'
        control={control}
        render={({ field }) => (
          <Dropdown
            {...field}
            options={allUsers}
            optionLabel='nome'
            optionValue='id_usuario'
            placeholder='Selecione o usuário'
            filter
            valueTemplate={selectedUserTemplate}
            itemTemplate={userOptionTemplate}
            className={style.input}
            style={{
              backgroundColor: Colors.lightShape,
              color: Colors.white,
            }}
          />
        )}
      />
      {errors.customer && <TextError text={errors.customer.message ?? ''} />}

      <div className={style.buttonsContainer}>
        <PressableText text='Cancelar' onClick={onCloseForm} />
        <TextButton
          text={isSubmitting ? 'Carregando...' : 'Editar'}
          type='submit'
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
}

export default memo(EditVehicleForm);
