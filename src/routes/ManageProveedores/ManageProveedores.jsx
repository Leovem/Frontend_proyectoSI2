import { useEffect, useState } from "react";
import {
  listarProveedores,
  crearProveedor,
  actualizarProveedor,
  eliminarProveedor,
} from "@/api/ProveedorService";
import { Pencil, Trash, X } from "lucide-react";

export default function GestionarProveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [proveedorActual, setProveedorActual] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const fetchProveedores = async () => {
    try {
      const data = await listarProveedores();
      setProveedores(data);
    } catch (error) {
      console.error("Error al obtener proveedores:", error);
    }
  };

  useEffect(() => {
    fetchProveedores();
  }, []);

  const handleOpenDrawer = (proveedor) => {
    setProveedorActual({ ...proveedor });
    setIsDrawerOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProveedorActual((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardar = async () => {
    try {
      if (proveedorActual.id) {
        await actualizarProveedor(proveedorActual.id, proveedorActual);
        setMensaje("Proveedor actualizado.");
      } else {
        await crearProveedor(proveedorActual);
        setMensaje("Proveedor creado.");
      }
      setIsDrawerOpen(false);
      fetchProveedores();
    } catch (error) {
      console.error("Error al guardar proveedor:", error);
      setMensaje("❌ Error al guardar proveedor.");
    }
  };

  const handleEliminar = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este proveedor?")) return;
    try {
      await eliminarProveedor(id);
      setMensaje("Proveedor eliminado.");
      fetchProveedores();
    } catch (error) {
      console.error("Error al eliminar proveedor:", error);
      setMensaje("❌ Error al eliminar proveedor.");
    }
  };

  return (
    <div className="p-8 relative">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-700">Gestión de Proveedores</h2>
          <button
            onClick={() => {
              setProveedorActual({ nombre: "", contacto: "", email: "", telefono: "", direccion: "" });
              setIsDrawerOpen(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Nuevo Proveedor
          </button>
        </div>

        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">#</th>
              <th className="p-2">Nombre</th>
              <th className="p-2">Contacto</th>
              <th className="p-2">Email</th>
              <th className="p-2">Teléfono</th>
              <th className="p-2">Dirección</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.map((p, i) => (
              <tr key={p.id} className="border-t">
                <td className="p-2">{i + 1}</td>
                <td className="p-2">{p.nombre}</td>
                <td className="p-2">{p.contacto}</td>
                <td className="p-2">{p.email}</td>
                <td className="p-2">{p.telefono}</td>
                <td className="p-2">{p.direccion}</td>
                <td className="p-2 flex gap-2">
                  <button onClick={() => handleOpenDrawer(p)} className="text-blue-600" title="Editar">
                    <Pencil size={18} />
                  </button>
                  <button onClick={() => handleEliminar(p.id)} className="text-red-600" title="Eliminar">
                    <Trash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {mensaje && (
          <p className="mt-4 text-center text-sm text-blue-600">{mensaje}</p>
        )}
      </div>

      {/* === Drawer lateral para editar/crear === */}
      {isDrawerOpen && proveedorActual && (
        <div className="fixed top-0 right-0 h-full w-[350px] bg-white shadow-lg z-50 p-6">
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h3 className="text-lg font-semibold">
              {proveedorActual.id ? "Editar Proveedor" : "Nuevo Proveedor"}
            </h3>
            <button onClick={() => setIsDrawerOpen(false)} className="text-gray-500">
              <X />
            </button>
          </div>

          <div className="space-y-4">
            {["nombre", "contacto", "email", "telefono", "direccion"].map((campo) => (
              <div key={campo}>
                <label className="text-sm font-medium capitalize">{campo}</label>
                <input
                  type="text"
                  name={campo}
                  value={proveedorActual[campo] || ""}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            ))}
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
