import NavBar from "../components/navBar";
import { useNavigate } from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100">
            <NavBar />
            <main className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-8">Panel principal</h1>
                <table className="w-full mb-8 border-separate border-spacing-y-4">
                    <tbody>
                        <tr className="bg-gray-50 rounded-lg shadow-sm">
                            <td className="py-4 px-6 text-gray-500">Total de dispositivos</td>
                            <td className="py-4 px-6 text-2xl font-semibold text-gray-800 text-right">8</td>
                        </tr>
                        <tr className="bg-gray-50 rounded-lg shadow-sm">
                            <td className="py-4 px-6 text-gray-500">Último backup</td>
                            <td className="py-4 px-6 text-lg text-gray-800 text-right">03/06/2025 22:15</td>
                        </tr>
                        <tr className="bg-gray-50 rounded-lg shadow-sm">
                            <td className="py-4 px-6 text-gray-500">Estado general</td>
                            <td className="py-4 px-6 text-green-600 font-medium text-right">Correcto</td>
                        </tr>
                    </tbody>
                </table>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <button  onClick={() => navigate("/backups")} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition font-medium">
                        Hacer Backup
                    </button>
                    <button onClick={() => navigate("/devices")} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg transition font-medium">
                        Agregar Dispositivo
                    </button>
                </div>
            </main>
        </div>
    );
}
export default HomePage;