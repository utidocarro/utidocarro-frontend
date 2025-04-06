import { ToastContainer } from 'react-toastify';

import style from './style.module.css';
import Login from '@pages/Login';

function App() {
    return (
        <div className={style.container}>
            <ToastContainer autoClose={3000} />
            <Login />
        </div>
    );
}

export default App;
