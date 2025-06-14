import SideBar from "../components/sideBar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

function AddDevice() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [ipHostname, setIpHostname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [useSshKey, setUseSshKey] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    try {
      const res = await fetch("http://localhost:8080/devices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          ipHostname,
          username,
          password,
          type,
          useSshKey,
        }),
      });
      if (res.ok) {
        setMensaje("Dispositivo agregado correctamente.");
        Swal.fire({
          icon: "success",
          title: "Agregado",
          text: "Dispositivo agregado correctamente.",
          timer: 2000,
          showConfirmButton: false,
        });
        setTimeout(() => navigate("/devices"), 1000);
      } else {
        setMensaje("Error al agregar el dispositivo.");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al agregar el dispositivo.",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch {
      setMensaje("Error de conexión con el servidor.");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error de conexión con el servidor.",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="flex">
      <SideBar />
      <main className="flex flex-col flex-1 p-6 overflow-y-auto bg-gray-100 relative items-center justify-center min-h-screen">
        <h1 className="justify-self-start text-3xl font-bold text-black mb-6">
          Agregar Nuevo Dispositivo
        </h1>
        <div className="max-w-2xl bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <form onSubmit={handleSubmit}>
            <div className="text-black mb-4">
              <label className="block text-gray-700">
                Nombre del Dispositivo
              </label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded bg-gray-50 focus:bg-blue-50 hover:bg-blue-50 border-gray-300 focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="text-black mb-4">
              <label className="block text-gray-700">Dirección IP</label>
              <input
                required
                type="text"
                value={ipHostname}
                onChange={(e) => setIpHostname(e.target.value)}
                className="no-spinner w-full p-2 border rounded bg-gray-50 focus:bg-blue-50 hover:bg-blue-50 border-gray-300 focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="text-black mb-4">
              <label className="block text-gray-700">Usuario SSH</label>
              <input
                required
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border rounded bg-gray-50 focus:bg-blue-50 hover:bg-blue-50 border-gray-300 focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="text-black mb-4">
              <label className="block text-gray-700">Contraseña SSH</label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded bg-gray-50 focus:bg-blue-50 hover:bg-blue-50 border-gray-300 focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="text-black mb-4 flex items-center">
              <input
                type="checkbox"
                id="useSshKey"
                checked={useSshKey}
                onChange={() => setUseSshKey(!useSshKey)}
                className="mr-2 accent-blue-600"
              />
              <label htmlFor="useSshKey" className="text-gray-700">
                Usar clave SSH en lugar de contraseña
              </label>
            </div>
            <div className="text-black mb-4">
              <label className="block text-gray-700">Tipo de Dispositivo</label>
              <select
                required
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-2 border rounded bg-gray-50 focus:bg-blue-50 hover:bg-blue-50 border-gray-300 focus:border-blue-500 transition-colors"
              >
                <option value="">Seleccione un tipo</option>
                <option value="router">Router</option>
                <option value="switch">Switch</option>
                <option value="firewall">Firewall</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-colors"
            >
              Agregar Dispositivo
            </button>
            {mensaje && (
              <div className="mt-4 text-center text-blue-700">{mensaje}</div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}

export default AddDevice;
