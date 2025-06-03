import { ToastContainer } from 'react-toastify';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-dark-blue/theme.css';

import style from './style.module.css';
import AppRoutes from '@routes';

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
