// src/services/ProveedorService.js
import axios from 'axios';
import { obtenerToken } from './authService';

const api = axios.create({
  baseURL: 'https://backendproyectosi2-production.up.railway.app/api/proveedores',
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

// Crear proveedor
export const crearProveedor = async (data) => {
  const response = await api.post('', data);
  return response.data;
};

// Listar proveedores de la empresa autenticada
export const listarProveedores = async () => {
  const response = await api.get('');
  return response.data;
};

// Actualizar proveedor
export const actualizarProveedor = async (id, data) => {
  const response = await api.put(`/${id}`, data);
  return response.data;
};

// Eliminar proveedor
export const eliminarProveedor = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.status === 204;
};
