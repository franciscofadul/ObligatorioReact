import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Registro from "../registro/registrarse";
import Login from "../login/login";
import CargarActividad from "../Actividad/actividad";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/home" element = {<CargarActividad/>}/>
      </Routes>
    </Router>
  );
}

export default AppRouter;