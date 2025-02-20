import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";

import { useSelector } from "react-redux";

const VerRegistros = () => {
  const [registros, setRegistros] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [message, setMessage] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("todos");
  const navigate = useNavigate();
  const actividades2 = useSelector((state) => state.actividades.lista);

  const filtrarRegistros = (registros, filtro) => {
    const hoy = new Date();
    let fechaLimite;

    if (filtro === "semana") {
      fechaLimite = new Date();
      fechaLimite.setDate(hoy.getDate() - 7);
    } else if (filtro === "mes") {
      fechaLimite = new Date();
      fechaLimite.setMonth(hoy.getMonth() - 1);
    }

    return registros.filter((registro) => {
      const fechaRegistro = new Date(registro.fecha);
      return filtro === "todos" || fechaRegistro >= fechaLimite;
    });
  };

  useEffect(() => {
    console.log("Actividades desde el store:", actividades2);
  }, [actividades2]);

  useEffect(() => {
    fetch(
      `https://movetrack.develotion.com/registros.php?idUsuario=${localStorage.getItem(
        "userid"
      )}`,
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
        console.log("Datos de registro", data);
        if (data.codigo === 200) {
          setRegistros(data.registros);
        } else {
          setMessage("No se encontraron registros de actividad.");
        }
      })
      .catch((error) => {
        console.error("Error al conectar con el servidor:", error);
        setMessage("Error al conectar con el servidor.");
      });
  }, []);

  const registrosFiltrados = filtrarRegistros(registros, filtroFecha);

  const handleDelete = (idRegistro) => {
    fetch(
      `https://movetrack.develotion.com/registros.php?idRegistro=${idRegistro}`,
      {
        method: "DELETE",
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
          setRegistros((prevRegistros) =>
            prevRegistros.filter((registro) => registro.id !== idRegistro)
          );
          setMessage("Registro eliminado exitosamente");
        } else {
          setMessage("Error al eliminar el registro");
        }
      })
      .catch((error) => {
        console.error("Error al eliminar el registro:", error);
        setMessage("Error al eliminar el registro.");
      });
  };

  return (
    <div className="container">
      <h2>Mis Registros de Actividad Física</h2>
      {message && <p>{message}</p>}

      {registrosFiltrados.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Actividad</th>
              <th>Fecha</th>
              <th>Duración (min)</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {registrosFiltrados.map((registro) => {
              const actividad = actividades2.find(
                (act) => act.id === registro.idActividad
              );
              return (
                <tr key={registro.id}>
                  <td>{`Actividad ${registro.idActividad}`}</td>
                  <td>{registro.fecha}</td>
                  <td>{registro.tiempo} minutos</td>
                  <td>
                    {actividad && actividad.imagen && (
                      <img
                        src={`https://movetrack.develotion.com/imgs/${actividad.imagen}.png`}
                        alt="Actividad"
                        style={{ width: "40px", marginLeft: "10px", borderWidth: "1px", borderStyle: "solid", borderColor: " #ff5733" }}
                      />
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleDelete(registro.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No tienes registros de actividad para el filtro seleccionado.</p>
      )}

      <div>
        <label htmlFor="filtroFecha">Filtrar por fecha: </label>
        <select
          id="filtroFecha"
          value={filtroFecha}
          onChange={(e) => setFiltroFecha(e.target.value)}
        >
          <option value="todos">Todo el histórico</option>
          <option value="semana">Última semana</option>
          <option value="mes">Último mes</option>
        </select>
      </div>

      <button type="button" onClick={() => navigate("/home")}>
        Cargar Nueva Actividad
      </button>
    </div>
  );
};

export default VerRegistros;
