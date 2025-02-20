import CargarActividad from "../src/components/Actividad/actividad";
import VerRegistros from "../src/components/Actividad/registro";
import TiempoDiario from "../src/components/Actividad/tiempoDiario";
import TiempoTotal from "../src/components/Actividad/tiempoTotal";
import Header from "../src/components/Header/Header";

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
