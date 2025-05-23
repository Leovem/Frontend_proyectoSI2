// src/services/MetodoDepreciacionService.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backendproyectosi2-production.up.railway.app/api/metodo-depreciacion',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Crear método de depreciación
export const crearMetodoDepreciacion = async (data) => {
  const response = await api.post('', data);
  return response.data;
};

// Listar todos los métodos de depreciación
export const listarMetodosDepreciacion = async () => {
  const response = await api.get('');
  return response.data;
};

// Actualizar método de depreciación
export const actualizarMetodoDepreciacion = async (id, data) => {
  const response = await api.put(`/${id}`, data);
  return response.data;
};

// Eliminar método de depreciación
export const eliminarMetodoDepreciacion = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.status === 204;
};
