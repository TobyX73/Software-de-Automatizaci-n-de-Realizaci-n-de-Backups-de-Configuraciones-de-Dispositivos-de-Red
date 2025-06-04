import NavBar from "../components/navBar";

/*Configuración general del sistema.

Tiempo de retención de backups

Ruta de almacenamiento local

SSH key o contraseña

Opcional: Enlace a integración con nube*/
 function SettingsPage() {
    return (
        <div>
            <NavBar />
            <h1 className="text-2xl font-bold text-black">Settings Page</h1>
        </div>
    );
}
export default SettingsPage;
