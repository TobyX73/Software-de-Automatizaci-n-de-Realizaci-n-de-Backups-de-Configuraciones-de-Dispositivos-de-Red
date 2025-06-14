import { useState, useEffect } from "react";
import axios from "axios";

const estados = {
  Exitoso: "text-green-600",
  Fallido: "text-red-600",
  Pendiente: "text-yellow-600",
};

export default function BackupsTable() {
  const [backupsData, setBackupsData] = useState([]);
  const [filtroDispositivo, setFiltroDispositivo] = useState("Todos");
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [filtroFecha, setFiltroFecha] = useState("desc");

  useEffect(() => {
    axios
      .get("http://localhost:8080/backups")
      .then((res) => setBackupsData(res.data))
      .catch(() => setBackupsData([]));
  }, []);

  // Lista de nombres de dispositivos únicos
  const dispositivosUnicos = [
    ...new Set(backupsData.map((b) => b.device?.name).filter((name) => !!name)),
  ];

  // Filtro y orden
  let backupsFiltrados = backupsData
    .filter(
      (b) =>
        (filtroDispositivo === "Todos" ||
          b.device?.name === filtroDispositivo) &&
        (filtroEstado === "Todos" || b.status === filtroEstado)
    )
    .sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return filtroFecha === "desc"
        ? b.date.localeCompare(a.date)
        : a.date.localeCompare(b.date);
    });

  // Ejecutar backup manual
  const handleEjecutar = (id) => {
    axios
      .post(`http://localhost:8080/backups/execute/${id}`)
      .then((res) => alert(res.data?.message || "Backup ejecutado"))
      .catch(() => alert("Error al ejecutar backup"));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Backups</h2>
      <div className="flex flex-wrap gap-4 mb-4">
        <div>
          <label className="mr-2 text-gray-700">Dispositivo:</label>
          <select
            className="border border-gray-300 rounded text-gray-900 px-2 py-1"
            value={filtroDispositivo}
            onChange={(e) => setFiltroDispositivo(e.target.value)}
          >
            <option>Todos</option>
            {dispositivosUnicos.map((d) => (
              <option value={d} key={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mr-2 text-gray-700">Fecha:</label>
          <select
            className="border border-gray-300 text-gray-900 rounded px-2 py-1"
            value={filtroFecha}
            onChange={(e) => setFiltroFecha(e.target.value)}
          >
            <option value="desc">Mas recientes primero</option>
            <option value="asc">Mas antiguos primero</option>
          </select>
        </div>
        <div>
          <label className="mr-2 text-gray-700">Estado:</label>
          <select
            className="border border-gray-300 text-gray-900 rounded px-2 py-1"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option>Todos</option>
            <option>Exitoso</option>
            <option>Fallido</option>
            <option>Pendiente</option>
          </select>
        </div>
      </div>
      <table className="w-full text-left mb-4">
        <thead>
          <tr className="bg-slate-800 text-white">
            <th className="py-2 px-2">ID</th>
            <th className="py-2 px-2">Dispositivo</th>
            <th className="py-2 px-2">Fecha</th>
            <th className="py-2 px-2">Periodicidad</th>
            <th className="py-2 px-2">Estado</th>
            <th className="py-2 px-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {backupsFiltrados.map((b) => (
            <tr key={b.id} className="border-b text-gray-700 hover:bg-gray-50">
              <td className="py-2 px-2">{b.id}</td>
              <td className="py-2 px-2">{b.device?.name}</td>
              <td className="py-2 px-2">{b.date}</td>
              <td className="py-2 px-2">{b.periodicity ?? "No definido"}</td>
              <td className={`py-2 px-2 font-semibold ${estados[b.status]}`}>
                {b.status}
              </td>
              <td className="py-2 px-2 flex gap-2 flex-wrap">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-sm"
                  onClick={() => handleEjecutar(b.id)}
                >
                  Ejecutar ahora
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-gray-500 text-sm">
        Tabla con backups SSH, sortable y filtrable.
      </div>
    </div>
  );
}
