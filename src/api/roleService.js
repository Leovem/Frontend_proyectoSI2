import axios from 'axios';
import { obtenerToken } from './authService'; // asegúrate que esto devuelve el token

const api = axios.create({
  baseURL: 'https://backendproyectosi2-production.up.railway.app/api/roles',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token
api.interceptors.request.use((config) => {
  const token = obtenerToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Listar todos los roles de la empresa autenticada
export const getRoles = async () => {
  const response = await api.get('');
  return response.data;
};

// Obtener un solo rol por ID (solo si pertenece a la empresa)
export const getRolById = async (id) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

// Crear un nuevo rol
export const createRol = async ({ nombre, privilegioIds }) => {
  const response = await api.post('', {
    nombre,
    privilegioIds,
  });
  return response.data;
};

// Actualizar un rol
export const updateRol = async (id, { nombre, privilegioIds }) => {
  const response = await api.put(`/${id}`, {
    nombre,
    privilegioIds,
  });
  return response.data;
};

// Eliminar un rol
export const deleteRol = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.status === 204;
};
