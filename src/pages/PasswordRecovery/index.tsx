import { useEffect } from 'react';
import * as motion from 'motion/react-client';
import { z } from 'zod';

import style from './style.module.css';
import { LOGO_UTI_DO_CARRO } from '@assets/images';

import Card from '@components/cards/Card';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { ApiResponseError } from '@interfaces/api';
import InputBase from '@components/inputs/InputBase';
import TextError from '@components/texts/TextError';
import TextButton from '@components/buttons/TextButton';
import PressableText from '@components/buttons/PressableText';
import { useNavigate, useSearchParams } from 'react-router';
import Paragraph from '@components/texts/Paragraph';
import { resetPassword } from '@services/index';

// = ============================================================
const schema = z.object({
  password: z
    .string()
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
  token: z.string(),
});

export type IPasswordRecoveryFormFields = z.infer<typeof schema>;

// = ============================================================
export default function PasswordRecovery() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<IPasswordRecoveryFormFields>({ resolver: zodResolver(schema) });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  //= =================================================================================
  useEffect(() => {
    if (token) setValue('token', token);
  }, [token, setValue]);

  // = ============================================================
  const onSubmit: SubmitHandler<IPasswordRecoveryFormFields> = async (data) => {
    try {
      const res = await resetPassword({
        token: data.token,
        password: data.password,
      });

      if (res) {
        toast.success(
          `Senha salva com sucesso! Você já pode acessar sua conta com a nova senha.`,
        );
        reset();
        navigate('/login');
      }
    } catch (error: ApiResponseError | unknown) {
      console.log('Error:', error);

      const errorMessage =
        (error as ApiResponseError)?.error ||
        (error as ApiResponseError)?.message ||
        'Servidor indisponível no momento!';
      toast.error(`Erro ao salvar senha: ${errorMessage}`);
    }
  };

  // = ============================================================
  return (
    <div className={style.container}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.4,
          scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
        }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Card height='20%' width='auto' cardType='tertiary'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={style.formContainer}
          >
            <h1 className={style.title}>Redefinir senha</h1>
            <Paragraph
              size='medium'
              align='center'
              text='Digite sua nova senha para redefinir o acesso à sua conta.'
            />
            <div className={style.inputContainer}>
              <InputBase
                text='Senha'
                placeholder='Digite a nova senha'
                {...register('password')}
              />
              <TextError text={errors?.password?.message ?? ''} />
            </div>
            <PressableText
              onClick={() => navigate('/login')}
              text='Lembrei minha senha'
            />
            <TextButton
              text={isSubmitting ? 'Enviando...' : 'Salvar senha'}
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
