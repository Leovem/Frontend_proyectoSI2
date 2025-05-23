// src/services/TipoActivoService.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backendproyectosi2-production.up.railway.app/api/tipo-activo',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Crear tipo de activo
export const crearTipoActivo = async (data) => {
  const response = await api.post('', data);
  return response.data;
};

// Listar todos los tipos de activo
export const listarTipoActivo = async () => {
  const response = await api.get('');
  return response.data;
};

// Actualizar tipo de activo
export const actualizarTipoActivo = async (id, data) => {
  const response = await api.put(`/${id}`, data);
  return response.data;
};

// Eliminar tipo de activo
export const eliminarTipoActivo = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.status === 204;
};
