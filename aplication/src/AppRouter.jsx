import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";  

import Registro from "../src/components/registro/registrarse";
import Login from "../src/components/login/login";
import CargarActividad from "../src/components/Actividad/actividad";
import VerRegistros from "../src/components/registro/registrarse";
import TiempoTotal from "../src/components/Actividad/tiempoTotal";
import TiempoDiario from "../src/components/Actividad/tiempoDiario";
import App from "./App";
import { store } from "./store/store";

const AppRouter = () => {
  return (
    <Provider store={store}> 
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/home" element={<App />} />
          <Route path="/registros" element={<VerRegistros />} />
          <Route path="/tiempoTotal" element={<TiempoTotal />} />
          <Route path="/tiempoDiario" element={<TiempoDiario />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default AppRouter;
