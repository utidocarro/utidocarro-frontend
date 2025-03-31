import Card from '@components/cards/Card';
import style from './style.module.css';
import InputPassword from '@components/inputs/InputPassword';
import Title from '@components/texts/Title';
import TextButton from '@components/buttons/TextButton';
import Checkbox from '@components/buttons/Checkbox';

function App() {
    return (
        <div className={style.container}>
            <Card cardType="primary">
                <Title title="Login!" />
                <InputPassword text="Senha" placeholder="Digite sua senha" />
                <Checkbox
                    text="Lembrar-me"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        console.log(e.target.checked)
                    }
                />
                <TextButton
                    text="Entrar"
                    onClick={() => console.log('Clicoooou')}
                />
            </Card>
        </div>
    );
}

export default App;
