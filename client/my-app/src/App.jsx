import BackupsPage from './pages/backupsPage';
import DevicesPage from './pages/devicesPage';
import HomePage from './pages/homePage'
import LogsPage from './pages/logsPage';
import SettingsPage from './pages/settingsPage';
import AddDevice from './pages/addDevice';
import './style/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
     
      <Route path="/devices" element={<DevicesPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/backups" element={<BackupsPage />} />
      <Route path="/logs" element={<LogsPage />} />
      <Route path="/addDevice" element={<AddDevice />} />
    </Routes>
  </Router>
  )
}

export default App;
