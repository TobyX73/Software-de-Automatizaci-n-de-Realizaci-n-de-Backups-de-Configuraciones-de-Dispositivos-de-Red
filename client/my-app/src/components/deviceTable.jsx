export default function DevicesLogic() {
  return (
    <div>
      <table className="min-w-full text-black bg-white rounded-lg shadow overflow-hidden">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-6 py-3 text-center font-semibold">Id</th>
            <th className="px-6 py-3 text-center font-semibold">Nombre</th>
            <th className="px-6 py-3 text-center font-semibold">IP</th>
            <th className="px-6 py-3 text-center font-semibold">Usuario</th>
            <th className="px-6 py-3 text-center font-semibold">Tipo</th>
            <th className="px-6 py-3 text-center font-semibold">Estado</th>
            <th className="px-6 py-3 text-center font-semibold">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b hover:bg-blue-100 hover:shadow-md transition-all">
            <td className="px-6 py-4 text-center">1</td>
            <td className="px-6 py-4 text-center">Router Principal</td>
            <td className="px-6 py-4 text-center">192.168.1.1</td>
            <td className="px-6 py-4 text-center">admin</td>
            <td className="px-6 py-4 text-center">Router</td>
            <td className="px-6 py-4 text-center">
              <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                Activo
              </span>
            </td>
            <td className="px-6 py-4 text-center space-x-2">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm cursor-pointer">
                Editar
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm cursor-pointer">
                Eliminar
              </button>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-sm cursor-pointer">
                Probar
              </button>
            </td>
          </tr>
          <tr className="border-b hover:bg-blue-100 hover:shadow-md transition-all">
            <td className="px-6 py-4 text-center">2</td>
            <td className="px-6 py-4 text-center">Switch Oficina</td>
            <td className="px-6 py-4 text-center">192.168.1.2</td>
            <td className="px-6 py-4 text-center">user</td>
            <td className="px-6 py-4 text-center">Switch</td>
            <td className="px-6 py-4 text-center">
              <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 text-sm font-semibold">
                Fallido
              </span>
            </td>
            <td className="px-6 py-4 text-center space-x-2">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm cursor-pointer">
                Editar
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm cursor-pointer">
                Eliminar
              </button>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-sm cursor-pointer">
                Probar
              </button>
            </td>
          </tr>
          <tr className="border-b hover:bg-blue-100 hover:shadow-md transition-all">
            <td className="px-6 py-4 text-center">3</td>
            <td className="px-6 py-4 text-center">Firewall</td>
            <td className="px-6 py-4 text-center">192.168.1.3</td>
            <td className="px-6 py-4 text-center">root</td>
            <td className="px-6 py-4 text-center">Firewall</td>
            <td className="px-6 py-4 text-center">
              <span className="px-2 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold">
                Pendiente
              </span>
            </td>
            <td className="px-6 py-4 text-center space-x-2">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm cursor-pointer">
                Editar
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm cursor-pointer">
                Eliminar
              </button>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-sm cursor-pointer">
                Probar
              </button>
            </td>
          </tr>
        </tbody>
      </table>{" "}
    </div>
  );
}
