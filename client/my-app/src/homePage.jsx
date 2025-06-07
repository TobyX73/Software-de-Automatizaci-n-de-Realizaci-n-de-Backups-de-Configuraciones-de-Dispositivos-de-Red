import { useNavigate } from "react-router-dom";
import SideBar from "../components/sideBar";

function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex bg-gray-100">
           
           <SideBar />
           
            <main className="flex-1 p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Resumen del Sistema</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg p-6 shadow">
                        <div className="text-gray-500 font-bold mb-2">Dispositivos registrados</div>
                        <div className="text-3xl font-bold text-gray-800">256</div>
                    </div>
                    <div className="bg-white rounded-lg p-6 shadow">
                        <div className="text-gray-500 font-bold mb-2">Backups exitosos</div>
                        <div className="text-3xl font-bold text-gray-800">1248</div>
                    </div>
                    <div className="bg-white rounded-lg p-6 shadow">
                        <div className="text-gray-500 font-bold mb-2">Ultimo backup realizado</div>
                        <div className="text-lg text-gray-800">2024-06-04 22:15</div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-lg p-6 shadow flex flex-col items-center justify-center">
                        {/* Placeholder para gráfico */}
                        <div className="w-64 h-64 flex items-center justify-center">
                            <span className="text-gray-400">[Grafico de dispositivos]</span>
                        </div>
                        <div className="flex justify-center gap-6 mt-4">
                            <div className="flex items-center gap-2">
                                <span className="w-4 h-4 bg-green-400 rounded-full inline-block"></span>
                                <span className="text-gray-600 text-sm">Conectados</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-4 h-4 bg-red-400 rounded-full inline-block"></span>
                                <span className="text-gray-600 text-sm">Desconectados</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 mt-8">
                    <button
                        onClick={() => navigate("/devices")}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition font-medium"
                    >
                        Agregar dispositivo
                    </button>
                    <button
                        onClick={() => navigate("/backups")}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition font-medium"
                    >
                        Ejecutar Backup manual
                    </button>
                </div>
            </main>
        </div>
    );
}

export default HomePage;