import React, { useState } from "react";

const initialDevices = [
  {
    id: 1,
    nombre: "Router Principal",
    ip: "192.168.1.1",
    usuario: "admin",
    tipo: "Router",
    estado: "Exitoso",
  },
  {
    id: 2,
    nombre: "Switch Oficina",
    ip: "192.168.1.2",
    usuario: "user",
    tipo: "Switch",
    estado: "Fallido",
  },
  {
    id: 3,
    nombre: "Firewall",
    ip: "192.168.1.3",
    usuario: "root",
    tipo: "Firewall",
    estado: "Pendiente",
  },
  {
    id: 4,
    nombre: "Firewall",
    ip: "192.168.1.3",
    usuario: "root",
    tipo: "Switch",
    estado: "Pendiente",
  },
  {
    id: 5,
    nombre: "Firewall",
    ip: "192.168.1.46",
    usuario: "root",
    tipo: "Firewall",
    estado: "Exitoso",
  },
];

const estadoColors = {
  Exitoso: "bg-green-100 text-green-700",
  Fallido: "bg-red-100 text-red-700",
  Pendiente: "bg-orange-100 text-orange-700",
};

export default function DevicesLogic() {
  const [devices, setDevices] = useState(initialDevices);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [filtroNombre, setFiltroNombre] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("Todos");

  // Nuevo estado para edición
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deviceToDelete, setDeviceToDelete] = useState(null);

  // Ordenar dispositivos
  const sortedDevices = [...devices].sort((a, b) => {
    if (!sortConfig.key) return 0;
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];
    if (sortConfig.key === "id") {
      aValue = Number(aValue);
      bValue = Number(bValue);
    }
    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Filtrar dispositivos por todos los campos y por estado
  const filteredDevices = sortedDevices.filter((device) => {
    const matchTexto = Object.values(device)
      .join(" ")
      .toLowerCase()
      .includes(filtroNombre.toLowerCase());
    const matchEstado =
      estadoFiltro === "Todos" ? true : device.estado === estadoFiltro;
    return matchTexto && matchEstado;
  });

  // Cambiar orden
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Guardar cambios de edición
  const handleSave = (id) => {
    setDevices((prev) =>
      prev.map((dev) => (dev.id === id ? { ...dev, ...editData } : dev))
    );
    setEditId(null);
    setEditData({});
  };

  // Cancelar edición
  const handleCancel = () => {
    setEditId(null);
    setEditData({});
  };

  const handleDelete = (id) => {
    setDevices((prev) => prev.filter((dev) => dev.id !== id));
    setShowDeleteModal(false);
    setDeviceToDelete(null);
  };

  return (
    <div>
      {/* Buscador y filtro de estado */}
      <div className="flex items-center mb-4 w-full">
        <div className="relative w-72">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-search-icon lucide-search"
            >
              <path d="m21 21-4.34-4.34" />
              <circle cx="11" cy="11" r="8" />
            </svg>
          </span>
          <input
            type="text"
            value={filtroNombre}
            onChange={(e) => setFiltroNombre(e.target.value)}
            placeholder="Buscar..."
            className="pl-10 pr-4 py-1 w-full border border-gray-500 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-gray-200 transition placeholder-gray-700 text-gray-900"
          />
        </div>
        <select
          value={estadoFiltro}
          onChange={(e) => setEstadoFiltro(e.target.value)}
          className="ml-auto border border-gray-500 rounded-lg py-1 px-3 shadow focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-900"
          style={{ minWidth: 180 }}
        >
          <option value="Todos">Todos los dispositivos</option>
          <option value="Exitoso">Exitoso</option>
          <option value="Fallido">Fallido</option>
          <option value="Pendiente">Pendiente</option>
        </select>
      </div>
      <table className="min-w-full text-black bg-white rounded-lg shadow overflow-hidden">
        <thead>
          <tr className="bg-slate-800 text-white">
            <th
              className="px-6 py-3 text-center font-semibold cursor-pointer"
              onClick={() => handleSort("id")}
            >
              Id{" "}
              {sortConfig.key === "id"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th className="px-6 py-3 text-center font-semibold">Nombre</th>
            <th className="px-6 py-3 text-center font-semibold">IP</th>
            <th className="px-6 py-3 text-center font-semibold">Usuario</th>
            <th className="px-6 py-3 text-center font-semibold">Tipo</th>
            <th
              className="px-6 py-3 text-center font-semibold cursor-pointer"
              onClick={() => handleSort("estado")}
            >
              Estado{" "}
              {sortConfig.key === "estado"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th className="px-6 py-3 text-center font-semibold">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredDevices.map((device) => (
            <tr
              key={device.id}
              className="border-b hover:bg-blue-50 hover:shadow-md transition-all"
            >
              {editId === device.id ? (
                <>
                  <td className="px-6 py-4 text-center">{device.id}</td>
                  <td className="px-6 py-4 text-center">
                    <input
                      className="border rounded px-2 py-1 w-full"
                      value={editData.nombre ?? device.nombre}
                      onChange={(e) =>
                        setEditData((d) => ({ ...d, nombre: e.target.value }))
                      }
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <input
                      className="border rounded px-2 py-1 w-full"
                      value={editData.ip ?? device.ip}
                      onChange={(e) =>
                        setEditData((d) => ({ ...d, ip: e.target.value }))
                      }
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <input
                      className="border rounded px-2 py-1 w-full"
                      value={editData.usuario ?? device.usuario}
                      onChange={(e) =>
                        setEditData((d) => ({ ...d, usuario: e.target.value }))
                      }
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <input
                      className="border rounded px-2 py-1 w-full"
                      value={editData.tipo ?? device.tipo}
                      onChange={(e) =>
                        setEditData((d) => ({ ...d, tipo: e.target.value }))
                      }
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <input
                      className="border rounded px-2 py-1 w-full bg-gray-100 cursor-not-allowed"
                      value={device.estado}
                      disabled
                    />
                  </td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => handleSave(device.id)}
                    >
                      Guardar
                    </button>
                    <button
                      className="bg-gray-400 text-white px-2 py-1 rounded"
                      onClick={handleCancel}
                    >
                      Cancelar
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="px-6 py-4 text-center">{device.id}</td>
                  <td className="px-6 py-4 text-center">{device.nombre}</td>
                  <td className="px-6 py-4 text-center">{device.ip}</td>
                  <td className="px-6 py-4 text-center">{device.usuario}</td>
                  <td className="px-6 py-4 text-center">{device.tipo}</td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${
                        estadoColors[device.estado] || ""
                      }`}
                    >
                      {device.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                      className="hover:bg-yellow-200 transition text-white py-2 px-1 rounded-full text-sm cursor-pointer"
                      title="Editar"
                      onClick={() => {
                        setEditId(device.id);
                        setEditData(device);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
                      </svg>
                    </button>
                    <button
                      title="Eliminar"
                      className="hover:bg-red-300 transition text-white px-2 py-1 rounded-full text-sm cursor-pointer"
                      onClick={() => {
                        setShowDeleteModal(true);
                        setDeviceToDelete(device);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-red-500"
                        x="0px"
                        y="0px"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"></path>
                      </svg>
                    </button>
                    <button
                      title="Probar Conexión"
                      className="hover:bg-sky-200 transition text-white px-2 py-1 rounded-full text-sm cursor-pointer"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14 2V8H20"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 13L12 16L17 11"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de confirmación de eliminación */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-2 text-red-600">
              ¿Estás seguro que quieres eliminar este dispositivo?
            </h2>
            <p className="mb-4 text-gray-700">
              <strong>Advertencia:</strong> Esta acción no es reversible.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeviceToDelete(null);
                }}
              >
                Cancelar
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => handleDelete(deviceToDelete.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
