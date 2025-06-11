
import SideBar from "../components/sideBar";

/*Gestión de dispositivos de red.

Tabla de dispositivos

Botones: Agregar, Editar, Eliminar, Probar conexión

Modal o formulario lateral para Alta/Edición*/
 function DevicesPage() {
    return (
       <div className="min-h-screen flex bg-gray-100">
            <SideBar />
            <h1 className="text-2xl text-black font-bold">Devices Page</h1>
        </div>
    );
}
export default DevicesPage;