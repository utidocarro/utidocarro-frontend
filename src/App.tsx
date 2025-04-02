import Circle from '@components/icons/Circle';
import style from './style.module.css';
import Login from '@pages/Login';
import { Colors } from '@styles/Colors';
import MenuCard from '@components/cards/MenuCard';

function App() {
    return (
        <div className={style.container}>
            {/* <Login /> */}
            <MenuCard
                isSelected={false}
                icon={<>Hello World</>}
                text="Cacilda"
            />
        </div>
    );
}

export default App;
