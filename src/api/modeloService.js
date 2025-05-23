// src/services/ModeloService.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backendproyectosi2-production.up.railway.app/api/modelos',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Crear modelo
export const crearModelo = async (data) => {
  const response = await api.post('', data);
  return response.data;
};

// Listar todos los modelos
export const listarModelos = async () => {
  const response = await api.get('');
  return response.data;
};

// Listar modelos por ID de marca
export const listarModelosPorMarca = async (marcaId) => {
  const response = await api.get(`/marca/${marcaId}`);
  return response.data;
};

// Actualizar modelo
export const actualizarModelo = async (id, data) => {
  const response = await api.put(`/${id}`, data);
  return response.data;
};

// Eliminar modelo
export const eliminarModelo = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.status === 204;
};
