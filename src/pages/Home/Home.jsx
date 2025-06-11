import React from 'react';
import { Link } from 'react-router-dom';
''

const HomePanel = () => {
  const usuarios = [
  { nombre: 'Claudia Evelin Tapia', rol: 'Product Owner', foto: '/perfil/claudia.png' },
  { nombre: 'Elias Puma Claure', rol: 'Scrum Master', foto: '/perfil/elias.png' },
  { nombre: 'Misael Vedia Mostacedo', rol: 'Developer', foto: '/perfil/misael.png' },
  { nombre: 'Jose Diego Garcia Caballero', rol: 'Developer', foto: '/perfil/diego.png' },
];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero */}
      <div className="text-center py-20 bg-blue-600 text-white">
        <h1 className="text-4xl font-bold mb-4">Bienvenido a ActivoFijo Cloud</h1>
        <p className="text-lg mb-6">Gestiona activos, equipos y suscripciones de forma eficiente y segura.</p>
        <Link to="/planes" className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-xl hover:bg-blue-100 transition">
          Adquirir un Plan
        </Link>
      </div>

      {/* Secciones */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Acerca de nosotros */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Sobre Nosotros</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {usuarios.map((u, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 shadow text-center">
                <img src={u.foto} alt={u.nombre} className="w-24 h-24 mx-auto rounded-full object-cover mb-4" />
                <h3 className="text-lg font-semibold text-gray-800">{u.nombre}</h3>
                <p className="text-sm text-gray-500">{u.rol}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contacto */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">¿Tienes preguntas?</h2>
          <p className="mb-6 text-gray-600">Escríbenos a <a href="mailto:soporte@activofijo.com" className="text-blue-600 underline">soporte@activofijo.com</a></p>
          <Link to="/login" className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition">
            Iniciar Sesión
          </Link>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center py-6 mt-10">
        <p>&copy; {new Date().getFullYear()} ActivoFijo. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default HomePanel;
