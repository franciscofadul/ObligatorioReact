import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
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

const GraficoMinutos = () => {
    const registros = useSelector((state) => state.registros.lista);
    console.log("Registros grafico:", registros);
    const [minutosPorDia, setMinutosPorDia] = useState({ labels: [], dataMinutos: [] });

    const obtenerMinutosUltimaSemana = () => {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0); 

        const diasDeLaSemana = [];

        for (let i = 6; i >= 0; i--) {
            const dia = new Date(hoy);
            dia.setDate(hoy.getDate() - i);
            diasDeLaSemana.push(dia.toISOString().split("T")[0]); 
        }

        const minutosPorDia = {};

        diasDeLaSemana.forEach((dia) => {
            minutosPorDia[dia] = 0;
        });

        registros.forEach((registro) => {
            const fechaRegistro = new Date(registro.fecha);
            const fechaRegistroUTC = fechaRegistro.toISOString().split("T")[0];

            if (minutosPorDia.hasOwnProperty(fechaRegistroUTC)) {
                minutosPorDia[fechaRegistroUTC] += registro.tiempo;
            }
        });

        const labels = diasDeLaSemana;
        const dataMinutos = diasDeLaSemana.map((dia) => minutosPorDia[dia]);

        setMinutosPorDia({ labels, dataMinutos });
    };

    useEffect(() => {
        obtenerMinutosUltimaSemana();
    }, [registros]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Minutos Ejercitados en los Últimos 7 Días",
            },
        },
    };

    const data = {
        labels: minutosPorDia.labels,
        datasets: [
            {
                label: "Minutos de Ejercicio",
                data: minutosPorDia.dataMinutos,
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
        ],
    };

    return (
        <div className="container">
            <h2>Gráfico de Minutos de Ejercicio - Últimos 7 Días</h2>
            <Bar options={options} data={data} />
        </div>
    );
};

export default GraficoMinutos;