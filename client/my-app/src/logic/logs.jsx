// hooks/useLogs.js
import { useEffect, useState } from "react";

export const useLogs = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [type, setType] = useState("Todos");
  const [date, setDate] = useState("");
  const [device, setDevice] = useState("Todos");
  const [chosenLog, setChosenLog] = useState(null);

  useEffect(() => {
    // Aquí vendría tu fetch de la base de datos/API
    const data = [
      {
    date: "2025-06-07 20:27:08",
    type: "INFO",
    device: "Servidor Backup",
    description: "Backup automático ejecutado.",
    extendedDescription: "Aca se amplia la info :p", 
  },
  {
    date: "2025-03-02 10:15:45",
    type: "ERROR",
    device: "Router Principal",
    description: "Backup fallido por fallo de autenticación.",
    extendedDescription: "Las credenciales configuradas estaban vencidas. Requiere revisión en el sistema de tokens."
  },
  {
    date: "2024-02-14 07:25:58",
    type: "INFO",
    device: "Router Secundario",
    description: "Conexión.",
    extendedDescription: "El proceso de backup se completó correctamente sin errores en menos de 3 minutos."
  },
    ];
    setLogs(data);
  }, []);

  useEffect(() => {
    const filtered = logs.filter((log) => {
      const matchesType = type === "Todos" || log.type === type;
      const matchesDate = !date || log.date.startsWith(date);
      const matchesDevice = device === "Todos" || log.device === device;
      return matchesType && matchesDate && matchesDevice;
    });
    setFilteredLogs(filtered);
  }, [type, date, device, logs]);

  const clearHistory = () => {
    setLogs([]);
    setFilteredLogs([]);
    setChosenLog(null);
    };

  const exportLogs = () => {
    const encabezado = ["Fecha", "Tipo", "Dispositivo", "Descripción"];
    const filas = logs.map(log => [log.date, log.type, log.device, log.description].join(","));
    const csvContent = [encabezado.join(","), ...filas].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "logs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

  return {
    type, setType,
    date, setDate,
    device, setDevice,    
    logs: filteredLogs,
    chosenLog, setChosenLog,
    clearHistory, exportLogs
  };
};
