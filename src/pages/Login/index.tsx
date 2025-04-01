import style from './style.module.css';
import Card from '@components/cards/Card';
import InputPassword from '@components/inputs/InputPassword';
import Title from '@components/texts/Title';
import TextButton from '@components/buttons/TextButton';
import Checkbox from '@components/buttons/Checkbox';
import Paragraph from '@components/texts/Paragraph';
import { useForm } from 'react-hook-form';
import { LOGO_UTI_DO_CARRO } from '@assets/images';
import InputBase from '@components/inputs/InputBase';

function Login() {
    const { register, handleSubmit } = useForm();

    function onSubmit(data) {
        console.log('KKKKKKKKKKKK');
    }

    return (
        <div className={style.container}>
            <Card width="45%" height="auto" cardType="tertiary">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={style.formContainer}>
                    <Title style={{ textAlign: 'center' }} title="Login!" />

                    <Paragraph
                        size="medium"
                        align="center"
                        text="Por favor, insira suas credenciais abaixo para continuar"
                    />

                    <InputBase
                        text="Nome de Usuário"
                        placeholder="Digite seu nome de usuário"
                    />

                    <InputPassword
                        text="Senha"
                        placeholder="Digite sua senha"
                    />

                    <Checkbox
                        text="Lembrar-me"
                        onChange={(e) => console.log(e.target.checked)}
                    />

                    <TextButton
                        text="Entrar"
                        type="submit"
                        onClick={() => console.log('Clicoooou')}
                    />
                </form>
            </Card>
            <img src={LOGO_UTI_DO_CARRO} className={style.img} />
        </div>
    );
}

export default Login;
