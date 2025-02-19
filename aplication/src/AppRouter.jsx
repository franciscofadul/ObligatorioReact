import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Registro from "../registro/registrarse";
import Login from "../login/login";
import CargarActividad from "../Actividad/actividad";
import VerRegistros from "../Actividad/registro";
import TiempoTotal from "../Actividad/tiempoTotal";
import TiempoDiario from "../Actividad/tiempoDiario";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/home" element = {<CargarActividad/>}/>
        <Route path="/registros" element = {<VerRegistros/>}/>
        <Route path="/tiempoTotal" element={<TiempoTotal />} />
        <Route path="/tiempoDiario" element={<TiempoDiario />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;