import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backendproyectosi2-production.up.railway.app/api/tipo-depreciacion',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Crear tipo de depreciación
export const crearTipoDepreciacion = async (data) => {
  const response = await api.post('', data);
  return response.data;
};

// Listar todos los tipos
export const listarTipoDepreciacion = async () => {
  const response = await api.get('');
  return response.data;
};

// Actualizar tipo
export const actualizarTipoDepreciacion = async (id, data) => {
  const response = await api.put(`/${id}`, data);
  return response.data;
};

// Eliminar tipo
export const eliminarTipoDepreciacion = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.status === 204;
};
