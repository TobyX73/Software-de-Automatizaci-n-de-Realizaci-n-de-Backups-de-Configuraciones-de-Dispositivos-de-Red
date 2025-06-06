import SideBar from "../components/sideBar";

/*Historial de logs del sistema.

Tabla con:

Fecha

Tipo (INFO, ERROR)

Dispositivo

Descripción

Filtros por tipo/fecha*/
 function LogsPage() {
    return (
        <div>
            <SideBar />
            <h1 className="text-2xl text-black font-bold">Logs Page</h1>
        </div>
    );
}
export default LogsPage;
