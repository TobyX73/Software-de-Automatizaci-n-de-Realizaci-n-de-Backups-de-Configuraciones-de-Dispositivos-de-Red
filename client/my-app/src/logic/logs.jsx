import { useEffect, useState } from "react";
import axios from "axios";

export const useLogs = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [type, setType] = useState("Todos");
  const [date, setDate] = useState("");
  const [device, setDevice] = useState("Todos");
  const [chosenLog, setChosenLog] = useState(null);

  useEffect(() => {
    // Cambia la URL por la de tu backend
    axios
      .get("http://localhost:3001/api/logs", {
        params: { type, date, device },
      })
      .then((res) => setLogs(res.data))
      .catch((err) => console.error(err));
  }, [type, date, device]);

  useEffect(() => {
    const filtered = logs.filter((log) => {
      const matchesType = type === "Todos" || log.type === type;
      const matchesDate = !date || log.date.startsWith(date);
      const matchesDevice =
        device === "Todos" ||
        log.device.toLowerCase().includes(device.toLowerCase());
      return matchesType && matchesDate && matchesDevice;
    });
    setFilteredLogs(filtered);
  }, [type, date, device, logs]);

  const clearHistory = async () => {
    try {
      await axios.delete("http://localhost:3001/api/logs");
      setLogs([]);
      setFilteredLogs([]);
      setChosenLog(null);
    } catch (error) {
      console.error(error);
    }
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
