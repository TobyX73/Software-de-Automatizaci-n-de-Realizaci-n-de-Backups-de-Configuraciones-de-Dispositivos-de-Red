import SideBar from "../components/sideBar";

/*Administración de respaldos.

Lista de respaldos por dispositivo

Selector de periodicidad

Botones: Ejecutar backup, Descargar, Eliminar

Indicador de estado (éxito, error)*/
 function BackupsPage() {
    return (
        <div className="min-h-screen flex bg-gray-100">
             <SideBar />
           
            <h1 className="text-2xl text-black font-bold">Backups Page</h1>
        </div>
    );
}
export default BackupsPage;
