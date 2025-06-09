import axios from 'axios';

console.log('Inicializando authService.js');

// Crear instancia de Axios
const api = axios.create({
  baseURL: 'https://backendproyectosi2-production.up.railway.app/api/auth',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ===== Manejo de token en localStorage =====
const guardarToken = (token) => {
  localStorage.setItem('token', token);
};

const eliminarToken = () => {
  localStorage.removeItem('token');
};

const obtenerToken = () => {
  return localStorage.getItem('token');
};

// ===== Interceptor para agregar el token a TODAS las peticiones, excepto login/register =====
api.interceptors.request.use((config) => {
  const excludedPaths = ['/login', '/adquirir-plan', '/planes', '/pagar', '/pago-exitoso', '/pago-cancelado',
     '/api/monedas', '/api/tipo-activo', '/api/privilegios', '/api/modelos', '/api/metodo-depreciacion', '/api/clasificacion-activo',
     '/api/marcas', '/api/grupo-activo', '/api/tipo-contrato'];
  if (excludedPaths.some((path) => config.url.includes(path))) {
    return config; // no agregar token
  }

  const token = obtenerToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('[axios] Usando token:', token);
  }

  return config;
});

// ===== Login =====
export const loginUser = async (credentials) => {
  try {
    console.log('📤 Enviando credenciales:', credentials);
    const response = await api.post('/login', credentials);

    const token = response.data.token;
    guardarToken(token);
    console.log('✅ loginUser response:', response.data);

    return response.data;
  } catch (error) {
    console.error('❌ Error en loginUser:', error.message);
    if (error.response) {
      console.error('🔴 Respuesta del backend:', error.response.data);
      throw new Error('Credenciales incorrectas');
    } else if (error.request) {
      throw new Error('No se pudo conectar al servidor.');
    } else {
      throw new Error(error.message);
    }
  }
};

// ===== Registro =====
export const registerUser = async (userData) => {
  try {
    console.log('📤 Enviando datos de registro:', userData);
    const response = await api.post('/register', userData);
    console.log('✅ Usuario registrado:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error en registerUser:', error.message, error.response?.data);
    if (error.response) {
      throw new Error(`Error del servidor: ${error.response.data || 'Error desconocido'}`);
    } else if (error.request) {
      throw new Error('No se pudo conectar al servidor');
    } else {
      throw new Error(error.message);
    }
  }
};

// ===== Logout =====
export const logoutUser = () => {
  eliminarToken();
  console.log('🔒 Sesión cerrada. Token eliminado');
};

// ===== Estado de autenticación =====
export const isAuthenticated = () => {
  return !!obtenerToken();
};

// ===== Endpoint de prueba (opcional) =====
export const testApi = async () => {
  try {
    const response = await api.get('/test');
    return response.data;
  } catch (error) {
    console.error('Error en testApi:', error);
    throw error;
  }
};

// Exportar token si lo necesitas en otra parte
export { obtenerToken };
