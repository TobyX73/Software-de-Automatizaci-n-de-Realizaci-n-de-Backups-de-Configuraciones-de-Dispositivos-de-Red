import React, { useState, useEffect } from "react";
import axios from "axios";

const estadoColors = {
  Exitoso: "bg-green-100 text-green-700",
  Fallido: "bg-red-100 text-red-700",
  Pendiente: "bg-orange-100 text-orange-700",
  null: "bg-gray-100 text-gray-700",
};

export default function DevicesLogic() {
  const [devices, setDevices] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [filtroNombre, setFiltroNombre] = useState("");

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deviceToDelete, setDeviceToDelete] = useState(null);

  const API_URL = "http://localhost:8080/devices";

  useEffect(() => {
    axios
      .get(API_URL)
      .then(({ data }) => setDevices(data))
      .catch(() => console.error("Error al cargar dispositivos"));
  }, []);

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

  const filteredDevices = sortedDevices.filter((device) => {
    const matchTexto = [
      device.id,
      device.name,
      device.ipHostname,
      device.username,
      device.type,
      device.status,
    ]
      .join(" ")
      .toLowerCase()
      .includes(filtroNombre.toLowerCase());

    return matchTexto;
  });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleSave = (id) => {
    axios
      .put(`${API_URL}/${id}`, editData)
      .then(() => {
        setDevices((prev) =>
          prev.map((dev) => (dev.id === id ? { ...dev, ...editData } : dev))
        );
        setEditId(null);
        setEditData({});
      })
      .catch(() => alert("Error al guardar cambios"));
  };

  const handleCancel = () => {
    setEditId(null);
    setEditData({});
  };

  const handleDelete = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        setDevices((prev) => prev.filter((dev) => dev.id !== id));
        setShowDeleteModal(false);
        setDeviceToDelete(null);
      })
      .catch(() => alert("Error al eliminar dispositivo"));
  };

  const handleTestConnection = (id) => {
    axios
      .get(`${API_URL}/${id}/test-connection`)
      .then((res) => {
        alert(res.data?.message || "Conexión exitosa");
      })
      .catch(() => alert("Error al probar la conexión SSH"));
  };

  return (
    <div>
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
            <th className="px-6 py-3 text-center font-semibold">IP/Hostname</th>
            <th className="px-6 py-3 text-center font-semibold">Usuario</th>
            <th className="px-6 py-3 text-center font-semibold">Tipo</th>
            <th
              className="px-6 py-3 text-center font-semibold cursor-pointer"
              onClick={() => handleSort("status")}
            >
              Estado{" "}
              {sortConfig.key === "status"
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
                      value={editData.name ?? device.name}
                      onChange={(e) =>
                        setEditData((d) => ({ ...d, name: e.target.value }))
                      }
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <input
                      className="border rounded px-2 py-1 w-full"
                      value={editData.ipHostname ?? device.ipHostname}
                      onChange={(e) =>
                        setEditData((d) => ({
                          ...d,
                          ipHostname: e.target.value,
                        }))
                      }
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <input
                      className="border rounded px-2 py-1 w-full"
                      value={editData.username ?? device.username}
                      onChange={(e) =>
                        setEditData((d) => ({
                          ...d,
                          username: e.target.value,
                        }))
                      }
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <input
                      className="border rounded px-2 py-1 w-full"
                      value={editData.type ?? device.type}
                      onChange={(e) =>
                        setEditData((d) => ({
                          ...d,
                          type: e.target.value,
                        }))
                      }
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <input
                      className="border rounded px-2 py-1 w-full bg-gray-100 cursor-not-allowed"
                      value={device.status ?? ""}
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
                  <td className="px-6 py-4 text-center">{device.name}</td>
                  <td className="px-6 py-4 text-center">{device.ipHostname}</td>
                  <td className="px-6 py-4 text-center">{device.username}</td>
                  <td className="px-6 py-4 text-center">{device.type}</td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${
                        estadoColors[device.status] || ""
                      }`}
                    >
                      {device.status ?? "Sin estado"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                      className="hover:bg-yellow-200 transition p-1 rounded-full cursor-pointer"
                      title="Editar"
                      onClick={() => {
                        setEditId(device.id);
                        setEditData(device);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-yellow-600"
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
                      className="hover:bg-red-200 transition p-1 rounded-full cursor-pointer"
                      onClick={() => {
                        setShowDeleteModal(true);
                        setDeviceToDelete(device);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-red-600"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M10 2H14L14 4H20V6H4V4H10L9 3H14L10 2ZM7 5H17V20H7V5ZM9 7V18H11V7H9ZM13 7V18H15V7H13Z" />
                      </svg>
                    </button>
                    <button
                      title="Probar Conexión"
                      className="hover:bg-sky-200 transition p-1 rounded-full cursor-pointer"
                      onClick={() => handleTestConnection(device.id)}
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
