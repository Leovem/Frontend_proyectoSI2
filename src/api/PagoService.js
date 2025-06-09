import axios from 'axios';

const API_URL = 'https://backendproyectosi2-production.up.railway.app/api/pagos';

const AdquirirPlanService = {
  crearSesionStripe: async (payload) => {
    // payload ya contiene empresa, pago, suscripcion, usuarioAdmin
    const response = await axios.post(`${API_URL}/crear-sesion`, payload, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  }
};

export default AdquirirPlanService;
