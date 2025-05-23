// src/services/OrdenCompraService.js
import axios from 'axios';
import { obtenerToken } from './authService';

const api = axios.create({
  baseURL: 'https://backendproyectosi2-production.up.railway.app/api/ordenes-compra',
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

// Crear orden de compra
export const crearOrdenCompra = async (data) => {
  const response = await api.post('', data);
  return response.data;
};

// Listar órdenes de compra (empresa autenticada)
export const listarOrdenesCompra = async () => {
  const response = await api.get('');
  return response.data;
};

// Actualizar orden de compra
export const actualizarOrdenCompra = async (id, data) => {
  const response = await api.put(`/${id}`, data);
  return response.data;
};

// Eliminar orden de compra
export const eliminarOrdenCompra = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.status === 204;
};
