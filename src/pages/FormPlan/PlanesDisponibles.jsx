import React, { useEffect, useState } from 'react';
import PlanService from '../../api/PlanService';

const PlanesDisponibles = ({ onSelectPlan, selectedPlanId }) => {
  const [planes, setPlanes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarPlanes = async () => {
      try {
        const data = await PlanService.obtenerTodos();
        setPlanes(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar planes:', error);
        setLoading(false);
      }
    };

    cargarPlanes();
  }, []);

  if (loading) return <p>Cargando planes...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {planes.map((plan) => (
        <div
          key={plan.id}
          className={`border rounded-xl p-4 shadow hover:shadow-lg cursor-pointer ${
            selectedPlanId === plan.id ? 'border-blue-500 ring-2 ring-blue-400' : ''
          }`}
          onClick={() => onSelectPlan(plan)}
        >
          <h2 className="text-xl font-semibold mb-2">{plan.nombre}</h2>
          <p className="text-gray-600 mb-2">{plan.descripcion}</p>
          <ul className="text-sm text-gray-700 mb-2">
            <li><strong>Usuarios:</strong> {plan.limiteUsuarios}</li>
            <li><strong>Proyectos:</strong> {plan.limiteProyectos ?? '∞'}</li>
            <li><strong>Activos:</strong> {plan.limiteActivos ?? '∞'}</li>
          </ul>
          <div className="text-md font-bold">
            <p>Mensual: ${plan.precioMensual}</p>
            <p>Semestral: ${plan.precioSemestral}</p>
            <p>Anual: ${plan.precioAnual}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlanesDisponibles;
