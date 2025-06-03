/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import style from './style.module.css';
import { addServiceType } from '@services/index';
import TextButton from '@components/buttons/TextButton';
import PressableText from '@components/buttons/PressableText';
import InputWithError from '@components/inputs/InputWithError';
import { toast } from 'react-toastify';

const schema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  descricao: z.string().min(1, 'Descrição é obrigatória'),
  valor: z.coerce.number().min(0, 'Valor deve ser positivo'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onCloseForm: () => void;
  onAddNewServiceType: (data: any) => void;
}

function AddServiceTypeForm({ onCloseForm, onAddNewServiceType }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    const payload = {
      ...data,
      valor: data.valor.toString(), // Backend espera como string?
    };

    const res = await addServiceType(payload);
    if (res) {
      toast.success('Tipo de serviço adicionado com sucesso!');
      onAddNewServiceType(res);
      reset();
      onCloseForm();
    } else {
      toast.error('Erro ao adicionar tipo de serviço');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.formContainer}>
      <InputWithError
        text="Nome"
        placeholder="Digite o nome do serviço"
        register={register('nome')}
        errorMessage={errors.nome?.message ?? ''}
      />

      <InputWithError
        text="Descrição"
        placeholder="Digite a descrição"
        register={register('descricao')}
        errorMessage={errors.descricao?.message ?? ''}
      />

      <InputWithError
        text="Valor (R$)"
        placeholder="Digite o valor"
        inputMode="decimal" // ajuda em teclados numéricos no mobile
        register={register('valor')}
        errorMessage={errors.valor?.message ?? ''}
      />

      <div className={style.buttonsContainer}>
        <PressableText text="Cancelar" onClick={onCloseForm} />
        <TextButton
          text={isSubmitting ? 'Salvando...' : 'Cadastrar'}
          type="submit"
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
}

export default memo(AddServiceTypeForm);
