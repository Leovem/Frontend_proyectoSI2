'use client';

import { useEffect, useState } from 'react';
import { listarAuditoriaEmpresa } from '@/api/AuditoriaService';
import { ArrowDown, ArrowUp } from 'lucide-react';

export default function GestionarAuditoria() {
  const [auditorias, setAuditorias] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [filtroTabla, setFiltroTabla] = useState('');
  const [filtroOperacion, setFiltroOperacion] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const auditoriasPorPagina = 10;

  useEffect(() => {
    fetchAuditoria();
  }, []);

  const fetchAuditoria = async () => {
  try {
    const data = await listarAuditoriaEmpresa();
    // Ordena por fechaCliente descendente
    const ordenado = data.sort((a, b) => new Date(b.fechaCliente) - new Date(a.fechaCliente));
    setAuditorias(ordenado);
  } catch (error) {
    console.error('Error al obtener auditoría:', error);
    setMensaje('Error al cargar los registros de auditoría.');
  }
};


  const aplicarFiltros = (registro) => {
    return (
      (!filtroTabla || registro.tablaAfectada.includes(filtroTabla)) &&
      (!filtroOperacion || registro.operacion === filtroOperacion)
    );
  };

  const exportarCSV = () => {
    const encabezados = [
      'Fecha',
      'Operación',
      'Tabla',
      'Acción',
      'Descripción',
      'IP Cliente'
    ];
    const filas = auditorias.filter(aplicarFiltros).map((a) => [
      a.fechaCliente,
      a.operacion,
      a.tablaAfectada,
      a.accion,
      a.descripcion,
      a.ipCliente
    ]);
    const contenido = [encabezados, ...filas].map((fila) => fila.join(',')).join('\n');
    const blob = new Blob([contenido], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bitacora_auditoria.csv';
    a.click();
  };

  const auditoriasFiltradas = auditorias.filter(aplicarFiltros);
  const totalPaginas = Math.ceil(auditoriasFiltradas.length / auditoriasPorPagina);
  const datosPagina = auditoriasFiltradas.slice(
    (paginaActual - 1) * auditoriasPorPagina,
    paginaActual * auditoriasPorPagina
  );

  return (
    <div className="p-8 relative">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-700">Bitácora de Auditoría</h2>
          <button
            onClick={exportarCSV}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Exportar CSV
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Filtrar por tabla"
            className="border px-3 py-2 rounded w-full md:w-1/3"
            value={filtroTabla}
            onChange={(e) => setFiltroTabla(e.target.value)}
          />
          <select
            className="border px-3 py-2 rounded w-full md:w-1/3"
            value={filtroOperacion}
            onChange={(e) => setFiltroOperacion(e.target.value)}
          >
            <option value="">Todas las operaciones</option>
            <option value="INSERT">INSERT</option>
            <option value="UPDATE">UPDATE</option>
            <option value="DELETE">DELETE</option>
            <option value="LOGIN">LOGIN</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">Fecha</th>
                <th className="p-2">Operación</th>
                <th className="p-2">Tabla</th>
                <th className="p-2">Acción</th>
                <th className="p-2">Descripción</th>
                <th className="p-2">IP</th>
              </tr>
            </thead>
            <tbody>
              {datosPagina.map((a, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="p-2 text-gray-600">{new Date(a.fechaCliente).toISOString().replace('T', ' ').substring(0, 19)}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold 
                      ${a.operacion === 'INSERT' ? 'bg-green-100 text-green-700'
                        : a.operacion === 'UPDATE' ? 'bg-yellow-100 text-yellow-700'
                        : a.operacion === 'DELETE' ? 'bg-red-100 text-red-700'
                        : 'bg-blue-100 text-blue-700'}`}
                    >
                      {a.operacion}
                    </span>
                  </td>
                  <td className="p-2">{a.tablaAfectada}</td>
                  <td className="p-2">{a.accion}</td>
                  <td className="p-2 text-gray-700">{a.descripcion}</td>
                  <td className="p-2 text-gray-500">{a.ipCliente}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Mostrando {datosPagina.length} de {auditoriasFiltradas.length} registros
          </p>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setPaginaActual((p) => Math.max(p - 1, 1))}
              disabled={paginaActual === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <span className="text-sm">
              Página {paginaActual} de {totalPaginas}
            </span>
            <button
              onClick={() => setPaginaActual((p) => Math.min(p + 1, totalPaginas))}
              disabled={paginaActual === totalPaginas}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        </div>

        {mensaje && (
          <p className="mt-4 text-center text-sm text-red-500">{mensaje}</p>
        )}
      </div>
    </div>
  );
}
