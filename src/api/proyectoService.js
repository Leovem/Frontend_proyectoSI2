// src/services/ProyectoService.js
import axios from 'axios';
import { obtenerToken } from './authService';

const api = axios.create({
  baseURL: 'https://backendproyectosi2-production.up.railway.app/api/proyectos',
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

// Crear proyecto
export const crearProyecto = async (data) => {
  const response = await api.post('', data);
  return response.data;
};

// Listar proyectos de la empresa autenticada
export const listarProyectos = async () => {
  const response = await api.get('');
  return response.data;
};

// Actualizar proyecto
export const actualizarProyecto = async (id, data) => {
  const response = await api.put(`/${id}`, data);
  return response.data;
};

// Eliminar proyecto
export const eliminarProyecto = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.status === 204;
};
