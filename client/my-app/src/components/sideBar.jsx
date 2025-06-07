import { FaHome, FaServer, FaDatabase, FaCog, FaBook } from "react-icons/fa";
import { Outlet } from "react-router-dom";
export default function SideBar() {
    return (
        <aside className="w-64 bg-slate-800 text-white flex flex-col py-8 px-4 min-h-screen shadow-lg ">
            <div className="mb-10 text-2xl font-bold tracking-wide flex items-center gap-2">
                <span className="text-blue-400">●</span>
                Sistema Backup
            </div>
            <nav className="flex-1">
                <ul className="space-y-2">
                    <li>
                        <a href="/" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-700 transition">
                            <FaHome className="text-blue-300" /> Dashboard
                        </a>
                    </li>
                    <li>
                        <a href="/devices" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-700 transition">
                            <FaServer className="text-blue-300" /> Dispositivos
                        </a>
                    </li>
                    <li>
                        <a href="/backups" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-700 transition">
                            <FaDatabase className="text-blue-300" /> Backups
                        </a>
                    </li>
                    <li>
                        <a href="/settings" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-700 transition">
                            <FaCog className="text-blue-300" /> Configuracion
                        </a>
                    </li>
                    <li>
                        <a href="/logs" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-700 transition">
                            <FaBook className="text-blue-300" /> Logs
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="mt-10">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition font-medium">
                    + Agregar dispositivo
                </button>
            </div>
             <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
        </aside>
    );
}