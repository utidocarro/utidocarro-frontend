import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import * as motion from "motion/react-client";

import style from "./style.module.css";
import { LOGO_UTI_DO_CARRO } from "@assets/images";

import Card from "@components/cards/Card";
import InputPassword from "@components/inputs/InputPassword";
import TextButton from "@components/buttons/TextButton";
import Checkbox from "@components/buttons/Checkbox";
import Paragraph from "@components/texts/Paragraph";
import InputBase from "@components/inputs/InputBase";
import TextError from "@components/texts/TextError";

const schema = z.object({
  username: z.string().min(1, { message: "Digite um nome de usuário" }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
  remember: z.boolean(),
});

export interface ILoginFormFields extends z.infer<typeof schema> {}

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ILoginFormFields>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<ILoginFormFields> = async (data) => {
    // TODO: Implementar a lógica de login
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("data: ", data);
    reset();
  };

  return (
    <div className={style.container}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.4,
          scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
        }}
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Card height="20%" width="auto" cardType="tertiary">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={style.formContainer}
          >
            <h1 className={style.title}>Login!</h1>

            <Paragraph
              size="medium"
              align="center"
              text="Por favor, insira suas credenciais abaixo para continuar"
            />

            <div className={style.inputContainer}>
              <InputBase
                text="Nome de Usuário"
                placeholder="Digite seu nome de usuário"
                {...register("username")}
              />
              {errors.username && (
                <TextError text={errors.username.message ?? ""} />
              )}
            </div>
            <div className={style.inputContainer}>
              <InputPassword
                text="Senha"
                placeholder="Digite sua senha"
                {...register("password")}
              />
              {errors.password && (
                <TextError text={errors.password.message ?? ""} />
              )}
            </div>

            <Checkbox text="Lembrar-me" {...register("remember")} />

            <TextButton
              text={isSubmitting ? "Carregando..." : "Entrar"}
              type="submit"
              disabled={isSubmitting}
            />
          </form>
        </Card>
      </motion.div>
      <img src={LOGO_UTI_DO_CARRO} className={style.img} />
    </div>
  );
}

export default Login;
