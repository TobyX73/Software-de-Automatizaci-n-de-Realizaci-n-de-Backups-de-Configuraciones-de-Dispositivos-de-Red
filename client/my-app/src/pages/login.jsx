import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'adminnetbackup') {
      setError('');
      navigate('/home');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-gray-900 rounded-xl shadow-md px-6 py-8 sm:px-10 sm:py-10 flex flex-col items-center w-full max-w-md">
        <h1 className="text-cyan-400 text-4xl sm:text-5xl mb-8 sm:mb-10 font-bold text-center">NetBackup</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full gap-5 sm:gap-6"
        >
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            className="p-3 sm:p-4 text-lg sm:text-xl border border-gray-700 rounded-lg text-white bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="p-3 sm:p-4 text-lg sm:text-xl border border-gray-700 rounded-lg text-white bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <label className="flex items-center text-base sm:text-lg text-gray-300">
            <input
              type="checkbox"
              checked={remember}
              onChange={e => setRemember(e.target.checked)}
              className="mr-3 accent-cyan-400"
            />
            Recordar usuario
          </label>
          {error && (
            <div className="text-red-500 text-center text-sm">{error}</div>
          )}
          <button
            type="submit"
            className="bg-cyan-400 text-gray-900 py-3 sm:py-4 text-lg sm:text-xl rounded-lg font-bold hover:bg-cyan-500 transition"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;