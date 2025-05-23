import axios from 'axios';
import { obtenerToken } from './authService';

const api = axios.create({
  baseURL: 'https://backendproyectosi2-production.up.railway.app/api/usuarios',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para incluir el token JWT
api.interceptors.request.use((config) => {
  const token = obtenerToken();
  console.log("Token cargado desde localStorage:", obtenerToken());
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Obtener todos los usuarios
export const getUsuarios = async () => {
  const response = await api.get('');
  return response.data;
};

// Obtener usuarios activos
export const getUsuariosActivos = async () => {
  const response = await api.get('/activos');
  return response.data;
};

// Obtener usuario por ID
export const getUsuarioById = async (id) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

// Buscar usuario por nombre de usuario
export const buscarUsuarioPorNombre = async (usuario) => {
  const response = await api.get(`/search?usuario=${encodeURIComponent(usuario)}`);
  return response.data;
};

// Actualizar usuario
export const updateUsuario = async (id, data) => {
  const response = await api.put(`/${id}`, data);
  return response.data;
};

// Desactivar usuario
export const desactivarUsuario = async (id) => {
  const response = await api.patch(`/${id}/desactivar`);
  return response.status === 204;
};

// Activar usuario
export const activarUsuario = async (id) => {
  const response = await api.patch(`/${id}/activar`);
  return response.status === 204;
};
