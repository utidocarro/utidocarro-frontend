import { memo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import style from './style.module.css';
import { EUserType } from '@interfaces/user/user';
import TextButton from '@components/buttons/TextButton';
import PressableText from '@components/buttons/PressableText';
import { ApiResponseError } from '@interfaces/api';
import InputWithError from '@components/inputs/InputWithError';
import RadioGroup, { IRadioGroupOptions } from '@components/inputs/RadioGroup';

// = ============================================================
const schema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome deve ter no mínimo 3 caracteres' }),
  email: z.string().email({ message: 'Digite um Email válido' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
  type: z.nativeEnum(EUserType),
});

export interface IAddUserFormFields extends z.infer<typeof schema> {}

export interface IAddUserForm {
  onCloseForm: VoidFunction;
}

// = ============================================================
const defaultOptions: Array<IRadioGroupOptions> = [
  { label: 'Usuário', value: EUserType.USER },
  { label: 'Administrador', value: EUserType.ADMIN },
];

// = ============================================================
function AddUserForm({ onCloseForm }: IAddUserForm) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IAddUserFormFields>({ resolver: zodResolver(schema) });

  // = ============================================================
  const onSubmit: SubmitHandler<IAddUserFormFields> = async (data) => {
    try {
      console.log(data);
      // TODO: Implementar a chamada para adicionar o usuário
      // const res = await login({
      //   email: data.email,
      //   senha: data.password,
      // });
      // if (res.usuario) {
      //   toast.success('Usuário adicionado com sucesso!');
      //   reset();
      //   onCloseForm();
      // }
    } catch (error: ApiResponseError | unknown) {
      const errorMessage =
        (error as ApiResponseError)?.error ||
        'Servidor indisponível no momento!';
      toast.error(`Erro ao adicionar usuário: ${errorMessage}`);
    }
  };

  // = ============================================================
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.formContainer}>
      <InputWithError
        text='Nome'
        placeholder='Digite o nome'
        errorMessage={errors?.name?.message ?? ''}
        register={register('name')}
      />

      <InputWithError
        text='Email'
        placeholder='Digite o email'
        errorMessage={errors?.email?.message ?? ''}
        register={register('email')}
      />

      <InputWithError
        text='Senha'
        placeholder='Digite a senha'
        errorMessage={errors?.password?.message ?? ''}
        type='password'
        register={register('password')}
      />

      <RadioGroup
        text='Tipo de Usuário'
        register={register('type')}
        name='radio'
        options={defaultOptions}
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

export default memo(AddUserForm);
