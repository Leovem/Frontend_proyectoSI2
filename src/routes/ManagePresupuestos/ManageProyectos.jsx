import { useEffect, useState } from "react";
import {
  listarProyectos,
  crearProyecto,
  actualizarProyecto,
  eliminarProyecto,
} from "@/api/ProyectoService";
import { Pencil, Trash, X } from "lucide-react";

export default function GestionarProyectos() {
  const [proyectos, setProyectos] = useState([]);
  const [form, setForm] = useState({ nombre: "", descripcion: "" });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const fetchProyectos = async () => {
    try {
      const data = await listarProyectos();
      setProyectos(data);
    } catch (err) {
      console.error("Error al cargar proyectos:", err);
    }
  };

  useEffect(() => {
    fetchProyectos();
  }, []);

  const abrirDrawerNuevo = () => {
    setForm({ nombre: "", descripcion: "" });
    setIsDrawerOpen(true);
  };

  const abrirDrawerEditar = (proyecto) => {
    setForm({ ...proyecto });
    setIsDrawerOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardar = async () => {
    try {
      if (form.id) {
        await actualizarProyecto(form.id, form);
        setMensaje("Proyecto actualizado.");
      } else {
        await crearProyecto(form);
        setMensaje("Proyecto creado.");
      }
      setIsDrawerOpen(false);
      fetchProyectos();
    } catch (err) {
      console.error("Error al guardar proyecto:", err);
      setMensaje("❌ Error al guardar proyecto.");
    }
  };

  const handleEliminar = async (id) => {
    if (!confirm("¿Eliminar este proyecto?")) return;
    try {
      await eliminarProyecto(id);
      fetchProyectos();
    } catch (err) {
      console.error("Error al eliminar proyecto:", err);
    }
  };

  return (
    <div className="p-8">
      <div className="bg-white shadow rounded-xl p-6 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Gestión de Proyectos</h2>
          <button
            onClick={abrirDrawerNuevo}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Nuevo Proyecto
          </button>
        </div>

        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">#</th>
              <th className="p-2">Nombre</th>
              <th className="p-2">Descripción</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proyectos.map((p, i) => (
              <tr key={p.id} className="border-t">
                <td className="p-2">{i + 1}</td>
                <td className="p-2 font-medium">{p.nombre}</td>
                <td className="p-2">{p.descripcion || "—"}</td>
                <td className="p-2 flex gap-2">
                  <button onClick={() => abrirDrawerEditar(p)} className="text-blue-600">
                    <Pencil size={18} />
                  </button>
                  <button onClick={() => handleEliminar(p.id)} className="text-red-600">
                    <Trash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {mensaje && <p className="mt-4 text-sm text-blue-600">{mensaje}</p>}
      </div>

      {isDrawerOpen && (
        <div className="fixed top-0 right-0 h-full w-[400px] bg-white shadow-lg p-6 z-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {form.id ? "Editar Proyecto" : "Nuevo Proyecto"}
            </h3>
            <button onClick={() => setIsDrawerOpen(false)} className="text-gray-500">
              <X />
            </button>
          </div>

          <div className="space-y-4">
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Nombre del proyecto"
              className="w-full border rounded px-3 py-2"
            />
            <textarea
              name="descripcion"
              value={form.descripcion || ""}
              onChange={handleChange}
              placeholder="Descripción"
              rows={4}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="mt-6 text-right">
            <button
              onClick={handleGuardar}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
