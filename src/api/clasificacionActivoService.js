// src/services/ClasificacionActivoService.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backendproyectosi2-production.up.railway.app/api/clasificacion-activo',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Crear clasificación de activo
export const crearClasificacionActivo = async (data) => {
  const response = await api.post('', data);
  return response.data;
};

// Listar todas las clasificaciones de activos
export const listarClasificacionesActivo = async () => {
  const response = await api.get('');
  return response.data;
};

// Actualizar clasificación de activo
export const actualizarClasificacionActivo = async (id, data) => {
  const response = await api.put(`/${id}`, data);
  return response.data;
};

// Eliminar clasificación de activo
export const eliminarClasificacionActivo = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.status === 204;
};
