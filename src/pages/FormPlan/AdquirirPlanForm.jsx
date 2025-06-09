import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PlanService from '../../api/PlanService';
import PlanesDisponibles from './PlanesDisponibles';
import AdquirirPlanService from '../../api/AdquirirPlanService';


const AdquirirPlanForm = () => {
  const [searchParams] = useSearchParams();
  const initialPlanId = parseInt(searchParams.get('planId')) || null;
  const navigate = useNavigate();


  const [form, setForm] = useState({
    nombreEmpresa: '',
    rfc: '',
    usuario: '',
    nombreCompleto: '',
    email: '',
    contrasena: '',
    planId: initialPlanId,
    tipoPeriodo: 'Mensual',
  });

  const [planSeleccionado, setPlanSeleccionado] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const obtenerPlan = async () => {
      if (form.planId) {
        try {
          const plan = await PlanService.obtenerPorId(form.planId);
          setPlanSeleccionado(plan);
        } catch (error) {
          console.error('Error al obtener el plan:', error);
        }
      }
    };
    obtenerPlan();
  }, [form.planId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  

  /*const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setMensaje(null);

    try {
      const empresaId = await AdquirirPlanService.crearEmpresa({
        nombre: form.nombreEmpresa,
        rfc: form.rfc,
      });

      const suscripcion = await AdquirirPlanService.crearSuscripcion({
        empresaId,
        planId: form.planId,
        tipoPeriodo: form.tipoPeriodo,
      });

      await AdquirirPlanService.registrarPago({
        suscripcionId: suscripcion.id,
        monto: 0,
        metodoPago: 'Tarjeta',
        estadoPago: 'Completado',
        observaciones: 'Pago simulado en modo prueba',
      });

      await AdquirirPlanService.crearUsuarioAdministrador({
        empresaId,
        usuario: form.usuario,
        nombreCompleto: form.nombreCompleto,
        email: form.email,
        contrasena: form.contrasena,
      });

      setMensaje('Plan adquirido y usuario creado correctamente.');
      setForm({
        nombreEmpresa: '',
        rfc: '',
        usuario: '',
        nombreCompleto: '',
        email: '',
        contrasena: '',
        planId: null,
        tipoPeriodo: 'Mensual',
      });
      setPlanSeleccionado(null);
    } catch (error) {
      console.error(error);
      setMensaje('Ocurrió un error al adquirir el plan.');
    } finally {
      setCargando(false);
    }
  };
  */

  const handleSubmit = (e) => {
  e.preventDefault();
  navigate('/pagar', { state: form });
};


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-6">Adquirir un Plan</h1>

      {planSeleccionado && (
        <div className="bg-gradient-to-r from-blue-100 to-blue-50 border border-blue-300 p-6 rounded-xl mb-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-2">{planSeleccionado.nombre}</h2>
          <p className="text-md text-gray-700 mb-4">{planSeleccionado.descripcion}</p>
          <ul className="text-sm text-blue-900 mb-4">
            <li className="mb-1"><strong>Usuarios:</strong> {planSeleccionado.limiteUsuarios}</li>
            <li className="mb-1"><strong>Proyectos:</strong> {planSeleccionado.limiteProyectos ?? 'Ilimitado'}</li>
            <li className="mb-1"><strong>Activos:</strong> {planSeleccionado.limiteActivos ?? 'Ilimitado'}</li>
          </ul>
          <div className="text-sm font-medium text-blue-900">
            <p><strong>Mensual:</strong> ${planSeleccionado.precioMensual}</p>
            <p><strong>Semestral:</strong> ${planSeleccionado.precioSemestral}</p>
            <p><strong>Anual:</strong> ${planSeleccionado.precioAnual}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-semibold text-gray-700">Nombre de la empresa</label>
          <input type="text" name="nombreEmpresa" value={form.nombreEmpresa} onChange={handleChange} className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">RFC</label>
          <input type="text" name="rfc" value={form.rfc} onChange={handleChange} className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Usuario administrador</label>
          <input type="text" name="usuario" value={form.usuario} onChange={handleChange} className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Nombre completo</label>
          <input type="text" name="nombreCompleto" value={form.nombreCompleto} onChange={handleChange} className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Contraseña</label>
          <input type="password" name="contrasena" value={form.contrasena} onChange={handleChange} className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Tipo de periodo</label>
          <select name="tipoPeriodo" value={form.tipoPeriodo} onChange={handleChange} className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="Mensual">Mensual</option>
            <option value="Semestral">Semestral</option>
            <option value="Anual">Anual</option>
          </select>
        </div>

        {!form.planId && (
          <PlanesDisponibles
            onSelectPlan={(plan) => {
              setForm((prev) => ({ ...prev, planId: plan.id }));
              setPlanSeleccionado(plan);
            }}
            selectedPlanId={form.planId}
          />
        )}

        <button type="submit" disabled={cargando} className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-xl shadow">
          {cargando ? 'Procesando...' : 'Adquirir Plan'}
        </button>
      </form>

      {mensaje && <p className="mt-6 text-center text-green-700 font-semibold">{mensaje}</p>}
    </div>
  );
};

export default AdquirirPlanForm;
