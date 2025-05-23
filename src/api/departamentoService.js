import axios from 'axios';
import { obtenerToken } from './authService'; // asegúrate que devuelve el JWT actual

const api = axios.create({
  baseURL: 'https://backendproyectosi2-production.up.railway.app/api/departamentos',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token JWT
api.interceptors.request.use((config) => {
  const token = obtenerToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Listar departamentos de la empresa autenticada
export const listarDepartamentos = async () => {
  const response = await api.get('');
  return response.data;
};

// Crear un nuevo departamento
export const crearDepartamento = async (data) => {
  const response = await api.post('', data); // data = { nombre, responsableId? }
  return response.data;
};

// Obtener departamento por ID (si decides usarlo en un drawer)
export const obtenerDepartamento = async (id) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

// Actualizar un departamento
export const actualizarDepartamento = async (id, data) => {
  const response = await api.put(`/${id}`, data); // data = { nombre, responsableId? }
  return response.data;
};

// Eliminar un departamento
export const eliminarDepartamento = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.status === 204;
};
