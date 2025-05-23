// src/services/UbicacionService.ts
import axios from 'axios';
import { obtenerToken } from './authService'; // asegúrate de tener este helper

const api = axios.create({
  baseURL: 'https://backendproyectosi2-production.up.railway.app/api/ubicaciones',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para incluir el token JWT
api.interceptors.request.use((config) => {
  const token = obtenerToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Crear ubicación
export const crearUbicacion = async (data) => {
  const response = await api.post('', data);
  return response.data;
};

// Listar ubicaciones de la empresa autenticada (token)
export const listarUbicacionesPorEmpresa = async () => {
  const response = await api.get('');
  return response.data;
};

// Actualizar ubicación
export const actualizarUbicacion = async (id, data) => {
  const response = await api.put(`/${id}`, data);
  return response.data;
};

// Eliminar ubicación (ya no requiere empresaId)
export const eliminarUbicacion = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.status === 204;
};
