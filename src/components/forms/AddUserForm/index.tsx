import { memo } from 'react';
import { z } from 'zod';

import style from './style.module.css';
import { EUserType } from '@interfaces/user/user';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputBase from '@components/inputs/InputBase';
import TextError from '@components/texts/TextError';

const schema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome deve ter no mínimo 3 caracteres' }),
  email: z.string().email({ message: 'Digite um Email válido' }),
  type: z.nativeEnum(EUserType),
});

export interface IAddUserFormFields extends z.infer<typeof schema> {}

function AddUserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IAddUserFormFields>({ resolver: zodResolver(schema) });

  // = ============================================================
  const onSubmit: SubmitHandler<IAddUserFormFields> = async (data) => {};
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.formContainer}>
      <div className={style.inputContainer}>
        <InputBase
          text='Nome'
          placeholder='Digite o nome'
          labelFontWeight={500}
          {...register('name')}
        />
        <TextError text={errors?.name?.message ?? ''} />
      </div>

      <div className={style.inputContainer}>
        <InputBase
          text='Email'
          placeholder='Digite o email'
          labelFontWeight={500}
          {...register('email')}
        />
        <TextError text={errors?.email?.message ?? ''} />
      </div>
    </form>
  );
}

export default memo(AddUserForm);
