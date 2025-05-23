import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backendproyectosi2-production.up.railway.app/api/privilegios',
});

// Obtener todos los privilegios públicos
export const getPrivilegios = async () => {
  try {
    const response = await api.get('');
    return response.data;
  } catch (error) {
    console.error('Error al obtener privilegios:', error);
    throw new Error('No se pudieron cargar los privilegios');
  }
};
