import axios from 'axios';

const API_URL = 'http://localhost:8080/api/privilegios'; // ajusta si usas otra IP o puerto

// Obtener todos los privilegios
export const getAllPrivilegios = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Obtener privilegio por ID
export const getPrivilegioById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Crear un nuevo privilegio
export const createPrivilegio = async (privilegio) => {
  const response = await axios.post(API_URL, privilegio);
  return response.data;
};

// Eliminar un privilegio
export const deletePrivilegio = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
