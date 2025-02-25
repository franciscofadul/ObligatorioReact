import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../../App.css";

const EvolucionPersonal = () => {
  const [mensaje, setMensaje] = useState("Cargando...");

  const registros = useSelector((state) => state.registros.lista);

  useEffect(() => {
    if (registros.length > 0) {
      const hoy = new Date();
      const ayer = new Date();

      hoy.setHours(0, 0, 0, 0); 
      ayer.setDate(hoy.getDate() - 1);
      ayer.setHours(0, 0, 0, 0);

      const formatoFecha = (fecha) => fecha.toISOString().split("T")[0];

      const hoyStr = formatoFecha(hoy);
      const ayerStr = formatoFecha(ayer);

      let tiempoHoy = 0;
      let tiempoAyer = 0;

      registros.forEach((registro) => {
        const fechaRegistro = new Date(registro.fecha);
        const fechaStr = fechaRegistro.toISOString().split("T")[0]; 

        if (fechaStr === hoyStr) {
          tiempoHoy += parseInt(registro.tiempo);
        } else if (fechaStr === ayerStr) {
          tiempoAyer += parseInt(registro.tiempo);
        }
      });

      console.log(`Tiempo Hoy: ${tiempoHoy} minutos, Tiempo Ayer: ${tiempoAyer} minutos`);

      setMensaje(tiempoHoy > tiempoAyer ? "¡Bien hecho! 🎉" : "¡Que no decaiga! 💪");
    } else {
      setMensaje("No se encontraron registros recientes.");
    }
  }, [registros]);  

  return (
    <div className="container">
      <h2>Evolución Personal</h2>
      <p>{mensaje}</p>
    </div>
  );
};

export default EvolucionPersonal;
