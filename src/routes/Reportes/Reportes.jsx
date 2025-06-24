import { useEffect, useState } from 'react';
import { listarActivos } from '@/api/activoService';
import { listarFacturas } from '@/api/facturaService';
import { listarPresupuestos } from '@/api/presupuestoService';
import { getUsuarios } from '@/api/userService';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function Reportes() {
  const [activos, setActivos] = useState([]);
  const [facturas, setFacturas] = useState([]);
  const [presupuestos, setPresupuestos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  useEffect(() => {
    listarActivos().then(setActivos);
    listarFacturas().then(setFacturas);
    listarPresupuestos().then(setPresupuestos);
    getUsuarios().then(setUsuarios);
  }, []);

  const exportarExcel = (data, nombreArchivo) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');
    XLSX.writeFile(wb, `${nombreArchivo}.xlsx`);
  };

  const exportarPDF = (data, columns, nombreArchivo) => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [columns],
      body: data.map(row => columns.map(col => row[col])),
    });
    doc.save(`${nombreArchivo}.pdf`);
  };

  const filtrarPorFecha = (items) => {
    if (!fechaInicio || !fechaFin) return items;
    return items.filter(item => {
      const fecha = new Date(item.fecha || item.fechaInicio || item.fechaRegistro);
      return fecha >= new Date(fechaInicio) && fecha <= new Date(fechaFin);
    });
  };

  const activosFiltrados = filtrarPorFecha(activos);
  const facturasFiltradas = filtrarPorFecha(facturas);
  const presupuestosFiltrados = filtrarPorFecha(presupuestos);
  const usuariosFiltrados = filtrarPorFecha(usuarios);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-10">
      <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-10">Reportes del Sistema</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input type="date" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} className="border p-2 rounded" />
        <input type="date" value={fechaFin} onChange={e => setFechaFin(e.target.value)} className="border p-2 rounded" />
      </div>

      {/* Reporte de Activos */}
      <section className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-green-700 dark:text-green-400">Activos por Ubicación</h2>
          <div className="flex gap-2">
            <button onClick={() => exportarExcel(activosFiltrados, 'Reporte_Activos')} className="px-3 py-1 bg-green-600 text-white rounded">Excel</button>
            <button onClick={() => exportarPDF(activosFiltrados, ['codigo', 'nombre', 'ubicacionNombre', 'valorInicial', 'estado'], 'Reporte_Activos')} className="px-3 py-1 bg-red-600 text-white rounded">PDF</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-800 dark:text-gray-100">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left">Código</th>
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-4 py-2 text-left">Ubicación</th>
                <th className="px-4 py-2 text-left">Valor Inicial</th>
                <th className="px-4 py-2 text-left">Estado</th>
              </tr>
            </thead>
            <tbody>
              {activosFiltrados.map((a) => (
                <tr key={a.id} className="even:bg-gray-50 dark:even:bg-gray-800">
                  <td className="px-4 py-2 border-t dark:border-gray-700">{a.codigo}</td>
                  <td className="px-4 py-2 border-t dark:border-gray-700">{a.nombre}</td>
                  <td className="px-4 py-2 border-t dark:border-gray-700">{a.ubicacionNombre || '—'}</td>
                  <td className="px-4 py-2 border-t dark:border-gray-700">${a.valorInicial}</td>
                  <td className="px-4 py-2 border-t dark:border-gray-700">{a.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Reporte de Facturas */}
      <section className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700 dark:text-blue-400">Facturas por Proveedor</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-800 dark:text-gray-100">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left">Número</th>
                <th className="px-4 py-2 text-left">Fecha</th>
                <th className="px-4 py-2 text-left">Proveedor</th>
                <th className="px-4 py-2 text-left">Total</th>
                <th className="px-4 py-2 text-left">Tipo Pago</th>
              </tr>
            </thead>
            <tbody>
              {facturas.map((f) => (
                <tr key={f.id} className="even:bg-gray-50 dark:even:bg-gray-800">
                  <td className="px-4 py-2 border-t dark:border-gray-700">{f.numero}</td>
                  <td className="px-4 py-2 border-t dark:border-gray-700">{f.fecha}</td>
                  <td className="px-4 py-2 border-t dark:border-gray-700">{f.proveedorNombre || '—'}</td>
                  <td className="px-4 py-2 border-t dark:border-gray-700">${f.total}</td>
                  <td className="px-4 py-2 border-t dark:border-gray-700">{f.tipoPago}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Reporte de Presupuestos */}
      <section className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-2xl font-semibold mb-4 text-purple-700 dark:text-purple-400">Presupuestos por Departamento</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-800 dark:text-gray-100">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-4 py-2 text-left">Fecha Inicio</th>
                <th className="px-4 py-2 text-left">Fecha Fin</th>
                <th className="px-4 py-2 text-left">Monto Asignado</th>
                <th className="px-4 py-2 text-left">Departamento</th>
              </tr>
            </thead>
            <tbody>
              {presupuestos.map((p) => (
                <tr key={p.id} className="even:bg-gray-50 dark:even:bg-gray-800">
                  <td className="px-4 py-2 border-t dark:border-gray-700">{p.nombre}</td>
                  <td className="px-4 py-2 border-t dark:border-gray-700">{p.fechaInicio}</td>
                  <td className="px-4 py-2 border-t dark:border-gray-700">{p.fechaFin}</td>
                  <td className="px-4 py-2 border-t dark:border-gray-700">${p.montoAsignado}</td>
                  <td className="px-4 py-2 border-t dark:border-gray-700">{p.departamentoNombre || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Reporte de Usuarios */}
      <section className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-2xl font-semibold mb-4 text-red-700 dark:text-red-400">Usuarios del Sistema</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-800 dark:text-gray-100">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left">Usuario</th>
                <th className="px-4 py-2 text-left">Nombre Completo</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Rol</th>
                <th className="px-4 py-2 text-left">Estado</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id} className="even:bg-gray-50 dark:even:bg-gray-800">
                  <td className="px-4 py-2 border-t dark:border-gray-700">{u.usuario}</td>
                  <td className="px-4 py-2 border-t dark:border-gray-700">{u.nombreCompleto}</td>
                  <td className="px-4 py-2 border-t dark:border-gray-700">{u.email}</td>
                  <td className="px-4 py-2 border-t dark:border-gray-700">{u.rolNombre}</td>
                  <td className="px-4 py-2 border-t dark:border-gray-700">{u.activo ? 'Activo' : 'Inactivo'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
