import { memo, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import style from './style.module.css';
import { EUserType, IUser } from '@interfaces/user/user';
import TextButton from '@components/buttons/TextButton';
import PressableText from '@components/buttons/PressableText';
import { ApiResponseError } from '@interfaces/api';
import InputWithError from '@components/inputs/InputWithError';
import RadioGroup, { IRadioGroupOptions } from '@components/inputs/RadioGroup';
import { editUser } from '@services/index';
import InputBase from '@components/inputs/InputBase';

// = ============================================================
const schema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(3, { message: 'O nome deve ter no mínimo 3 caracteres' }),
  email: z.string().email({ message: 'Digite um Email válido' }),
  type: z.nativeEnum(EUserType),
});

export interface IEditUserFormFields extends z.infer<typeof schema> {}

export interface IEditUserForm {
  onCloseForm: VoidFunction;
  onEditUser: (newUser: Omit<IUser, 'token'>) => void;
  user: IEditUserFormFields;
}

// = ============================================================
const defaultOptions: Array<IRadioGroupOptions> = [
  { label: 'Usuário', value: EUserType.USER },
  { label: 'Administrador', value: EUserType.ADMIN },
];

// = ============================================================
function EditUserForm({ onCloseForm, onEditUser, user }: IEditUserForm) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IEditUserFormFields>({
    resolver: zodResolver(schema),
    defaultValues: user,
  });

  // = ============================================================
  const onSubmit: SubmitHandler<IEditUserFormFields> = async (data) => {
    try {
      const res = await editUser({
        id: data.id,
        email: data.email,
        nome: data.name,
        tipo: data.type,
      });

      if (res.usuario) {
        toast.success('Usuário editado com sucesso!');
        onEditUser(res.usuario);
        reset();
        onCloseForm();
      }
    } catch (error: ApiResponseError | unknown) {
      const errorMessage =
        (error as ApiResponseError)?.error ||
        'Servidor indisponível no momento!';
      toast.error(`Erro ao editar usuário: ${errorMessage}`);
    }
  };

  // = ============================================================
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.formContainer}>
      <InputBase
        text='Identificador'
        placeholder='ID'
        value={user.id}
        disabled
      />

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

      <RadioGroup
        text='Tipo de Usuário'
        register={register('type')}
        name='radio'
        options={defaultOptions}
        selectedValue={user.type}
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

export default memo(EditUserForm);
