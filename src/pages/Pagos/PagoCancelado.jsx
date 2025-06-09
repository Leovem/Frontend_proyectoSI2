// src/pages/PagoCancelado.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const PagoCancelado = () => {
  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded-xl shadow-md text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Pago Cancelado</h1>
      <p className="mb-4">No se completó la transacción. Puedes intentarlo de nuevo cuando estés listo.</p>
      <Link
        to="/pagar"
        className="inline-block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
      >
        Volver a intentar
      </Link>
    </div>
  );
};

export default PagoCancelado;
