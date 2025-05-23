import { useEffect, useState } from "react";
import {
  listarActivos,
  crearActivo,
  actualizarActivo,
  eliminarActivo,
} from "@/api/activoService";
import { listarTipoActivo } from "@/api/tipoActivoService";
import { listarUbicacionesPorEmpresa } from "@/api/ubicacionService";
import { listarCuentasContables } from "@/api/cuentaContableService";
import { listarMetodosDepreciacion } from "@/api/metodoDepreciacionService";
import { listarTipoDepreciacion } from "@/api/tipoDepreciacionService";
import { listarGruposActivos } from "@/api/grupoActivoService";
import { listarClasificacionesActivo } from "@/api/clasificacionActivoService";
import { listarMarcas } from "@/api/marcaService";
import { listarModelos } from "@/api/modeloService";
import { listarTipoContrato } from "@/api/tipoContratoService";
import { listarFacturas } from "@/api/facturaService";
import { listarMonedas } from "@/api/MonedaService";
import { Pencil, Trash, X } from "lucide-react";

export default function GestionarActivos() {
  const [activos, setActivos] = useState([]);
  const [form, setForm] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const [tipoActivos, setTipoActivos] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [cuentasContables, setCuentasContables] = useState([]);
  const [metodosDepreciacion, setMetodosDepreciacion] = useState([]);
  const [tiposDepreciacion, setTiposDepreciacion] = useState([]);
  const [gruposActivos, setGruposActivos] = useState([]);
  const [clasificaciones, setClasificaciones] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [tiposContrato, setTiposContrato] = useState([]);
  const [facturas, setFacturas] = useState([]);
  const [monedas, setMonedas] = useState([]);

  const fetchActivos = async () => {
    const data = await listarActivos();
    setActivos(data);
  };

  const fetchSelects = async () => {
    const [ta, ub, cc, md, td, ga, cl, ma, mo, tc, fa, mo2] = await Promise.all([
      listarTipoActivo(),
      listarUbicacionesPorEmpresa(),
      listarCuentasContables(),
      listarMetodosDepreciacion(),
      listarTipoDepreciacion(),
      listarGruposActivos(),
      listarClasificacionesActivo(),
      listarMarcas(),
      listarModelos(),
      listarTipoContrato(),
      listarFacturas(),
      listarMonedas(),
    ]);
    setTipoActivos(ta);
    setUbicaciones(ub);
    setCuentasContables(cc);
    setMetodosDepreciacion(md);
    setTiposDepreciacion(td);
    setGruposActivos(ga);
    setClasificaciones(cl);
    setMarcas(ma);
    setModelos(mo);
    setTiposContrato(tc);
    setFacturas(fa);
    setMonedas(mo2);
  };

  useEffect(() => {
    fetchActivos();
    fetchSelects();
  }, []);

  const abrirDrawerNuevo = () => {
    setForm({});
    setIsDrawerOpen(true);
  };

  const abrirDrawerEditar = (activo) => {
    setForm({ ...activo });
    setIsDrawerOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "valorInicial" ? parseFloat(value) : value,
    }));
  };

  const handleGuardar = async () => {
    try {
      if (form.id) {
        await actualizarActivo(form.id, form);
        setMensaje("Activo actualizado.");
      } else {
        await crearActivo(form);
        setMensaje("Activo creado.");
      }
      setIsDrawerOpen(false);
      fetchActivos();
    } catch (err) {
      console.error("Error al guardar:", err);
      setMensaje("❌ Error al guardar activo.");
    }
  };

  const handleEliminar = async (id) => {
    if (!confirm("¿Eliminar activo?")) return;
    await eliminarActivo(id);
    fetchActivos();
  };

  return (
    <div className="p-8">
      <div className="bg-white shadow rounded-xl p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Gestión de Activos</h2>
          <button
            onClick={abrirDrawerNuevo}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Nuevo Activo
          </button>
        </div>

        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">#</th>
              <th className="p-2">Nombre</th>
              <th className="p-2">Descripción</th>
              <th className="p-2">Valor</th>
              <th className="p-2">Moneda</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {activos.map((a, i) => (
              <tr key={a.id} className="border-t">
                <td className="p-2">{i + 1}</td>
                <td className="p-2">{a.nombre}</td>
                <td className="p-2">{a.descripcion}</td>
                <td className="p-2">{a.valorInicial}</td>
                <td className="p-2">{a.monedaCodigo}</td>
                <td className="p-2 flex gap-2">
                  <button onClick={() => abrirDrawerEditar(a)} className="text-blue-600">
                    <Pencil size={18} />
                  </button>
                  <button onClick={() => handleEliminar(a.id)} className="text-red-600">
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
        <div className="fixed top-0 right-0 h-full w-[400px] bg-white shadow-lg p-6 z-50 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {form.id ? "Editar Activo" : "Nuevo Activo"}
            </h3>
            <button onClick={() => setIsDrawerOpen(false)} className="text-gray-500">
              <X />
            </button>
          </div>

          <div className="space-y-4">
            <input name="nombre" value={form.nombre || ""} onChange={handleChange} placeholder="Nombre" className="w-full border rounded px-3 py-2" />
            <input name="descripcion" value={form.descripcion || ""} onChange={handleChange} placeholder="Descripción" className="w-full border rounded px-3 py-2" />
            <input type="number" name="valorInicial" value={form.valorInicial || 0} onChange={handleChange} placeholder="Valor Inicial" className="w-full border rounded px-3 py-2" />
            <select name="moneda" value={form.moneda || ""} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option value="">Seleccione moneda</option>
              {monedas.map((m) => (
                <option key={m.codigo} value={m.codigo}>{m.codigo} - {m.nombre}</option>
              ))}
            </select>

            {/* Selects adicionales */}
            {[
  { label: "Tipo de Activo", name: "tipoActivoId", items: tipoActivos, labelField: "nombre" },
  { label: "Ubicación", name: "ubicacionId", items: ubicaciones, labelField: "nombre" },
  { label: "Cuenta Contable", name: "cuentaContableId", items: cuentasContables, labelField: "nombre" },
  { label: "Método Depreciación", name: "metodoDepreciacionId", items: metodosDepreciacion, labelField: "nombre" },
  { label: "Tipo Depreciación", name: "tipoDepreciacionId", items: tiposDepreciacion, labelField: "nombre" },
  { label: "Grupo Activo", name: "grupoActivoId", items: gruposActivos, labelField: "nombre" },
  { label: "Clasificación", name: "clasificacionId", items: clasificaciones, labelField: "nombre" },
  { label: "Marca", name: "marcaId", items: marcas, labelField: "nombre" },
  { label: "Modelo", name: "modeloId", items: modelos, labelField: "nombre" },
  { label: "Tipo Contrato", name: "tipoContratoId", items: tiposContrato, labelField: "nombre" },
  { label: "Factura", name: "facturaId", items: facturas, labelField: "numero" },
].map(({ label, name, items, labelField }) => (
  <select
    key={name}
    name={name}
    value={form[name] || ""}
    onChange={handleChange}
    className="w-full border rounded px-3 py-2"
  >
    <option value="">Seleccione {label.toLowerCase()}</option>
    {items.map((item) => (
      <option key={item.id} value={item.id}>
        {item[labelField]}
      </option>
    ))}
  </select>
))}

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