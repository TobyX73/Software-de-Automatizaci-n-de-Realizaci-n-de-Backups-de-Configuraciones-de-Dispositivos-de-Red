import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function BackupConfig({ onConfigSaved }) {
  const [dispositivo, setDispositivo] = useState("");
  const [periodicity, setPeriodicity] = useState("");
  const [auto, setAuto] = useState(false);
  const [dispositivos, setDispositivos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [pendientes, setPendientes] = useState([]);

  // Cargar dispositivos y backups pendientes
  useEffect(() => {
    fetch("http://localhost:8080/devices")
      .then((res) => res.json())
      .then((data) => setDispositivos(data))
      .catch(() => setDispositivos([]));

    // Traer dispositivos con periodicidad asignada y sin backup ejecutado
    fetch("http://localhost:8080/backups/pendientes")
      .then((res) => res.json())
      .then((data) => setPendientes(data))
      .catch(() => setPendientes([]));
  }, [onConfigSaved]); // refresca cuando se guarda config

  const handleGuardar = async () => {
    setMensaje("");
    if (!dispositivo || !periodicity) {
      setMensaje("Seleccione dispositivo y periodicidad.");
      Swal.fire({
        icon: "warning",
        title: "Campos requeridos",
        text: "Seleccione dispositivo y periodicidad.",
      });
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:8080/devices/${dispositivo}/config-periodicity`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            periodicity: periodicity.toUpperCase(),
            automatico: auto,
          }),
        }
      );
      if (res.ok) {
        setMensaje("Configuración guardada correctamente.");
        Swal.fire({
          icon: "success",
          title: "Guardado",
          text: "Configuración guardada correctamente.",
        });
        if (typeof onConfigSaved === "function") onConfigSaved();
      } else {
        setMensaje("Error al guardar la configuración.");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al guardar la configuración.",
        });
      }
    } catch {
      setMensaje("Error de conexión con el servidor.");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error de conexión con el servidor.",
      });
    }
  };

  // Ejecutar backup manual para pendientes
  const handleEjecutarBackup = async (deviceId, periodicity) => {
    try {
      const res = await fetch(
        `http://localhost:8080/backups/execute/${deviceId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ periodicity: periodicity.toUpperCase() }),
        }
      );
      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Backup ejecutado",
          text: "El backup se ejecutó correctamente.",
        });
        // Refrescar la tabla de pendientes
        fetch("http://localhost:8080/backups/pendientes")
          .then((res) => res.json())
          .then((data) => setPendientes(data))
          .catch(() => setPendientes([]));
        if (typeof onConfigSaved === "function") onConfigSaved();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al ejecutar el backup.",
        });
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error de conexión con el servidor.",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">
        Configuración de periodicidad
      </h2>
      <div className="mb-4">
        <label className="block mb-1 text-gray-700">
          Seleccionar dispositivo
        </label>
        <select
          className="border border-gray-300 rounded px-3 py-1 w-full text-gray-900"
          value={dispositivo}
          onChange={(e) => setDispositivo(e.target.value)}
        >
          <option value="">Seleccione un dispositivo</option>
          {dispositivos.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-gray-700">Periodicidad</label>
        <div className="flex flex-col gap-2 pl-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="periodicity"
              value="Diario"
              checked={periodicity === "Diario"}
              onChange={() => setPeriodicity("Diario")}
            />
            <span className="text-gray-700">Diario</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="periodicity"
              value="Semanal"
              checked={periodicity === "Semanal"}
              onChange={() => setPeriodicity("Semanal")}
            />
            <span className="text-gray-700">Semanal</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="periodicity"
              value="Mensual"
              checked={periodicity === "Mensual"}
              onChange={() => setPeriodicity("Mensual")}
            />
            <span className="text-gray-700">Mensual</span>
          </label>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <input type="checkbox" checked={auto} onChange={() => setAuto(!auto)} />
        <span className="text-gray-700">Activar respaldo automatico</span>
      </div>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition font-medium"
        onClick={handleGuardar}
      >
        Guardar configuración
      </button>
      <div className="text-gray-500 text-sm mt-2">
        Formulario para configurar periodicidad y activar o desactivar respaldo
        automático para dispositivos seleccionados.
      </div>
      {mensaje && (
        <div className="mt-2 text-sm text-center text-blue-700">{mensaje}</div>
      )}

      {/* Tabla de dispositivos pendientes de backup */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">
          Dispositivos con periodicidad asignada y sin backup ejecutado
        </h3>
        <table className="w-full text-left mb-4 border">
          <thead>
            <tr className="bg-slate-800 text-white">
              <th className="py-2 px-2">ID</th>
              <th className="py-2 px-2">Nombre</th>
              <th className="py-2 px-2">Periodicidad</th>
              <th className="py-2 px-2">Acción</th>
            </tr>
          </thead>
          <tbody>
            {pendientes.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No hay dispositivos pendientes de backup.
                </td>
              </tr>
            ) : (
              pendientes.map((d) => (
                <tr key={d.id} className="border-b text-gray-700">
                  <td className="py-2 px-2">{d.id}</td>
                  <td className="py-2 px-2">{d.name}</td>
                  <td className="py-2 px-2">{d.periodicity}</td>
                  <td className="py-2 px-2">
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                      onClick={() => handleEjecutarBackup(d.id, d.periodicity)}
                    >
                      Ejecutar backup
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
