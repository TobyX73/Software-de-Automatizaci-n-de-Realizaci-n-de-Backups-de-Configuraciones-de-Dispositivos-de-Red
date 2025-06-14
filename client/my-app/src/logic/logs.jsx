import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const useLogs = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [type, setType] = useState("Todos");
  const [date, setDate] = useState("");
  const [device, setDevice] = useState("Todos");
  const [chosenLog, setChosenLog] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/logs")
      .then((res) => setLogs(res.data))
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron cargar los logs.",
        });
      });
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
      await axios.delete("http://localhost:8080/api/logs");
      setLogs([]);
      setFilteredLogs([]);
      setChosenLog(null);
      Swal.fire({
        icon: "success",
        title: "Historial borrado",
        text: "Los logs han sido eliminados correctamente.",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo borrar el historial de logs.",
      });
    }
  };

  const exportLogs = () => {
    try {
      const encabezado = ["Fecha", "Tipo", "Dispositivo", "Descripción"];
      const filas = logs.map((log) =>
        [log.date, log.type, log.device, log.description].join(",")
      );
      const csvContent = [encabezado.join(","), ...filas].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "logs.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      Swal.fire({
        icon: "success",
        title: "Exportado",
        text: "Los logs se exportaron correctamente.",
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron exportar los logs.",
      });
    }
  };

  return {
    type,
    setType,
    date,
    setDate,
    device,
    setDevice,
    logs: filteredLogs,
    chosenLog,
    setChosenLog,
    clearHistory,
    exportLogs,
  };
};
