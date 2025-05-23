// src/services/MonedaService.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backendproyectosi2-production.up.railway.app/api/monedas',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Obtener todas las monedas
export const listarMonedas = async () => {
  const response = await api.get('');
  return response.data;
};

// Obtener moneda por código
export const obtenerMoneda = async (codigo) => {
  const response = await api.get(`/${codigo}`);
  return response.data;
};

// Crear moneda
export const crearMoneda = async (data) => {
  const response = await api.post('', data);
  return response.data;
};

// Actualizar moneda
export const actualizarMoneda = async (codigo, data) => {
  const response = await api.put(`/${codigo}`, data);
  return response.data;
};

// Eliminar moneda
export const eliminarMoneda = async (codigo) => {
  const response = await api.delete(`/${codigo}`);
  return response.status === 204;
};
