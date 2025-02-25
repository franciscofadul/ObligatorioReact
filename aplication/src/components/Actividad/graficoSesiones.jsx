
import {  useSelector } from "react-redux";
import "../../App.css";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const GraficoSesiones = () => {
    
    const actividades = useSelector((state) => state.actividades.lista);
    const registros = useSelector((state) => state.registros.lista);
  
    console.log("Actividades store:", actividades);
    console.log("Registros  store:", registros);
  
    if (!actividades || actividades.length === 0 || !registros || registros.length === 0) {
      return <div>Cargando datos...</div>; 
    }
  
    const sesionesPorActividad = actividades.map((actividad) => {
      const sesiones = registros.filter(
        (registro) => registro.idActividad === actividad.id
      ).length;
      return {
        actividad: actividad.nombre,
        sesiones,
      };
    });
  
    const actividadesConSesiones = sesionesPorActividad.filter(
      (actividad) => actividad.sesiones > 0
    );
  
    const labels = actividadesConSesiones.map((actividad) => actividad.actividad);
    const dataSesiones = actividadesConSesiones.map((actividad) => actividad.sesiones);
  
    const data = {
      labels,
      datasets: [
        {
          label: "Sesiones por Actividad",
          data: dataSesiones,
          backgroundColor: "rgba(53, 162, 235, 0.5)",  
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Cantidad de Sesiones por Actividad",  
        },
      },
    };
  
    return (
      <div className="container">
        <h2>Gráfico de Sesiones por Actividad</h2>
        <Bar options={options} data={data} />
      </div>
    );
  };

  export default GraficoSesiones;