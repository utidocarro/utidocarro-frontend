import { memo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import style from './style.module.css';
import TextButton from '@components/buttons/TextButton';
import PressableText from '@components/buttons/PressableText';
import { ApiResponseError } from '@interfaces/api';
import InputWithError from '@components/inputs/InputWithError';
import { addVehicle } from '@services/index';
import { IVehicle } from '@interfaces/vehicle/vehicle';

// = ============================================================
const schema = z.object({
  model: z
    .string()
    .min(2, { message: 'O modelo deve ter no mínimo 2 caracteres.' }),
  brand: z
    .string()
    .min(3, { message: 'A marca deve ter no mínimo 3 caracteres.' }),
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

export interface IAddVehicleFormFields extends z.infer<typeof schema> {}

export interface IAddVehicleForm {
  onCloseForm: VoidFunction;
  onAddNewVehicle: (newVehicle: IVehicle) => void;
}

// = ============================================================
function AddVehicleForm({ onCloseForm, onAddNewVehicle }: IAddVehicleForm) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IAddVehicleFormFields>({ resolver: zodResolver(schema) });

  // = ============================================================
  const onSubmit: SubmitHandler<IAddVehicleFormFields> = async (data) => {
    try {
      const res = await addVehicle({
        modelo: data.model,
        marca: data.brand,
        ano: Number(data.year),
        placa: data.plate,
        cliente: data.customer,
      });

      if (res.veiculo) {
        toast.success('Veículo adicionado com sucesso!');
        onAddNewVehicle(res.veiculo);
        reset();
        onCloseForm();
      }
    } catch (error: ApiResponseError | unknown) {
      const errorMessage =
        (error as ApiResponseError)?.error ||
        'Servidor indisponível no momento!';
      toast.error(`Erro ao adicionar veículo: ${errorMessage}`);
    }
  };

  // = ============================================================
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.formContainer}>
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

      <div className={style.buttonsContainer}>
        <PressableText text='Cancelar' onClick={onCloseForm} />
        <TextButton
          text={isSubmitting ? 'Carregando...' : 'Adicionar'}
          type='submit'
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
}

export default memo(AddVehicleForm);
