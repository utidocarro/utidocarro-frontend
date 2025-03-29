import style from './style.module.css';
import InputPassword from '@components/inputs/InputPassword';

function App() {
    return (
        <div className={style.container}>
            <InputPassword label="Senha" placeholder="Digite sua senha" />
        </div>
    );
}

export default App;
