// src/services/RevaluacionService.js
import axios from 'axios';

const API_URL = 'https://backendproyectosi2-production.up.railway.app/api/revaluacion-activo';

export const getRevaluaciones = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createRevaluacion = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};
