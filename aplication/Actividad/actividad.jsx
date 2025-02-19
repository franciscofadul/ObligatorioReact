import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../src/App.css";

function CargarActividad() {
  const [actividades, setActividades] = useState([]);
  const [actividadSeleccionada, setActividadSeleccionada] = useState("");
  const [fecha, setFecha] = useState("");
  const [duracion, setDuracion] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Cargar las actividades desde la API

  useEffect(() => {
    console.log("hola " + localStorage.getItem("apiKey"));
    console.log(localStorage.getItem("userid"));
    fetch("https://movetrack.develotion.com/actividades.php", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
            "apikey": localStorage.getItem("apiKey"), 
            "iduser": localStorage.getItem("userid"), 
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.codigo === 200) {
            setActividades(data.actividades);
          } 
        })
        .catch((error) => {
          console.error("Error al conectar con el servidor:", error);
          setMessage("Error al conectar con el servidor");
        });}, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiKey = localStorage.getItem("apiKey");

    if (!apiKey) {
      setMessage("Error: No tienes una sesión activa.");
      return;
    }

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
          setActividadSeleccionada("");
          setFecha("");
          setDuracion("");
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
        {/* Select para elegir actividad */}
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

        {/* Input para la fecha */}
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />

        {/* Input para la duración */}
        <input
          type="number"
          placeholder="Duración en minutos"
          value={duracion}
          onChange={(e) => setDuracion(e.target.value)}
          required
        />

        <button type="submit">Cargar Actividad</button>
      </form>
      <button type="button" onClick={() => navigate("/registros")}>
        Ver mis registros
      </button>
      <p id="message">{message}</p>
    </div>
  );
}

export default CargarActividad;
