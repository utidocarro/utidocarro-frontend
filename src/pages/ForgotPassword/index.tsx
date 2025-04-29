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
import { useNavigate } from 'react-router';
import Paragraph from '@components/texts/Paragraph';

// = ============================================================
const schema = z.object({
  email: z.string().email({ message: 'Digite um Email válido' }),
});

export interface IForgotFormFields extends z.infer<typeof schema> {}

// = ============================================================
export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IForgotFormFields>({ resolver: zodResolver(schema) });

  const navigate = useNavigate();

  // = ============================================================
  const onSubmit: SubmitHandler<IForgotFormFields> = async (data) => {
    try {
      // const res = await forgotPassword({
      //                 email: data.email,
      //             });
      const res = true; // Simulação de chamada de API
      if (res) {
        toast.success(
          `Email enviado com sucesso! Confira a caixa de entrada do seu email. ${data.email}`,
        );
        reset();
      }
    } catch (error: ApiResponseError | unknown) {
      const errorMessage =
        (error as ApiResponseError)?.error ||
        'Servidor indisponível no momento!';
      toast.error(`Erro ao enviar email: ${errorMessage}`);
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
            <h1 className={style.title}>Esqueci minha senha!</h1>
            <Paragraph
              size='medium'
              align='center'
              text='Enviaremos um email para você redefinir sua senha.'
            />
            <div className={style.inputContainer}>
              <InputBase
                text='Email'
                placeholder='Digite seu email'
                {...register('email')}
              />
              <TextError text={errors?.email?.message ?? ''} />
            </div>
            <PressableText
              onClick={() => navigate('/login')}
              text='Lembrei minha senha'
            />
            <TextButton
              text={isSubmitting ? 'Enviando...' : 'Enviar email'}
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
