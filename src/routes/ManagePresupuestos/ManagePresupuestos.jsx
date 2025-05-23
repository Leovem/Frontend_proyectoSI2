import { useEffect, useState } from "react";
import {
  listarPresupuestos,
  crearPresupuesto,
  actualizarPresupuesto,
  eliminarPresupuesto,
} from "@/api/PresupuestoService";

import { listarMonedas } from "@/api/MonedaService";
import { listarDepartamentos } from "@/api/DepartamentoService";
import { listarProyectos } from "@/api/ProyectoService";

import { Pencil, Trash, X } from "lucide-react";

export default function GestionarPresupuestos() {
  const [presupuestos, setPresupuestos] = useState([]);
  const [form, setForm] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const [monedas, setMonedas] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [proyectos, setProyectos] = useState([]);

  const fetchPresupuestos = async () => {
    const data = await listarPresupuestos();
    setPresupuestos(data);
  };

  const fetchSelects = async () => {
    const [m, d, p] = await Promise.all([
      listarMonedas(),
      listarDepartamentos(),
      listarProyectos(),
    ]);
    setMonedas(m);
    setDepartamentos(d);
    setProyectos(p);
  };

  useEffect(() => {
    fetchPresupuestos();
    fetchSelects();
  }, []);

  const abrirDrawerNuevo = () => {
    setForm({
      nombre: "",
      fechaInicio: "",
      fechaFin: "",
      montoAsignado: 0,
      moneda: "",
      departamentoId: null,
      proyectoId: null,
    });
    setIsDrawerOpen(true);
  };

  const abrirDrawerEditar = (presupuesto) => {
    setForm({ ...presupuesto });
    setIsDrawerOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "montoAsignado" ? parseFloat(value) : value,
    }));
  };

  const handleGuardar = async () => {
    try {
      if (form.id) {
        await actualizarPresupuesto(form.id, form);
        setMensaje("Presupuesto actualizado.");
      } else {
        await crearPresupuesto(form);
        setMensaje("Presupuesto creado.");
      }
      setIsDrawerOpen(false);
      fetchPresupuestos();
    } catch (err) {
      console.error("Error al guardar:", err);
      setMensaje("❌ Error al guardar presupuesto.");
    }
  };

  const handleEliminar = async (id) => {
    if (!confirm("¿Eliminar presupuesto?")) return;
    await eliminarPresupuesto(id);
    fetchPresupuestos();
  };

  return (
    <div className="p-8">
      <div className="bg-white shadow rounded-xl p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Gestión de Presupuestos</h2>
          <button
            onClick={abrirDrawerNuevo}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Nuevo Presupuesto
          </button>
        </div>

        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">#</th>
              <th className="p-2">Nombre</th>
              <th className="p-2">Fecha Inicio</th>
              <th className="p-2">Fecha Fin</th>
              <th className="p-2">Monto</th>
              <th className="p-2">Moneda</th>
              <th className="p-2">Departamento</th>
              <th className="p-2">Proyecto</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {presupuestos.map((p, i) => (
              <tr key={p.id} className="border-t">
                <td className="p-2">{i + 1}</td>
                <td className="p-2">{p.nombre}</td>
                <td className="p-2">{p.fechaInicio}</td>
                <td className="p-2">{p.fechaFin}</td>
                <td className="p-2">{p.montoAsignado}</td>
                <td className="p-2">{p.moneda}</td>
                <td className="p-2">{p.departamentoNombre || "—"}</td>
                <td className="p-2">{p.proyectoNombre || "—"}</td>
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
              {form.id ? "Editar Presupuesto" : "Nuevo Presupuesto"}
            </h3>
            <button onClick={() => setIsDrawerOpen(false)} className="text-gray-500">
              <X />
            </button>
          </div>

          <div className="space-y-4">
            <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" className="w-full border rounded px-3 py-2" />
            <input type="date" name="fechaInicio" value={form.fechaInicio} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            <input type="date" name="fechaFin" value={form.fechaFin} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            <input type="number" name="montoAsignado" value={form.montoAsignado} onChange={handleChange} placeholder="Monto" className="w-full border rounded px-3 py-2" />

            <select name="moneda" value={form.moneda || ""} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option value="">Seleccione moneda</option>
              {monedas.map((m) => (
                <option key={m.codigo} value={m.codigo}>
                  {m.codigo} - {m.nombre}
                </option>
              ))}
            </select>

            <select name="departamentoId" value={form.departamentoId || ""} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option value="">Seleccione departamento</option>
              {departamentos.map((d) => (
                <option key={d.id} value={d.id}>{d.nombre}</option>
              ))}
            </select>

            <select name="proyectoId" value={form.proyectoId || ""} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option value="">Seleccione proyecto</option>
              {proyectos.map((p) => (
                <option key={p.id} value={p.id}>{p.nombre}</option>
              ))}
            </select>
          </div>

          <div className="mt-6 text-right">
            <button onClick={handleGuardar} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Guardar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
