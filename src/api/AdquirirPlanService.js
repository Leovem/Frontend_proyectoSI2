import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backendproyectosi2-production.up.railway.app/api/subscriptions',
  headers: {
    'Content-Type': 'application/json',
  },
});

const AdquirirPlanService = {
  crearEmpresa: async (empresaData) => {
    const response = await api.post('/empresas', empresaData);
    return response.data; // devuelve empresaId
  },

  crearSuscripcion: async (suscripcionData) => {
    const response = await api.post('/suscripciones', suscripcionData);
    return response.data; // devuelve objeto SuscripcionDTO
  },

  registrarPago: async (pagoData) => {
    const response = await api.post('/pagos', pagoData);
    return response.data; // devuelve objeto PagoSuscripcionDTO
  },

  crearUsuarioAdministrador: async (usuarioData) => {
    const response = await api.post('/usuarios/admin', usuarioData);
    return response.data; // devuelve objeto UsuarioDTO
  },

  adquirirPlan: async (adquisicionData) => {
    const response = await api.post('/adquirir-plan', adquisicionData);
    return response.data; // si usas endpoint resumido
  },
};

export default AdquirirPlanService;
