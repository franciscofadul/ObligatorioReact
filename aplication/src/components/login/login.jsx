import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../App.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
          toast.success(data.mensaje);
          localStorage.setItem("apiKey", data.apiKey);
          localStorage.setItem("userid", data.id);
          navigate("/home");
        } else {
          toast.error(data.mensaje);
          console.log(data.mensaje);
        }
      })
      .catch(() => toast.error("Error al conectar con el servidor"));
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
        {username && password && <button type="submit">Iniciar</button>}
        <p>¿No tienes cuenta?</p>
        <button type="button" onClick={() => navigate("/registro")}>
          Registrarme
        </button>
      </form>
    </div>
  );
};

export default Login;
