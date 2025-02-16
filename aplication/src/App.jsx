import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Hook para navegar

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://movetrack.develotion.com/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usuario: username, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.codigo === 200) {
          setMessage("Inicio de sesión exitoso");
          localStorage.setItem("apiKey", data.apiKey);
        } else {
          setMessage("Error en las credenciales");
        }
      })
      .catch(() => setMessage("Error al conectar con el servidor"));
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
        <button type="submit">Iniciar</button>
        <button type="button" onClick={() => navigate("/registro")}>
          Registrarme
        </button>
      </form>
      <p id="message">{message}</p>
    </div>
  );
}

export default App;
