// src/services/CuentaContableService.js
import axios from 'axios';
import { obtenerToken } from './authService';

const api = axios.create({
  baseURL: 'https://backendproyectosi2-production.up.railway.app/api/cuentas-contables',
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

// Crear cuenta contable
export const crearCuentaContable = async (data) => {
  const response = await api.post('', data);
  return response.data;
};

// Listar cuentas contables de la empresa autenticada
export const listarCuentasContables = async () => {
  const response = await api.get('');
  return response.data;
};

// Actualizar cuenta contable
export const actualizarCuentaContable = async (id, data) => {
  const response = await api.put(`/${id}`, data);
  return response.data;
};

// Eliminar cuenta contable
export const eliminarCuentaContable = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.status === 204;
};
