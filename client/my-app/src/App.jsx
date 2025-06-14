import BackupsPage from "./pages/backupsPage";
import DevicesPage from "./pages/devicesPage";
import HomePage from "./pages/homePage";
import LogsPage from "./pages/logsPage";
import AddDevice from "./pages/addDevice";
import Login from "./pages/login";
import "./style/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/home" element={<HomePage />} />
        <Route path="/devices" element={<DevicesPage />} />
        <Route path="/backups" element={<BackupsPage />} />
        <Route path="/logs" element={<LogsPage />} />
        <Route path="/addDevice" element={<AddDevice />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
