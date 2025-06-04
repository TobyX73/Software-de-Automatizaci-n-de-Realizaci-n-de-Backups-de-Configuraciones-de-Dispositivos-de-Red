export default function NavBar() {
    return (
        <nav className="bg-gray-800 w-full p-4">
        <div className="container mx-auto flex justify-between items-center">
            <div className="text-white text-lg font-semibold">Backup de Dispositivos de Red</div>
            <ul className="flex space-x-4">
            <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
            <li><a href="/dispositivos" className="text-gray-300 hover:text-white">Dispositivos</a></li>
            <li><a href="/backups" className="text-gray-300 hover:text-white">Backups</a></li>
            <li><a href="/settings" className="text-gray-300 hover:text-white">Configuraciones</a></li>
            <li><a href="/logs" className="text-gray-300 hover:text-white">Logs</a></li>
            </ul>
        </div>
        </nav>
    );
    }