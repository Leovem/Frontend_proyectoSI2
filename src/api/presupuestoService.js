// src/services/PresupuestoService.js
import axios from 'axios';
import { obtenerToken } from './authService';

const api = axios.create({
  baseURL: 'https://backendproyectosi2-production.up.railway.app/api/presupuestos',
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

// Crear presupuesto
export const crearPresupuesto = async (data) => {
  const response = await api.post('', data);
  return response.data;
};

// Listar presupuestos de la empresa autenticada
export const listarPresupuestos = async () => {
  const response = await api.get('');
  return response.data;
};

// Obtener presupuesto por ID (empresa autenticada)
export const obtenerPresupuestoPorId = async (id) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

// Actualizar presupuesto
export const actualizarPresupuesto = async (id, data) => {
  const response = await api.put(`/${id}`, data);
  return response.data;
};

// Eliminar presupuesto
export const eliminarPresupuesto = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.status === 204;
};
