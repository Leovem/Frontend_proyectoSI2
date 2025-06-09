import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backendproyectosi2-production.up.railway.app/api/planes',
  headers: {
    'Content-Type': 'application/json',
  },
});

const PlanService = {
  // Obtener todos los planes disponibles
  obtenerTodos: async () => {
    const response = await api.get('');
    return response.data; // Lista de PlanDTO
  },

  // Obtener un plan por su ID
  obtenerPorId: async (id) => {
    const response = await api.get(`/${id}`);
    return response.data; // PlanDTO
  },

  // Crear un nuevo plan (opcional para panel admin)
  crear: async (planData) => {
    const response = await api.post('', planData);
    return response.data;
  },

  // Eliminar un plan por ID (opcional para panel admin)
  eliminar: async (id) => {
    await api.delete(`/${id}`);
  },
};

export default PlanService;
