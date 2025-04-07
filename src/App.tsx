import { ToastContainer } from "react-toastify";

import style from "./style.module.css";
import AppRoutes from "./routes";

function App() {
  return (
    <div className={style.container}>
      <ToastContainer autoClose={3000} />
      <AppRoutes />
    </div>
  );
}

export default App;
