import { ToastContainer } from 'react-toastify';
import { PrimeReactProvider } from 'primereact/api';
import { locale } from 'primereact/api';
import { setupPrimeReactLocale } from './config/primeLocale';
import 'primereact/resources/themes/lara-dark-blue/theme.css';

import style from './style.module.css';
import AppRoutes from '@routes';

setupPrimeReactLocale(); 
locale('pt'); 

function App() {
  return (
    <PrimeReactProvider>
      <div className={style.container}>
        <ToastContainer autoClose={2000} />
        <AppRoutes />
      </div>
    </PrimeReactProvider>
  );
}

export default App;
