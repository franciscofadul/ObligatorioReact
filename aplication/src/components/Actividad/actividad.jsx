import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ListaTipoActividades } from "../../features/actividades";
import "../../App.css";
import { ListaRegistros } from "../../features/registros";


const CargarActividad = ({ scrollToVerRegistros }) => {
  const [actividadSeleccionada, setActividadSeleccionada] = useState("");
  const [fecha, setFecha] = useState("");
  const [duracion, setDuracion] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const actividades = useSelector((state) => state.actividades.lista);

  useEffect(() => {
    const fetchActividades = async () => {
      try {
        const response = await fetch("https://movetrack.develotion.com/actividades.php", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "apikey": localStorage.getItem("apiKey"),
            "iduser": localStorage.getItem("userid"),
          },
        });
  
        const data = await response.json();
        if (data.codigo === 200) {
          dispatch(ListaTipoActividades(data.actividades));
          console.log("Actividades cargadas:", data.actividades); 
        }
      } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        setMessage("Error al conectar con el servidor");
      }
    };
  
    fetchActividades();
  }, [dispatch]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    fetch("https://movetrack.develotion.com/registros.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": localStorage.getItem("apiKey"),
        "iduser": localStorage.getItem("userid"),
      },
      body: JSON.stringify({
        idActividad: actividadSeleccionada,
        idUsuario: localStorage.getItem("userid"),
        tiempo: duracion,
        fecha: fecha,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.codigo === 200) {
          setMessage("Actividad cargada exitosamente");
          console.log ("Fecha" + fecha);
          setActividadSeleccionada("");
          setFecha("");
          setDuracion("");
          fetch(
            `https://movetrack.develotion.com/registros.php?idUsuario=${localStorage.getItem("userid")}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                apikey: localStorage.getItem("apiKey"),
                iduser: localStorage.getItem("userid"),
              },
            }
          )
            .then((response) => response.json())
            .then((data) => {
              if (data.codigo === 200) {
                dispatch(ListaRegistros(data.registros)); 
              }
            });
        } else {
          setMessage("Error al cargar la actividad");
        }
      })
      .catch(() => setMessage("Error al conectar con el servidor"));
  };

  return (
    <div className="container">
      <h2>Cargar Actividad Física</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={actividadSeleccionada}
          onChange={(e) => setActividadSeleccionada(e.target.value)}
          required
        >
          <option value="">Seleccione una actividad</option>
          {actividades.map((actividad) => (
            <option key={actividad.id} value={actividad.id}>
              {actividad.nombre}
            </option>
          ))}
        </select>

        <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} max={new Date().toISOString().split("T")[0]} required />

        <input
          type="number"
          placeholder="Duración en minutos"
          value={duracion}
          onChange={(e) => setDuracion(e.target.value)}
          required
        />

        <button type="submit">Cargar Actividad</button>
      </form>
      <button type="button" onClick={scrollToVerRegistros}>
        Ver mis registros
      </button>
      <p id="message">{message}</p>
    </div>
  );
};

export default CargarActividad;
