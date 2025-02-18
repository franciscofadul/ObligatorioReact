import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

import "../src/App.css";

function Registro() {
  const navigate = useNavigate(); // Definir navigate aquí

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [paises, setPaises] = useState([]); 
  const [paisSeleccionado, setPaisSeleccionado] = useState("");
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    fetch("https://movetrack.develotion.com/paises.php", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.codigo === 200) {
          setPaises(data.paises);
        } else {
          console.error("Error al cargar países");
        }
      })
      .catch((error) => console.error("Error al conectar con el servidor:", error));
  }, []);

  useEffect(() => {
    console.log("País seleccionado:", paisSeleccionado);
  }, [paisSeleccionado]);

  const registroUsuario = (e) => {
    e.preventDefault();
    fetch("https://movetrack.develotion.com/usuarios.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuario: username,
        password: password,
        idPais: paisSeleccionado,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.codigo === 200) {
          setMessage("Usuario registrado correctamente");
          setApiKey(data.apiKey);
          navigate("/"); 
        } else {
          setMessage(data.mensaje); 
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
      <form onSubmit={registroUsuario}>
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
        <select value={paisSeleccionado} onChange={(e) => setPaisSeleccionado(e.target.value)} required>
          <option value="">Seleccione un país</option>
          {paises.map((pais) => (
            <option key={pais.id} value={pais.id}>
              {pais.name}
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
