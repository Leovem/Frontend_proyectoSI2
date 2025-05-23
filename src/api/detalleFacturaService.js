// src/services/DetalleFacturaService.js
import axios from 'axios';
import { obtenerToken } from './authService';

const api = axios.create({
  baseURL: 'https://backendproyectosi2-production.up.railway.app/api/detalles-factura',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para incluir token JWT
api.interceptors.request.use((config) => {
  const token = obtenerToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Crear detalle de factura
export const crearDetalleFactura = async (data) => {
  const response = await api.post('', data);
  return response.data;
};

// Listar detalles por factura
export const listarDetallesPorFactura = async (facturaId) => {
  const response = await api.get(`/factura/${facturaId}`);
  return response.data;
};

// Actualizar detalle de factura
export const actualizarDetalleFactura = async (id, data) => {
  const response = await api.put(`/${id}`, data);
  return response.data;
};

// Eliminar detalle de factura
export const eliminarDetalleFactura = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.status === 204;
};
