import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/authService';
import { useAuth } from '../../contexts/AuthContext';
import { BuildingOffice2Icon } from '@heroicons/react/24/solid';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [credentials, setCredentials] = useState({ usuario: '', contrasena: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (credentials.usuario.trim().length < 2) {
      setError('El nombre debe tener al menos 2 caracteres');
      setLoading(false);
      return;
    }

    try {
      const response = await loginUser(credentials);
      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/dashboard');
      } else {
        setError(response.data || 'Credenciales incorrectas');
      }
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-sky-100 to-blue-200 px-4 py-8">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-8 transition-all duration-300">
        <div className="flex items-center justify-center mb-6">
          <BuildingOffice2Icon className="h-10 w-10 text-blue-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Activos Fijos y Presupuestos</h1>
        </div>

        <h2 className="text-xl font-semibold text-center text-gray-700 dark:text-gray-200 mb-4">
          Iniciar Sesión
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 dark:bg-red-200/20 dark:text-red-400 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="usuario" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Usuario
            </label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              value={credentials.usuario}
              onChange={handleChange}
              placeholder="Ingresa tu usuario"
              disabled={loading}
              className="mt-1 w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              aria-label="Usuario"
            />
          </div>

          <div>
            <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Contraseña
            </label>
            <input
              type="password"
              id="contrasena"
              name="contrasena"
              value={credentials.contrasena}
              onChange={handleChange}
              placeholder="••••••••"
              disabled={loading}
              className="mt-1 w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              aria-label="Contraseña"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Gestión de Activos Fijos y Presupuestos
        </p>
      </div>
    </div>
  );
};

export default Login;
