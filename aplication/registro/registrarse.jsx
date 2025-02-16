import { useState, useEffect } from "react";
import "../src/App.css";

function Registro() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [paises, setPaises] = useState([]); // Estado para los países
  const [paisSeleccionado, setPaisSeleccionado] = useState(""); // Estado para el país seleccionado

  useEffect(() => {
    cargarPaises();
  }, []);

  const cargarPaises = () => {
    fetch("https://movetrack.develotion.com/paises.php", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.codigo === 200) {
          setPaises(data.paises); // Guardamos los países en el estado
        } else {
          console.error("Error al cargar países");
        }
      })
      .catch((error) => {
        console.error("Error al conectar con el servidor:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://movetrack.develotion.com/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuario: username,
        password: password,
        pais: paisSeleccionado, // Enviar país seleccionado
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.codigo === 200) {
          setMessage("Inicio de sesión exitoso");
          console.log("API Key:", data.apiKey);
          localStorage.setItem("apiKey", data.apiKey);
        } else {
          setMessage("Error en las credenciales");
        }
      })
      .catch((error) => {
        console.error("Error al conectar con el servidor:", error);
        setMessage("Error al conectar con el servidor");
      });
  };

  return (
    <div className="container">
      <div className="inicioSesion">
        <img src="img/fondochico.jpg" alt="Logo de Fitness" className="logo" />
        <h2>Registro de Usuario</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Select para países */}
        <select value={paisSeleccionado} onChange={(e) => setPaisSeleccionado(e.target.value)} required>
          <option value="">Seleccione un país</option>
          {paises.map((pais) => (
            <option key={pais.id} value={pais.id}>
              {pais.name} {/* <-- Aquí estaba el error */}
            </option>
          ))}
        </select>

        <button type="submit">Registrarme</button>
      </form>
      <p id="message">{message}</p>
    </div>
  );
}

export default Registro;
