import { useState, useEffect } from "react";
import "../../App.css";


const TiempoDiario = () => {
  const [tiempoDiario, setTiempoDiario] = useState(0);

  useEffect(() => {
    const hoy = new Date().toISOString().split('T')[0]; 

    fetch(`https://movetrack.develotion.com/registros.php?idUsuario=${localStorage.getItem("userid")}`, {
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
          console.log("Registros:", data.registros);
          const totalHoy = data.registros.reduce((sum, registro) => {
            if (registro.fecha.split('T')[0] === hoy) {
              return sum + parseInt(registro.tiempo);
            }
            return sum;
          }, 0);
          setTiempoDiario(totalHoy);
        }
      })
      .catch((error) => {
        console.error("Error al obtener registros:", error);
      });
  }, []);

  return (
    <div className="container">
      <h2>Tiempo Registrado Hoy</h2>
      <p>{tiempoDiario} minutos</p>
    </div>
  );
}

export default TiempoDiario;
