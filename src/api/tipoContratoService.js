import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backendproyectosi2-production.up.railway.app/api/tipo-contrato',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Crear tipo de contrato
export const crearTipoContrato = async (data) => {
  const response = await api.post('', data);
  return response.data;
};

// Listar todos los tipos
export const listarTipoContrato = async () => {
  const response = await api.get('');
  return response.data;
};

// Actualizar tipo de contrato
export const actualizarTipoContrato = async (id, data) => {
  const response = await api.put(`/${id}`, data);
  return response.data;
};

// Eliminar tipo de contrato
export const eliminarTipoContrato = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.status === 204;
};
