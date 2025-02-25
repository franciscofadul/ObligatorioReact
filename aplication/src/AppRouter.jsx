import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";  
import "react-toastify/dist/ReactToastify.css";


import Login from "../src/components/login/login";
import CargarActividad from "../src/components/Actividad/actividad";
import VerRegistros from "../src/components/Actividad/registro";
import TiempoTotal from "../src/components/Actividad/tiempoTotal";
import TiempoDiario from "../src/components/Actividad/tiempoDiario";
import App from "./App";
import { store } from "./store/store";
import { ToastContainer } from "react-toastify";
import GraficoSesiones from "./components/Actividad/graficoSesiones";
import GraficoMinutos from "./components/Actividad/graficoMinutos";
import EvolucionPersonal from "./components/Actividad/evolucionPersonal";
import Registro from "./components/registro/registrarse";


const AppRouter = () => {
  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
    <Provider store={store}> 
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/home" element={<App />} />
          <Route path="/registros" element={<VerRegistros />} />
          <Route path="/tiempoTotal" element={<TiempoTotal />} />
          <Route path="/tiempoDiario" element={<TiempoDiario />} />
          <Route path="/graficoSesiones" element={<GraficoSesiones />} />
          <Route path="/graficoMinutos" element={<GraficoMinutos />} />
          <Route path="/evolucion" element={<EvolucionPersonal  />}/>
        </Routes>
      </Router>
    </Provider>
    </>
  );
};

export default AppRouter;
