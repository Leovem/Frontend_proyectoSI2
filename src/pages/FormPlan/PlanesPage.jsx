import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlanService from '../../api/PlanService';

const PlanesPage = () => {
  const [planes, setPlanes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarPlanes = async () => {
      try {
        const data = await PlanService.obtenerTodos();
        setPlanes(data);
      } catch (error) {
        console.error('Error al obtener planes:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarPlanes();
  }, []);

  if (loading) return <p className="text-center mt-4">Cargando planes...</p>;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-10 text-center text-gray-800">Elige el plan ideal para tu empresa</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {planes.map((plan) => (
          <div
            key={plan.id}
            className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl font-semibold text-blue-700 mb-2">{plan.nombre}</h2>
              <p className="text-gray-500 text-sm mb-4">{plan.descripcion}</p>
              <ul className="text-sm text-gray-700 space-y-1 mb-4">
                <li><span className="font-semibold">Usuarios:</span> {plan.limiteUsuarios}</li>
                <li><span className="font-semibold">Proyectos:</span> {plan.limiteProyectos ?? 'Ilimitado'}</li>
                <li><span className="font-semibold">Activos:</span> {plan.limiteActivos ?? 'Ilimitado'}</li>
              </ul>
              <div className="text-gray-800 text-sm font-medium mb-2">
                <p>Mensual: <span className="text-blue-600 font-bold">${plan.precioMensual}</span></p>
                <p>Semestral: <span className="text-blue-600 font-bold">${plan.precioSemestral}</span></p>
                <p>Anual: <span className="text-blue-600 font-bold">${plan.precioAnual}</span></p>
              </div>
            </div>
            <button
              onClick={() => navigate(`/adquirir-plan?planId=${plan.id}`)}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition"
            >
              Seleccionar este plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanesPage;
