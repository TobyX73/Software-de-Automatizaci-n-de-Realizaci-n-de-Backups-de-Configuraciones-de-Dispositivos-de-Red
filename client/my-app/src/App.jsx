<<<<<<< HEAD


import './App.css'

function App() {
 

  return (
    
  
      <h1 class="text-3xl font-bold text-cyan-50 underline">
    Hello world!
  </h1>
    
  )
}

export default App
=======
import BackupsPage from './pages/backupsPage';
import DevicesPage from './pages/devicesPage';
import HomePage from './pages/homePage'
import LogsPage from './pages/logsPage';
import SettingsPage from './pages/settingsPage';
import './style/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
     
      <Route path="/devices" element={<DevicesPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/backups" element={<BackupsPage />} />
      <Route path="/logs" element={<LogsPage />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App;
>>>>>>> 71ce429c1a824e7713b143037d70b1d16951a8bb
