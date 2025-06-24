// src/services/DepreciacionService.js
import axios from 'axios';

const API_URL = 'https://backendproyectosi2-production.up.railway.app/api/depreciacion-activo';

export const getDepreciaciones = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createDepreciacion = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};
