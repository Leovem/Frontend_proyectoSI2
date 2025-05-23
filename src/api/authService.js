import axios from 'axios';

console.log('Inicializando authService.js');

const api = axios.create({
  baseURL: 'https://backendproyectosi2-production.up.railway.app/api/auth',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Guardar token en localStorage
const guardarToken = (token) => {
  localStorage.setItem('token', token);
};

const eliminarToken = () => {
  localStorage.removeItem('token');
};

const obtenerToken = () => {
  return localStorage.getItem('token');
};

// Login
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    console.log('loginUser response:', response);

    const token = response.data.token;
    guardarToken(token); // Guardar el token al iniciar sesión

    return response.data; // Devuelve los datos del usuario y token
  } catch (error) {
    console.error('Error en loginUser:', error);
    if (error.response) {
      throw new Error('Credenciales incorrectas');
    } else if (error.request) {
      throw new Error('No se pudo conectar al servidor.');
    } else {
      throw new Error(error.message);
    }
  }
};

// Registro
export const registerUser = async (userData) => {
  console.log('Ejecutando registerUser con datos:', userData);
  try {
    const response = await api.post('/register', userData);
    console.log('Respuesta exitosa del servidor:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error en registerUser:', error);
    if (error.response) {
      throw new Error(`Error de servidor: ${error.response.data || 'Error desconocido'}`);
    } else if (error.request) {
      throw new Error('No se pudo conectar al servidor');
    } else {
      throw new Error(`Error desconocido: ${error.message}`);
    }
  }
};

// Logout
export const logoutUser = () => {
  eliminarToken();
  console.log('Sesión cerrada. Token eliminado');
};

// Comprobar si está autenticado
export const isAuthenticated = () => {
  return !!obtenerToken();
};

// Obtener token (por si necesitas enviarlo manualmente)
export { obtenerToken };

// Endpoint de prueba
export const testApi = async () => {
  try {
    const response = await api.get('/test');
    return response.data;
  } catch (error) {
    console.error('Error en testApi:', error);
    throw error;
  }
};
