import { useEffect, useState } from 'react';
import { getRevaluaciones, createRevaluacion } from '@/api/RevaluacionService';
import { listarActivos } from '@/api/ActivoService';

export default function RevaluacionActivos() {
  const [revaluaciones, setRevaluaciones] = useState([]);
  const [activos, setActivos] = useState([]);
  const [form, setForm] = useState({
    activoId: '',
    fecha: '',
    nuevoValor: '',
    motivo: ''
  });

  useEffect(() => {
    getRevaluaciones().then(setRevaluaciones);
    listarActivos().then(setActivos);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRevaluacion(form);
      setRevaluaciones(await getRevaluaciones());
      setForm({ activoId: '', fecha: '', nuevoValor: '', motivo: '' });
    } catch (error) {
      console.error('Error al registrar revaluación:', error);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
  <h1 className="text-4xl font-bold mb-6 text-center text-gray-900 dark:text-white">
    Revaluación de Activos
  </h1>

  <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md space-y-6 mb-10 border border-gray-200 dark:border-gray-700">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Activo</label>
        <select
          name="activoId"
          value={form.activoId}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
          <option value="">Seleccione un activo</option>
          {activos.map((a) => (
            <option key={a.id} value={a.id}>{a.nombre}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Fecha</label>
        <input
          type="date"
          name="fecha"
          value={form.fecha}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Nuevo Valor</label>
        <input
          type="number"
          name="nuevoValor"
          value={form.nuevoValor}
          onChange={handleChange}
          step="0.01"
          placeholder="Nuevo valor"
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Motivo</label>
        <input
          type="text"
          name="motivo"
          value={form.motivo}
          onChange={handleChange}
          placeholder="Motivo de la revaluación"
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>
    </div>

    <div className="text-right mt-4">
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow"
      >
        Registrar Revaluación
      </button>
    </div>
  </form>

  <div className="bg-white dark:bg-gray-900 rounded-xl shadow overflow-x-auto border border-gray-200 dark:border-gray-700">
    <table className="min-w-full text-sm text-gray-800 dark:text-gray-100">
      <thead className="bg-gray-100 dark:bg-gray-800">
        <tr>
          <th className="px-6 py-3 text-left">Activo</th>
          <th className="px-6 py-3 text-left">Fecha</th>
          <th className="px-6 py-3 text-left">Nuevo Valor</th>
          <th className="px-6 py-3 text-left">Motivo</th>
        </tr>
      </thead>
      <tbody>
        {revaluaciones.map((item, i) => (
          <tr key={item.id} className={`${i % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"} hover:bg-gray-100 dark:hover:bg-gray-700`}>
            <td className="px-6 py-3 border-t dark:border-gray-700">{item.activoNombre}</td>
            <td className="px-6 py-3 border-t dark:border-gray-700">{item.fecha}</td>
            <td className="px-6 py-3 border-t dark:border-gray-700">${item.nuevoValor}</td>
            <td className="px-6 py-3 border-t dark:border-gray-700">{item.motivo}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
}
