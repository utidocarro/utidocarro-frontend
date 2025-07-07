import { memo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import style from './style.module.css';
import { IUser } from '@interfaces/user/user';
import TextButton from '@components/buttons/TextButton';
import PressableText from '@components/buttons/PressableText';
import { ApiResponseError } from '@interfaces/api';
import InputWithError from '@components/inputs/InputWithError';
import { editUser } from '@services/index';
import InputBase from '@components/inputs/InputBase';

// = ============================================================
const schema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(3, { message: 'O nome deve ter no mínimo 3 caracteres' }),
  email: z.string().email({ message: 'Digite um Email válido' }),
});

export type IEditProfileFormFields = z.infer<typeof schema>;

export interface IEditProfileForm {
  onCloseForm: VoidFunction;
  onEditProfile: (newUser: Omit<IUser, 'token'>) => void;
  user: IEditProfileFormFields;
}

// = ============================================================
function EditProfileForm({
  onCloseForm,
  onEditProfile,
  user,
}: IEditProfileForm) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IEditProfileFormFields>({
    resolver: zodResolver(schema),
    defaultValues: user,
  });

  // = ============================================================
  const onSubmit: SubmitHandler<IEditProfileFormFields> = async (data) => {
    try {
      const res = await editUser({
        id: data.id,
        email: data.email,
        nome: data.name,
      });

      if (res.usuario) {
        toast.success('Perfil editado com sucesso!');
        onEditProfile(res.usuario);
        reset();
        onCloseForm();
      }
    } catch (error: ApiResponseError | unknown) {
      const errorMessage =
        (error as ApiResponseError)?.error ||
        'Servidor indisponível no momento!';
      toast.error(`Erro ao editar perfil: ${errorMessage}`);
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

      <div className={style.buttonsContainer}>
        <PressableText text='Cancelar' onClick={onCloseForm} />
        <TextButton
          text={isSubmitting ? 'Salvando...' : 'Salvar'}
          type='submit'
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
}

export default memo(EditProfileForm);
