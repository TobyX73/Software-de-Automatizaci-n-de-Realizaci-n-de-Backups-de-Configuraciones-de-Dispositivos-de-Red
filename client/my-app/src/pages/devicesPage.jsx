import SideBar from "../components/sideBar";
import DevicesLogic from "../components/deviceTable";

/*Gestión de dispositivos de red.

Tabla de dispositivos

Botones: Agregar, Editar, Eliminar, Probar conexión

Modal o formulario lateral para Alta/Edición*/
function DevicesPage() {
  return (
    <div className="flex">
      <SideBar />
      <main className="flex-col flex-1 p-6 overflow-y-auto bg-gray-100 relative">
        <h1 className="justify-self-start text-3xl font-bold text-black mb-6">
          Administracion de Dispositivos
        </h1>
        <DevicesLogic />
        
        <button
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-colors z-50"
          style={{ minWidth: "220px" }}
          onClick={() => window.location.href = "/agregar-dispositivo"}
        >
          Agregar Nuevo Dispositivo
        </button>
      </main>
    </div>
  );
}

export default DevicesPage;
