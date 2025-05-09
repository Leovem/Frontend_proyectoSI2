import axios from 'axios';

const API_URL = 'http://localhost:8080/api/usuarios'; // Ajusta si usas otra IP o puerto

// Obtener todos los usuarios
export const getAllUsuarios = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Obtener usuarios activos
export const getUsuariosActivos = async () => {
  const response = await axios.get(`${API_URL}/activos`);
  return response.data;
};

// Obtener usuario por ID
export const getUsuarioById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Actualizar datos de usuario
export const updateUsuario = async (id, usuario) => {
  const response = await axios.put(`${API_URL}/${id}`, usuario);
  return response.data;
};

// Desactivar usuario (soft delete)
export const desactivarUsuario = async (id) => {
  const response = await axios.patch(`${API_URL}/${id}/desactivar`);
  return response.data;
};

// Activar usuario
export const activarUsuario = async (id) => {
  const response = await axios.patch(`${API_URL}/${id}/activar`);
  return response.data;
};
