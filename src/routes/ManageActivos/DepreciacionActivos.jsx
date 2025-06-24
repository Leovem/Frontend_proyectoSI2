import { useEffect, useState } from 'react';
import { getDepreciaciones, createDepreciacion } from '@/api/DepreciacionService';
import { listarActivos } from '@/api/ActivoService';
import { listarMetodosDepreciacion } from '@/api/MetodoDepreciacionService';
import { listarMonedas } from '@/api/MonedaService';

export default function DepreciacionActivos() {
  const [depreciaciones, setDepreciaciones] = useState([]);
  const [activos, setActivos] = useState([]);
  const [metodos, setMetodos] = useState([]);
  const [monedas, setMonedas] = useState([]);
  const [form, setForm] = useState({
    activoId: '',
    metodoDepreciacionId: '',
    fecha: '',
    valor: '',
    moneda: ''
  });

  useEffect(() => {
    getDepreciaciones().then(setDepreciaciones);
    listarActivos().then(setActivos);
    listarMetodosDepreciacion().then(setMetodos);
    listarMonedas().then(setMonedas);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createDepreciacion(form);
      setDepreciaciones(await getDepreciaciones());
      setForm({ activoId: '', metodoDepreciacionId: '', fecha: '', valor: '', moneda: '' });
    } catch (error) {
      console.error('Error al registrar depreciación:', error);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">Depreciación de Activos</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg space-y-6 mb-10 border border-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Activo</label>
            <select name="activoId" value={form.activoId} onChange={handleChange} className="w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              <option value="">Seleccione un activo</option>
              {activos.map((a) => (
                <option key={a.id} value={a.id}>{a.nombre}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Método de Depreciación</label>
            <select name="metodoDepreciacionId" value={form.metodoDepreciacionId} onChange={handleChange} className="w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              <option value="">Seleccione un método</option>
              {metodos.map((m) => (
                <option key={m.id} value={m.id}>{m.nombre}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Fecha</label>
            <input type="date" name="fecha" value={form.fecha} onChange={handleChange} className="w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Valor</label>
            <input type="number" name="valor" value={form.valor} onChange={handleChange} step="0.01" placeholder="Valor" className="w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Moneda</label>
            <select name="moneda" value={form.moneda} onChange={handleChange} className="w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              <option value="">Seleccione moneda</option>
              {monedas.map((m) => (
                <option key={m.codigo} value={m.codigo}>{m.codigo}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-right">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition duration-200">
            Registrar Depreciación
          </button>
        </div>
      </form>

      <div className="bg-white rounded-2xl shadow-md overflow-x-auto border border-gray-200">
        <table className="min-w-full text-sm">
          <thead className="bg-blue-100 text-blue-900">
            <tr>
              <th className="px-4 py-3 text-left">Activo</th>
              <th className="px-4 py-3 text-left">Método</th>
              <th className="px-4 py-3 text-left">Fecha</th>
              <th className="px-4 py-3 text-left">Valor</th>
              <th className="px-4 py-3 text-left">Moneda</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(depreciaciones) && depreciaciones.map((item) => (
              <tr key={item.id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3">{item.activoNombre}</td>
                <td className="px-4 py-3">{item.metodoNombre}</td>
                <td className="px-4 py-3">{item.fecha}</td>
                <td className="px-4 py-3">{item.valor}</td>
                <td className="px-4 py-3">{item.moneda}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
