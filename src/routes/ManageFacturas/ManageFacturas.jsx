import { useEffect, useState } from "react";
import {
  listarFacturas,
  crearFactura
} from "@/api/facturaService";
import {
  listarMonedas
} from "@/api/MonedaService";
import {
  listarProveedores
} from "@/api/proveedorService";
import {
  listarPresupuestos
} from "@/api/presupuestoService";
import {
  listarOrdenesCompra
} from "@/api/ordenCompraService";
import {
  getUsuarios
} from "@/api/userService";
import {
  listarCuentasContables
} from "@/api/cuentaContableService";
import {
  listarDetallesPorFactura,
  crearDetalleFactura
} from "@/api/detalleFacturaService";
import { X } from "lucide-react";

export default function GestionarFacturas() {
  const [facturas, setFacturas] = useState([]);
  const [form, setForm] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [proveedores, setProveedores] = useState([]);
  const [monedas, setMonedas] = useState([]);
  const [presupuestos, setPresupuestos] = useState([]);
  const [ordenesCompra, setOrdenesCompra] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [cuentasContables, setCuentasContables] = useState([]);
  const [facturaSeleccionada, setFacturaSeleccionada] = useState(null);
  const [detallesFactura, setDetallesFactura] = useState([]);
  const [isDetalleDrawerOpen, setIsDetalleDrawerOpen] = useState(false);
  const [nuevoDetalle, setNuevoDetalle] = useState({
    descripcion: "",
    cantidad: 1,
    precioUnitario: 0
  });

  const fetchFacturas = async () => {
    const data = await listarFacturas();
    setFacturas(data);
  };

  const fetchSelects = async () => {
    const [prov, mon, pres, ord, usr, cta] = await Promise.all([
      listarProveedores(),
      listarMonedas(),
      listarPresupuestos(),
      listarOrdenesCompra(),
      getUsuarios(),
      listarCuentasContables()
    ]);
    setProveedores(prov);
    setMonedas(mon);
    setPresupuestos(pres);
    setOrdenesCompra(ord);
    setUsuarios(usr);
    setCuentasContables(cta);
  };

  useEffect(() => {
    fetchFacturas();
    fetchSelects();
  }, []);

  const abrirDrawerNuevo = () => {
    setForm({
      numero: "",
      fecha: new Date().toISOString().split("T")[0],
      proveedorId: "",
      usuarioId: "",
      ordenCompraId: "",
      presupuestoId: "",
      cuentaContableId: "",
      monedaCodigo: "",
      tipoPago: "Contado",
      total: 0,
      observaciones: ""
    });
    setIsDrawerOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "total" ? parseFloat(value) : value,
    }));
  };

  const handleGuardar = async () => {
    try {
      console.log("📦 Enviando datos al backend:", form);
      await crearFactura(form);
      setMensaje("Factura creada correctamente.");
      setIsDrawerOpen(false);
      fetchFacturas();
    } catch (err) {
      console.error("Error al crear factura:", err);
      setMensaje("❌ Error al crear factura.");
    }
  };

  const abrirDrawerDetalle = async (factura) => {
    setFacturaSeleccionada(factura);
    const detalles = await listarDetallesPorFactura(factura.id);
    setDetallesFactura(detalles);
    setIsDetalleDrawerOpen(true);
  };

  const handleChangeDetalle = (e) => {
    const { name, value } = e.target;
    setNuevoDetalle((prev) => ({
      ...prev,
      [name]: name === "cantidad" || name === "precioUnitario" ? parseFloat(value) : value,
    }));
  };

  const handleAgregarDetalle = async () => {
    try {
      const data = {
        ...nuevoDetalle,
        facturaId: facturaSeleccionada.id
      };
      await crearDetalleFactura(data);
      const actualizados = await listarDetallesPorFactura(facturaSeleccionada.id);
      setDetallesFactura(actualizados);
      setNuevoDetalle({ descripcion: "", cantidad: 1, precioUnitario: 0 });
      setMensaje("Detalle agregado correctamente.");
    } catch (err) {
      console.error("Error al agregar detalle:", err);
      setMensaje("❌ Error al agregar detalle.");
    }
  };


  return (
    <div className="p-8">
      <div className="bg-white shadow rounded-xl p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Gestión de Facturas</h2>
          <button
            onClick={abrirDrawerNuevo}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Nueva Factura
          </button>
        </div>

        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">#</th>
              <th className="p-2">Número</th>
              <th className="p-2">Fecha</th>
              <th className="p-2">Proveedor</th>
              <th className="p-2">Total</th>
              <th className="p-2">Moneda</th>
              <th className="p-2">Tipo Pago</th>
              <th className="p-2">Nombre Presupuesto</th>
              <th className="p-2">Orden Compra</th>
              <th className="p-2">Cuenta Contable</th>
            </tr>
          </thead>
          <tbody>
            {facturas.map((f, i) => (
              <tr key={f.id} className="border-t">
                <td className="p-2">{i + 1}</td>
                <td className="p-2">{f.numero}</td>
                <td className="p-2">{f.fecha}</td>
                <td className="p-2">{f.proveedorNombre || "—"}</td>
                <td className="p-2">{f.total}</td>
                <td className="p-2">{f.monedaCodigo}</td>
                <td className="p-2">{f.tipoPago}</td>
                <td className="p-2">{f.presupuestoNombre}</td>
                <td className="p-2">{f.ordenCompraNumero}</td>
                <td className="p-2">{f.cuentaContableNombre}</td>
                <td className="p-2">
  <button
    onClick={() => abrirDrawerDetalle(f)}
    className="text-blue-600 underline"
  >
    Ver Detalle
  </button>
</td>

              </tr>
            ))}
          </tbody>
        </table>

        {mensaje && <p className="mt-4 text-sm text-blue-600">{mensaje}</p>}
      </div>
      {isDetalleDrawerOpen && facturaSeleccionada && (
  <div className="fixed top-0 right-0 h-full w-[450px] bg-white shadow-lg p-6 z-50 overflow-y-auto">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold">Detalles de: {facturaSeleccionada.numero}</h3>
      <button onClick={() => setIsDetalleDrawerOpen(false)} className="text-gray-500">
        <X />
      </button>
    </div>

    {detallesFactura.length === 0 ? (
      <p className="text-sm text-gray-500">No hay detalles registrados.</p>
    ) : (
      <ul className="text-sm space-y-2 mb-4">
        {detallesFactura.map((d) => (
          <li key={d.id} className="border p-2 rounded">
            <strong>{d.descripcion}</strong><br />
            Cantidad: {d.cantidad} | Precio: {d.precioUnitario} | Subtotal: {d.subtotal}
          </li>
        ))}
      </ul>
    )}

    <h4 className="text-md font-semibold mb-2 border-t pt-4">Agregar nuevo detalle</h4>
    <input
      name="descripcion"
      value={nuevoDetalle.descripcion}
      onChange={handleChangeDetalle}
      placeholder="Descripción"
      className="w-full border rounded px-3 py-2 mb-2"
    />
    <input
      type="number"
      name="cantidad"
      value={nuevoDetalle.cantidad}
      onChange={handleChangeDetalle}
      placeholder="Cantidad"
      className="w-full border rounded px-3 py-2 mb-2"
    />
    <input
      type="number"
      step="0.01"
      name="precioUnitario"
      value={nuevoDetalle.precioUnitario}
      onChange={handleChangeDetalle}
      placeholder="Precio Unitario"
      className="w-full border rounded px-3 py-2 mb-2"
    />
    <div className="text-right">
      <button
        onClick={handleAgregarDetalle}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Agregar Detalle
      </button>
    </div>
  </div>
)}


      {isDrawerOpen && (
        <div className="fixed top-0 right-0 h-full w-[400px] bg-white shadow-lg p-6 z-50 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Nueva Factura</h3>
            <button onClick={() => setIsDrawerOpen(false)} className="text-gray-500">
              <X />
            </button>
          </div>

          <div className="space-y-4">
            <input name="numero" value={form.numero} onChange={handleChange} placeholder="Número" className="w-full border rounded px-3 py-2" />
            <input type="date" name="fecha" value={form.fecha} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            <input type="number" name="total" value={form.total} onChange={handleChange} placeholder="Total" className="w-full border rounded px-3 py-2" />

            <select name="monedaCodigo" value={form.monedaCodigo} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option value="">Seleccione moneda</option>
              {monedas.map((m) => (
                <option key={m.codigo} value={m.codigo}>
                  {m.codigo} - {m.nombre}
                </option>
              ))}
            </select>

            <select name="tipoPago" value={form.tipoPago} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option value="Contado">Contado</option>
              <option value="Crédito">Crédito</option>
            </select>

            <select name="proveedorId" value={form.proveedorId} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option value="">Seleccione proveedor</option>
              {proveedores.map((p) => (
                <option key={p.id} value={p.id}>{p.nombre}</option>
              ))}
            </select>

            <select name="usuarioId" value={form.usuarioId} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option value="">Seleccione usuario</option>
              {usuarios.map((u) => (
                <option key={u.id} value={u.id}>{u.nombreCompleto}</option>
              ))}
            </select>

            <select name="ordenCompraId" value={form.ordenCompraId} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option value="">Seleccione orden de compra</option>
              {ordenesCompra.map((o) => (
                <option key={o.id} value={o.id}>{o.numero}</option>
              ))}
            </select>

            <select name="presupuestoId" value={form.presupuestoId} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option value="">Seleccione presupuesto</option>
              {presupuestos.map((p) => (
                <option key={p.id} value={p.id}>{p.nombre}</option>
              ))}
            </select>

            <select name="cuentaContableId" value={form.cuentaContableId} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option value="">Seleccione cuenta contable</option>
              {cuentasContables.map((c) => (
                <option key={c.id} value={c.id}>{c.codigo} - {c.nombre}</option>
              ))}
            </select>

            <textarea name="observaciones" value={form.observaciones} onChange={handleChange} placeholder="Observaciones" rows={3} className="w-full border rounded px-3 py-2" />
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
