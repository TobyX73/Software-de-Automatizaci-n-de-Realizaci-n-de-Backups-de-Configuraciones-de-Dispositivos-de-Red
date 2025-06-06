import SideBar from "../components/sideBar";
import HomePage from "./homePage";

/*Administración de respaldos.

Lista de respaldos por dispositivo

Selector de periodicidad

Botones: Ejecutar backup, Descargar, Eliminar

Indicador de estado (éxito, error)*/
 function BackupsPage() {
    return (
        <div>
             <SideBar />
           
            <h1 className="text-2xl text-black font-bold">Backups Page</h1>
        </div>
    );
}
export default BackupsPage;
