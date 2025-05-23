// src/services/GrupoActivoService.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backendproyectosi2-production.up.railway.app/api/grupo-activo',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Crear grupo de activo
export const crearGrupoActivo = async (data) => {
  const response = await api.post('', data);
  return response.data;
};

// Listar todos los grupos de activo
export const listarGruposActivos = async () => {
  const response = await api.get('');
  return response.data;
};

// Actualizar grupo de activo
export const actualizarGrupoActivo = async (id, data) => {
  const response = await api.put(`/${id}`, data);
  return response.data;
};

// Eliminar grupo de activo
export const eliminarGrupoActivo = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.status === 204;
};
