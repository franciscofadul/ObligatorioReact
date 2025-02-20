import CargarActividad from "../Actividad/actividad";
import VerRegistros from "../Actividad/registro";
import TiempoDiario from "../Actividad/tiempoDiario";
import TiempoTotal from "../Actividad/tiempoTotal";
import Header from "../Header/Header";

const App = () => {
  return (
    <>
      <Header />
      <CargarActividad />
      <VerRegistros />
      <TiempoDiario />
      <TiempoTotal />
    </>
  );
};
export default App;
