import SideBar from "../components/sideBar";
import { useLogs } from "../logic/logs";
import Swal from "sweetalert2";

function LogsPage() {
  const {
    type,
    setType,
    date,
    setDate,
    device,
    setDevice,
    logs,
    chosenLog,
    setChosenLog,
    exportLogs,
    clearHistory,
  } = useLogs();

  const handleExportLogs = () => {
    exportLogs();
    Swal.fire({
      icon: "success",
      title: "Exportado",
      text: "Los logs se exportaron correctamente.",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <SideBar />
      <main className="flex-1 p-8">
        <div className="rounded-lg p-3 text-center overflow-x-auto">
          <div className="text-gray-800 font-bold mb-4 text-3xl">
            {" "}
            Logs del Sistema de Backups
          </div>

          <div className="flex p-4 gap-4 rounded-md justify-center">
            <div>
              <label className="text-sm font-medium text-gray-700 mr-2">
                Tipo:
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="bg-white border border-gray-300 rounded px-2 py-1 text-sm text-gray-700 pr-13"
              >
                <option>Todos</option>
                {[...new Set(logs.map((log) => log.tipo))]
                  .filter(Boolean)
                  .map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex items-center">
              <label className="text-sm font-medium text-gray-700 mr-2">
                Fecha:
              </label>
              <div className="relative flex items-center">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-white border border-gray-300 rounded px-2 py-1 text-sm font-mono text-gray-700"
                />
                <span className="absolute right-2 pointer-events-none"></span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mr-2">
                Dispositivo:
              </label>
              <select
                value={device}
                onChange={(e) => setDevice(e.target.value)}
                className="bg-white border border-gray-300 rounded px-2 py-1 text-sm text-gray-700 pr-13"
              >
                <option>Todos</option>
                {[...new Set(logs.map((log) => log.dispositivo))]
                  .filter(Boolean)
                  .map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-4">
            <button
              onClick={handleExportLogs}
              className="bg-green-600 hover:bg-green-700 text-white py-1.5 px-5 rounded-lg transition font-medium"
            >
              Exportar logs
            </button>
            <button
              onClick={() => {
                clearHistory();
                Swal.fire({
                  icon: "success",
                  title: "Historial borrado",
                  text: "Los logs han sido eliminados correctamente.",
                  timer: 2000,
                  showConfirmButton: false,
                });
              }}
              className="bg-red-600 hover:bg-red-700 text-white py-1.5 px-5 rounded-lg transition font-medium"
            >
              Borrar historial
            </button>
          </div>

          <table className="rounded-lg min-w-full divide-y divide-gray-200 shadow">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-sm tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-sm tracking-wider">
                  Dispositivo
                </th>
                <th className="px-6 py-3 text-left text-sm tracking-wider">
                  Descripción
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs.map((log, idx) => (
                <tr
                  key={idx}
                  onClick={() => setChosenLog(log)}
                  className="cursor-pointer hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-sm text-left text-gray-700">
                    {log.fecha}
                  </td>
                  <td
                    className={`px-6 py-4 text-sm text-left font-bold ${
                      log.tipo === "ERROR" ? "text-red-700" : "text-green-600"
                    }`}
                  >
                    {log.tipo}
                  </td>
                  <td className="px-6 py-4 text-sm text-left text-gray-700">
                    {log.dispositivo}
                  </td>
                  <td className="px-6 py-4 text-sm text-left text-gray-700">
                    {log.descripcion}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="flex text-sm text-gray-700 p-6">
            Tabla de logs con columnas fecha, tipo, dispositivo y descripción.
            Seleccione una fila para ver más detalles.
          </p>

          <table className="bg-white rounded-lg min-w-full divide-y divide-gray-200 shadow mt-6">
            <tbody>
              <tr>
                <td className="text-sm flex font-mono text-gray-700 p-6 mb-6">
                  {chosenLog
                    ? chosenLog.descripcion ||
                      "Este log no contiene información ampliada."
                    : "Seleccione un log para ver los detalles aquí."}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
export default LogsPage;
