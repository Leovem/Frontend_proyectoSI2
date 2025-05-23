// src/services/MarcaService.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backendproyectosi2-production.up.railway.app/api/marcas',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Crear marca
export const crearMarca = async (data) => {
  const response = await api.post('', data);
  return response.data;
};

// Listar todas las marcas
export const listarMarcas = async () => {
  const response = await api.get('');
  return response.data;
};

// Actualizar marca
export const actualizarMarca = async (id, data) => {
  const response = await api.put(`/${id}`, data);
  return response.data;
};

// Eliminar marca
export const eliminarMarca = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.status === 204;
};
