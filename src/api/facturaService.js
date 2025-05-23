// src/services/FacturaService.js
import axios from 'axios';
import { obtenerToken } from './authService';

const api = axios.create({
  baseURL: 'https://backendproyectosi2-production.up.railway.app/api/facturas',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token JWT
api.interceptors.request.use((config) => {
  const token = obtenerToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Crear factura
export const crearFactura = async (data) => {
  const response = await api.post('', data);
  return response.data;
};

// Listar facturas de la empresa autenticada
export const listarFacturas = async () => {
  const response = await api.get('');
  return response.data;
};
