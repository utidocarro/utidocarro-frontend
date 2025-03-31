import Card from '@components/cards/Card';
import style from './style.module.css';
import InputPassword from '@components/inputs/InputPassword';
import Title from '@components/texts/Title';
import TextButton from '@components/buttons/TextButton';

function App() {
    return (
        <div className={style.container}>
            <Title title="Login!" />
            <Card cardType="primary">
                <InputPassword label="Senha" placeholder="Digite sua senha" />
            </Card>
            <TextButton
                text="Entrar"
                onClick={() => console.log('Clicoooou')}
            />
        </div>
    );
}

export default App;
