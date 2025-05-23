// src/services/ActivoService.js
import axios from 'axios';
import { obtenerToken } from './authService';

const api = axios.create({
  baseURL: 'https://backendproyectosi2-production.up.railway.app/api/activos',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token JWT
api.interceptors.request.use((config) => {
  const token = obtenerToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Crear activo
export const crearActivo = async (data) => {
  const response = await api.post('', data);
  return response.data;
};

// Listar activos de la empresa autenticada
export const listarActivos = async () => {
  const response = await api.get('');
  return response.data;
};

export const actualizarActivo = async (id, data) => {
  const response = await api.put(`/${id}`, data);
  return response.data;
};

export const eliminarActivo = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};

