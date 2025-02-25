import { useState, useEffect } from "react";
import "../../App.css";


const TiempoTotal = () => {
  const [tiempoTotal, setTiempoTotal] = useState(0);

  useEffect(() => {
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
         
          const total = data.registros.reduce((sum, registro) => sum + parseInt(registro.tiempo), 0);
          setTiempoTotal(total);
        }
      })
      .catch((error) => {
        console.error("Error al obtener registros:", error);
      });
  }, []);

  return (
    <div className="container">
      <h2>Tiempo Total Registrado</h2>
      <p>{tiempoTotal} minutos</p>
    </div>
  );
}

export default TiempoTotal;
