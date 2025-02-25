import { useRef } from "react";
import CargarActividad from "../src/components/Actividad/actividad";
import VerRegistros from "../src/components/Actividad/registro";
import TiempoDiario from "../src/components/Actividad/tiempoDiario";
import TiempoTotal from "../src/components/Actividad/tiempoTotal";
import GraficoSesiones from "../src/components/Actividad/graficoSesiones";
import GraficoMinutos from "../src/components/Actividad/graficoMinutos";
import Header from "../src/components/Header/Header";
import EvolucionPersonal from "./components/Actividad/evolucionPersonal";

const App = () => {
  const verRegistrosRef = useRef(null);
  const cargarActividadRef = useRef(null);

  const scrollToVerRegistros = () => {
    verRegistrosRef.current?.scrollIntoView({ behavior: "smooth" });
    cargarActividadRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToCargarActividad = () => {
    cargarActividadRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <Header />
      <div ref={cargarActividadRef}>
        <CargarActividad scrollToVerRegistros={scrollToVerRegistros} />
      </div>
      <div ref={verRegistrosRef}>
        <VerRegistros scrollToCargarActividad={scrollToCargarActividad}/>
      </div>
      <TiempoDiario />
      <TiempoTotal />
      <GraficoSesiones />
      <GraficoMinutos />
      <EvolucionPersonal/>
    </>
  );
};
export default App;
