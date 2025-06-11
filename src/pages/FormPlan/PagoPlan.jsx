import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PlanService from '../../api/PlanService';
import { loadStripe } from '@stripe/stripe-js';
//import AdquirirPlanService from '../../api/AdquirirPlanService';
import PagoService from '../../api/PagoService';

const PagoPlan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state;

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarPlan = async () => {
      try {
        const data = await PlanService.obtenerPorId(formData.planId);
        setPlan(data);
      } catch (e) {
        console.error(e);
        setError('No se pudo cargar el plan');
      } finally {
        setLoading(false);
      }
    };
    if (formData?.planId) cargarPlan();
  }, [formData]);

  const pagarConStripe = async () => {
  try {
    const monto = formData.tipoPeriodo === 'Mensual'
      ? plan.precioMensual * 100
      : formData.tipoPeriodo === 'Semestral'
      ? plan.precioSemestral * 100
      : plan.precioAnual * 100;

    const payload = {
      empresa: {
        nombre: formData.nombreEmpresa,
        rfc: formData.rfc
      },
      suscripcion: {
        planId: formData.planId,
        tipoPeriodo: formData.tipoPeriodo
      },
      pago: {
        monto: monto,
        metodoPago: "Tarjeta",
        estadoPago: "Pendiente",
        observaciones: "Pago inicial desde Stripe"
      },
      usuarioAdmin: {
        usuario: formData.usuario,
        nombreCompleto: formData.nombreCompleto,
        email: formData.email,
        contrasena: formData.contrasena
      }
    };

    console.log("🧾 Payload que se enviará a Stripe backend:", payload);

    const response = await PagoService.crearSesionStripe(payload);

    const sessionId = response.id;
    if (!sessionId || typeof sessionId !== 'string' || !sessionId.startsWith('cs_')) {
      console.error("❌ sessionId inválido o no recibido:", sessionId);
      alert('No se pudo iniciar el proceso de pago. Intenta nuevamente.');
      return;
    }

    const stripe = await loadStripe('pk_test_51RXY7uInrTAidYuTsntGcURCjjGaRfVjGMscXtna6BpX08WaQrs7a3SY4B7zlVFSLcObLSu3lsUX8q0NYKwX3r0T00DgPYwhzX'); // tu clave pública de Stripe
    stripe.redirectToCheckout({ sessionId: response.id });
  } catch (e) {
    console.error("Error completo:", e);
    if (e.response) {
      console.error("Status:", e.response.status);
      console.error("Data:", e.response.data);
    }
    alert('Error al iniciar el pago.');
  }
};



  if (loading) return <p className="text-center mt-4">Cargando...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Confirmar y Pagar</h2>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Plan: {plan.nombre}</h3>
        <p className="text-sm text-gray-600">{plan.descripcion}</p>
        <p><strong>Tipo de periodo:</strong> {formData.tipoPeriodo}</p>
        <p><strong>Precio:</strong> {formData.tipoPeriodo === 'Mensual' ? `$${plan.precioMensual}` : formData.tipoPeriodo === 'Semestral' ? `$${plan.precioSemestral}` : `$${plan.precioAnual}`}</p>
      </div>

      <button onClick={pagarConStripe} className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">
        Pagar con Stripe
      </button>
    </div>
  );
};

export default PagoPlan;
