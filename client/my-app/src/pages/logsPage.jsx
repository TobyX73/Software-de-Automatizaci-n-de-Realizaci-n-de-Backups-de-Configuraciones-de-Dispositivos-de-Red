import SideBar from "../components/sideBar";
import { useLogs } from "../logic/logs";
import { useNavigate } from "react-router-dom";

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
    clearHistory,
    exportLogs,
  } = useLogs();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-gray-100">
      <SideBar />
      <main className="flex-1 p-8">
        <div className="rounded-lg p-3 text-center overflow-x-auto">
          <div className="text-gray-800 font-bold mb-4 text-3xl">
            {" "}
            Logs del Sistema de Backups
          </div>

          {/* Filtros */}
          <div className="flex p-4 gap-4 rounded-md justify-center">
            {/* Filtro por tipo */}
            <div>
              <label className="text-sm font-medium text-gray-700 mr-2">
                Tipo:
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="bg-white border border-gray-300 rounded px-2 py-1 text-sm text-gray-700"
              >
                <option>Todos</option>
                <option>INFO</option>
                <option>ERROR</option>
              </select>
            </div>

            {/* Filtro por fecha */}
            <div className="flex items-center">
              <label className="text-sm font-medium text-gray-700 mr-2">
                Fecha:
              </label>
              <div className="relative flex items-center">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-white border border-gray-300 rounded px-2 py-1 text-sm font-mono text-gray-700 pr-10"
                />
                <span className="absolute right-2 pointer-events-none">
                  <svg
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 128 128"
                    className="w-5 h-5 text-gray-400"
                  >
                    <path d="M113.854 22.323h-9.667v-2.677a7.25 7.25 0 0 0-14.5 0v2.677H38.313v-2.677a7.25 7.25 0 0 0-14.5 0v2.677h-9.667a1.75 1.75 0 0 0-1.75 1.75v89.781a1.751 1.751 0 0 0 1.75 1.75h99.708a1.751 1.751 0 0 0 1.75-1.75V24.073a1.75 1.75 0 0 0-1.75-1.75zm-20.667-2.677a3.75 3.75 0 0 1 7.5 0V28.5a3.75 3.75 0 0 1-7.5 0zm-65.874 0a3.75 3.75 0 0 1 7.5 0V28.5a3.75 3.75 0 0 1-7.5 0zm-3.5 6.177V28.5a7.25 7.25 0 0 0 14.5 0v-2.677h51.374V28.5a7.25 7.25 0 0 0 14.5 0v-2.677h7.913V44.2H15.9V25.823zM15.9 112.1V47.7h96.2v64.4z" />
                    <path d="M40.2 56h-8.721a1.749 1.749 0 0 0-1.75 1.75v8.719a1.749 1.749 0 0 0 1.75 1.75H40.2a1.749 1.749 0 0 0 1.75-1.75V57.75A1.749 1.749 0 0 0 40.2 56zm-1.75 8.719h-5.221V59.5h5.218zM58.972 56h-8.719a1.75 1.75 0 0 0-1.75 1.75v8.719a1.75 1.75 0 0 0 1.75 1.75h8.719a1.75 1.75 0 0 0 1.75-1.75V57.75a1.75 1.75 0 0 0-1.75-1.75zm-1.75 8.719H52V59.5h5.219zM77.747 56h-8.719a1.75 1.75 0 0 0-1.75 1.75v8.719a1.75 1.75 0 0 0 1.75 1.75h8.719a1.749 1.749 0 0 0 1.75-1.75V57.75a1.749 1.749 0 0 0-1.75-1.75zM76 64.719h-5.222V59.5H76zM96.521 56H87.8a1.749 1.749 0 0 0-1.75 1.75v8.719a1.749 1.749 0 0 0 1.75 1.75h8.718a1.749 1.749 0 0 0 1.75-1.75V57.75A1.749 1.749 0 0 0 96.521 56zm-1.75 8.719h-5.218V59.5h5.218zM40.2 74h-8.721a1.749 1.749 0 0 0-1.75 1.75v8.719a1.749 1.749 0 0 0 1.75 1.75H40.2a1.749 1.749 0 0 0 1.75-1.75V75.75A1.749 1.749 0 0 0 40.2 74zm-1.75 8.719h-5.221V77.5h5.218zM58.972 74h-8.719a1.75 1.75 0 0 0-1.75 1.75v8.719a1.75 1.75 0 0 0 1.75 1.75h8.719a1.75 1.75 0 0 0 1.75-1.75V75.75a1.75 1.75 0 0 0-1.75-1.75zm-1.75 8.719H52V77.5h5.219zM77.747 74h-8.719a1.75 1.75 0 0 0-1.75 1.75v8.719a1.75 1.75 0 0 0 1.75 1.75h8.719a1.749 1.749 0 0 0 1.75-1.75V75.75a1.749 1.749 0 0 0-1.75-1.75zM76 82.719h-5.222V77.5H76zM96.521 74H87.8a1.749 1.749 0 0 0-1.75 1.75v8.719a1.749 1.749 0 0 0 1.75 1.75h8.718a1.749 1.749 0 0 0 1.75-1.75V75.75A1.749 1.749 0 0 0 96.521 74zm-1.75 8.719h-5.218V77.5h5.218zM40.2 92h-8.721a1.749 1.749 0 0 0-1.75 1.75v8.719a1.749 1.749 0 0 0 1.75 1.75H40.2a1.749 1.749 0 0 0 1.75-1.75V93.75A1.749 1.749 0 0 0 40.2 92zm-1.75 8.719h-5.221V95.5h5.218zM58.972 92h-8.719a1.75 1.75 0 0 0-1.75 1.75v8.719a1.75 1.75 0 0 0 1.75 1.75h8.719a1.75 1.75 0 0 0 1.75-1.75V93.75a1.75 1.75 0 0 0-1.75-1.75zm-1.75 8.719H52V95.5h5.219zM77.747 92h-8.719a1.75 1.75 0 0 0-1.75 1.75v8.719a1.75 1.75 0 0 0 1.75 1.75h8.719a1.749 1.749 0 0 0 1.75-1.75V93.75a1.749 1.749 0 0 0-1.75-1.75zM76 100.719h-5.222V95.5H76zM96.521 92H87.8a1.749 1.749 0 0 0-1.75 1.75v8.719a1.749 1.749 0 0 0 1.75 1.75h8.718a1.749 1.749 0 0 0 1.75-1.75V93.75A1.749 1.749 0 0 0 96.521 92zm-1.75 8.719h-5.218V95.5h5.218z" />
                </svg>
                </span>
              </div>
            </div>

            {/* Filtro por dispositivo */}
            <div>
              <label className="text-sm font-medium text-gray-700 mr-2">
                Dispositivo:
              </label>
              <select
                value={device}
                onChange={(e) => setDevice(e.target.value)}
                className="bg-white border border-gray-300 rounded px-2 py-1 text-sm text-gray-700"
              >
                <option>Todos</option>
                <option>Router Principal</option>
                <option>Servidor Backup</option>
                <option>Router Secundario</option>
              </select>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-center gap-4 mb-4">
            <button
              onClick={clearHistory}
              className="bg-red-600 hover:bg-red-700 text-white py-1.5 px-5 rounded-lg transition font-medium"
            >
              Limpiar logs
            </button>
            <button
              onClick={exportLogs}
              className="bg-green-600 hover:bg-green-700 text-white py-1.5 px-5 rounded-lg transition font-medium"
            >
              Exportar logs
            </button>
          </div>

          {/* Tabla de logs */}
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
                    {log.date}
                  </td>
                  <td
                    className={`px-6 py-4 text-sm text-left font-bold ${
                      log.type === "ERROR" ? "text-red-700" : "text-green-600"
                    }`}
                  >
                    {log.type}
                  </td>
                  <td className="px-6 py-4 text-sm text-left text-gray-700">
                    {log.device}
                  </td>
                  <td className="px-6 py-4 text-sm text-left text-gray-700">
                    {log.description}
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
                    ? chosenLog.extendedDescription ||
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
