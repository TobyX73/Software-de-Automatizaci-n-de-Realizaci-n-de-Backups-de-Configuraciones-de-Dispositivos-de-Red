import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SideBar from "../components/sideBar";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function HomePage() {
  const navigate = useNavigate();
  const [totalDispositivos, setTotalDispositivos] = useState(0);
  const [totalBackups, setTotalBackups] = useState(0);
  const [conectados, setConectados] = useState(0);
  const [desconectados, setDesconectados] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8080/devices")
      .then((res) => res.json())
      .then((data) => {
        setTotalDispositivos(data.length);
        setConectados(data.filter((d) => d.status === "Conectado").length);
        setDesconectados(
          data.filter((d) => d.status === "Desconectado").length
        );
      })
      .catch(() => {
        setTotalDispositivos(0);
        setConectados(0);
        setDesconectados(0);
      });

    fetch("http://localhost:8080/backups")
      .then((res) => res.json())
      .then((data) => {
        setTotalBackups(data.length);
      })
      .catch(() => {
        setTotalBackups(0);
      });
  }, []);

  // Usar los valores reales para el gráfico
  const pieData = {
    labels: ["Conectados", "Desconectados"],
    datasets: [
      {
        data:
          conectados === 0 && desconectados === 0
            ? [3, 5] // Valor ficticio para evitar ambos ceros
            : [conectados, desconectados],
        backgroundColor: ["#4ade80", "#f87171"],
        borderColor: ["#22c55e", "#ef4444"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <SideBar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Resumen del Sistema
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow">
            <div className="text-gray-500 font-bold mb-2">
              Dispositivos registrados
            </div>
            <div className="text-3xl font-bold text-gray-800">
              {totalDispositivos}
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow">
            <div className="text-gray-500 font-bold mb-2">Backups exitosos</div>
            <div className="text-3xl font-bold text-gray-800">
              {totalBackups}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow flex flex-col items-center justify-center">
            <div className="w-64 h-64 flex items-center justify-center">
              <Pie data={pieData} />
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-green-400 rounded-full inline-block"></span>
                <span className="text-gray-600 text-sm">Conectados</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-red-400 rounded-full inline-block"></span>
                <span className="text-gray-600 text-sm">Desconectados</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <button
            onClick={() => navigate("/devices")}
            className="cursor-pointer flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition font-medium "
          >
            Agregar dispositivo
          </button>
          <button
            onClick={() => navigate("/backups")}
            className="cursor-pointer flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition font-medium"
          >
            Ejecutar Backup manual
          </button>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
