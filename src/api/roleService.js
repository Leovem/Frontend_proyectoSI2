import axios from 'axios';

const API_URL = 'http://localhost:8080/api/roles'; // cambia esto si usas otra IP

// Obtener todos los roles
export const getAllRoles = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Obtener un rol por ID
export const getRoleById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Crear un nuevo rol
export const createRole = async (role) => {
  const response = await axios.post(API_URL, role);
  return response.data;
};

// Actualizar un rol
export const updateRole = async (id, role) => {
  const response = await axios.put(`${API_URL}/${id}`, role);
  return response.data;
};

// Eliminar un rol
export const deleteRole = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

// Asignar privilegios a un rol
export const assignPrivilegesToRole = async (rolId, privilegioIds) => {
  await axios.post(`${API_URL}/${rolId}/asignarprivilegio`, privilegioIds);
};

// Obtener privilegios asignados a un rol
export const getPrivilegesByRole = async (rolId) => {
  const response = await axios.get(`${API_URL}/${rolId}/privilegios`);
  return response.data;
};
