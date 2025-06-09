// src/pages/PagoExitoso.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const PagoExitoso = () => {
  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded-xl shadow-md text-center">
      <h1 className="text-2xl font-bold text-green-600 mb-4">¡Pago Exitoso!</h1>
      <p className="mb-4">Gracias por adquirir el plan. Tu suscripción ha sido activada correctamente.</p>
      <Link
        to="/"
        className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Ir al inicio
      </Link>
    </div>
  );
};

export default PagoExitoso;
