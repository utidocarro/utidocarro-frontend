/* eslint-disable @typescript-eslint/no-empty-object-type */
import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import style from './style.module.css';
import TextButton from '@components/buttons/TextButton';
import PressableText from '@components/buttons/PressableText';
import InputWithError from '@components/inputs/InputWithError';
import InputBase from '@components/inputs/InputBase';
import { editServiceType } from '@services/index';
import { IServiceType } from '@interfaces/servicetype/servicetype';

// ============== Zod Schema ==============
const schema = z.object({
  id: z.number(),
  nome: z.string().min(1, 'Nome é obrigatório'),
  descricao: z.string().min(1, 'Descrição é obrigatória'),
  valor: z.coerce.number().min(0, 'Valor deve ser maior ou igual a zero'),
});

export interface IEditServiceTypeFormFields extends z.infer<typeof schema> {}

interface IEditServiceTypeFormProps {
  onCloseForm: VoidFunction;
  onEditServiceType: (data: IServiceType) => void;
  serviceType: IServiceType;
}

function EditServiceTypeForm({
  onCloseForm,
  onEditServiceType,
  serviceType,
}: IEditServiceTypeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IEditServiceTypeFormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: serviceType.id,
      nome: serviceType.nome,
      descricao: serviceType.descricao,
      valor: Number(serviceType.valor), 
    },
  });

  const onSubmit = async (data: IEditServiceTypeFormFields) => {
    try {
      const res = await editServiceType({
        id: data.id,
        nome: data.nome,
        descricao: data.descricao,
        valor: Number(data.valor).toFixed(2), 
      });

      if (res.tipoServico) {
        toast.success('Tipo de serviço editado com sucesso!');
        onEditServiceType(res.tipoServico);
        reset();
        onCloseForm();
      }
    } catch (error) {
      console.error(error);
      toast.error('Erro ao editar tipo de serviço!');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.formContainer}>
      <InputBase
        text='Identificador'
        placeholder='ID'
        value={serviceType.id}
        disabled
      />

      <InputWithError
        text='Nome'
        placeholder='Digite o nome do serviço'
        errorMessage={errors?.nome?.message ?? ''}
        register={register('nome')}
      />

      <InputWithError
        text='Descrição'
        placeholder='Digite a descrição'
        errorMessage={errors?.descricao?.message ?? ''}
        register={register('descricao')}
      />

      <InputWithError
        text='Valor'
        placeholder='Digite o valor'
        errorMessage={errors?.valor?.message ?? ''}
        register={register('valor')}
        onInput={(e) => {
          const input = e.target as HTMLInputElement;
          input.value = input.value.replace(/[^0-9.]/g, '');
        }}
      />

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

export default memo(EditServiceTypeForm);
