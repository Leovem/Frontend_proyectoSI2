// src/services/DetalleOrdenCompraService.js
import axios from 'axios';
import { obtenerToken } from './authService';

const api = axios.create({
  baseURL: 'https://backendproyectosi2-production.up.railway.app/api/detalles-orden',
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

// Crear detalle para una orden
export const crearDetalleOrden = async (data) => {
  const response = await api.post('', data);
  return response.data;
};

// Listar detalles por orden
export const listarDetallesPorOrden = async (ordenId) => {
  const response = await api.get(`/orden/${ordenId}`);
  return response.data;
};

// Actualizar detalle de orden
export const actualizarDetalleOrden = async (id, data) => {
  const response = await api.put(`/${id}`, data);
  return response.data;
};

// Eliminar detalle de orden
export const eliminarDetalleOrden = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.status === 204;
};
