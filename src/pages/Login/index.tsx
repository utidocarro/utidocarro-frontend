/* eslint-disable @typescript-eslint/no-empty-object-type */
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import * as motion from 'motion/react-client';
import { toast } from 'react-toastify';

import style from './style.module.css';
import { LOGO_UTI_DO_CARRO } from '@assets/images';

import Card from '@components/cards/Card';
import InputPassword from '@components/inputs/InputPassword';
import TextButton from '@components/buttons/TextButton';
import Checkbox from '@components/buttons/Checkbox';
import Paragraph from '@components/texts/Paragraph';
import InputBase from '@components/inputs/InputBase';
import TextError from '@components/texts/TextError';
import { login } from '@services';
import { ApiResponseError } from '@interfaces/api';
import { useGlobalStore } from '@/storage/useGlobalStorage';
import PressableText from '@components/buttons/PressableText';
import { useNavigate } from 'react-router';

// = ============================================================
const schema = z.object({
  email: z.string().email({ message: 'Digite um Email válido' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
  remember: z.boolean(),
});

export interface ILoginFormFields extends z.infer<typeof schema> {}

// = ============================================================
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ILoginFormFields>({ resolver: zodResolver(schema) });

  const { setUser } = useGlobalStore();
  const navigate = useNavigate();

  // = ============================================================
  const onSubmit: SubmitHandler<ILoginFormFields> = async (data) => {
    try {
      const res = await login({
        email: data.email,
        senha: data.password,
      });
      if (res.usuario) {
        toast.success('Login realizado com sucesso!');
        setUser(res.usuario);
        reset();
      }
    } catch (error: ApiResponseError | unknown) {
      const errorMessage =
        (error as ApiResponseError)?.error ||
        'Servidor indisponível no momento!';
      toast.error(`Erro ao fazer login: ${errorMessage}`);
    }
  };

  // = ============================================================
  return (
    <div className={style.container}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.7,
          scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
        }}
        className={style.montionContainer}
      >
        <Card height='20%' width='auto' cardType='tertiary'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={style.formContainer}
          >
            <h1 className={style.title}>Login!</h1>

            <Paragraph
              size='medium'
              align='center'
              text='Por favor, insira suas credenciais abaixo para continuar'
            />

            <div className={style.inputContainer}>
              <InputBase
                text='Email'
                placeholder='Digite seu email'
                {...register('email')}
              />
              <TextError text={errors?.email?.message ?? ''} />
            </div>
            <div className={style.inputContainer}>
              <InputPassword
                text='Senha'
                placeholder='Digite sua senha'
                {...register('password')}
              />
              <TextError text={errors?.password?.message ?? ''} />
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Checkbox text='Lembrar-me' {...register('remember')} />
              <PressableText
                onClick={() => navigate('/forgot-password')}
                text='Esqueci minha senha'
              />
            </div>

            <TextButton
              text={isSubmitting ? 'Carregando...' : 'Entrar'}
              type='submit'
              disabled={isSubmitting}
            />
          </form>
        </Card>
      </motion.div>
      <img src={LOGO_UTI_DO_CARRO} className={style.img} />
    </div>
  );
}
