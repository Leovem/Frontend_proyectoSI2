import { useEffect, useState } from "react";
import {
  getAllRoles,
  createRole,
  updateRole,
  deleteRole,
} from "@/api/roleService";
import { PencilLine, Trash, PlusCircle } from "lucide-react";

export default function GestionarRoles() {
  const [roles, setRoles] = useState([]);
  const [nuevoRol, setNuevoRol] = useState("");
  const [editando, setEditando] = useState(null);
  const [nombreEditado, setNombreEditado] = useState("");

  const fetchRoles = async () => {
    try {
      const data = await getAllRoles();
      setRoles(data);
    } catch (err) {
      console.error("Error al obtener roles:", err);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleCrearRol = async () => {
    if (!nuevoRol.trim()) return;
    try {
      await createRole({ nombre: nuevoRol });
      setNuevoRol("");
      fetchRoles();
    } catch (err) {
      console.error("Error al crear rol:", err);
    }
  };

  const handleActualizarRol = async (id) => {
    try {
      await updateRole(id, { nombre: nombreEditado });
      setEditando(null);
      setNombreEditado("");
      fetchRoles();
    } catch (err) {
      console.error("Error al actualizar rol:", err);
    }
  };

  const handleEliminarRol = async (id) => {
    if (confirm("¿Estás seguro de eliminar este rol?")) {
      try {
        await deleteRole(id);
        fetchRoles();
      } catch (err) {
        console.error("Error al eliminar rol:", err);
      }
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-2">Gestión de Roles</h2>

        {/* Crear nuevo rol */}
        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Nuevo rol"
            value={nuevoRol}
            onChange={(e) => setNuevoRol(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-2"
          />
          <button
            onClick={handleCrearRol}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-1"
          >
            <PlusCircle size={18} /> Crear
          </button>
        </div>

        {/* Tabla de roles */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">#</th>
                <th className="p-2">Nombre del Rol</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((rol, index) => (
                <tr key={rol.id} className="border-b">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">
                    {editando === rol.id ? (
                      <input
                        value={nombreEditado}
                        onChange={(e) => setNombreEditado(e.target.value)}
                        className="border px-2 py-1 rounded"
                      />
                    ) : (
                      rol.nombre
                    )}
                  </td>
                  <td className="p-2 space-x-2">
                    {editando === rol.id ? (
                      <button
                        onClick={() => handleActualizarRol(rol.id)}
                        className="text-blue-600 font-medium"
                      >
                        Guardar
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditando(rol.id);
                          setNombreEditado(rol.nombre);
                        }}
                        className="text-yellow-600"
                      >
                        <PencilLine size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => handleEliminarRol(rol.id)}
                      className="text-red-600"
                    >
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {roles.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-gray-500">
                    No hay roles registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
