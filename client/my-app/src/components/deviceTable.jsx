import { useState } from "react";

export default function DeviceTable() {
    const [devices, setDevices] = useState([
        { id: 1, nombre: "Router Principal", ip: "192.168.1.1", estado: "Conectado" },
        { id: 2, nombre: "Switch Oficina", ip: "192.168.1.2", estado: "Desconectado" },
        { id: 3, nombre: "Firewall", ip: "192.168.1.3", estado: "Conectado" },
    ]);

    const handleEdit = (id) => {
        // Lógica para editar dispositivo
        alert(`Editar dispositivo ${id}`);
    };

    const handleDelete = (id) => {
        // Lógica para eliminar dispositivo
        setDevices(devices.filter(device => device.id !== id));
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Dispositivos registrados</h2>
            <table className="w-full text-left mb-4">
                <thead>
                    <tr className="text-gray-500 border-b">
                        <th className="py-2">Nombre</th>
                        <th className="py-2">IP</th>
                        <th className="py-2">Estado</th>
                        <th className="py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {devices.map(device => (
                        <tr key={device.id} className="border-b hover:bg-gray-50">
                            <td className="py-2">{device.nombre}</td>
                            <td className="py-2">{device.ip}</td>
                            <td className="py-2">
                                <span className={device.estado === "Conectado" ? "text-green-600" : "text-red-600"}>
                                    {device.estado}
                                </span>
                            </td>
                            <td className="py-2">
                                <button onClick={() => handleEdit(device.id)} className="text-blue-600 hover:underline mr-2">Editar</button>
                                <button onClick={() => handleDelete(device.id)} className="text-red-600 hover:underline">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}