// src/routes/ManageRoles/GestionarRoles.jsx
import { useEffect, useState } from "react";
import {
  getRoles,
  createRol,
  updateRol,
  deleteRol,
} from "@/api/roleService";
import { getPrivilegios } from "@/api/privilegeService";
import { PencilLine, Trash, PlusCircle, Check, X } from "lucide-react";

export default function GestionarRoles() {
  const [roles, setRoles] = useState([]);
  const [privilegiosDisponibles, setPrivilegiosDisponibles] = useState([]);
  const [nuevoRol, setNuevoRol] = useState("");
  const [privilegiosSeleccionados, setPrivilegiosSeleccionados] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [nombreEditado, setNombreEditado] = useState("");
  const [privilegiosEditados, setPrivilegiosEditados] = useState([]);

  const fetchDatos = async () => {
    try {
      const [rolesData, privilegiosData] = await Promise.all([
        getRoles(),
        getPrivilegios(),
      ]);
      setRoles(rolesData);
      setPrivilegiosDisponibles(privilegiosData);
    } catch (err) {
      console.error("Error al cargar datos:", err);
      setMensaje("Error al cargar datos de roles o privilegios");
    }
  };

  useEffect(() => {
    fetchDatos();
  }, []);

  const handleCrearRol = async () => {
    if (!nuevoRol.trim()) return;
    try {
      await createRol({
        nombre: nuevoRol,
        privilegioIds: privilegiosSeleccionados.map(Number),
      });
      setNuevoRol("");
      setPrivilegiosSeleccionados([]);
      setMensaje("✅ Rol creado correctamente");
      fetchDatos();
    } catch (err) {
      console.error("Error al crear rol:", err);
      setMensaje("❌ Error al crear rol");
    }
  };

  const iniciarEdicion = (rol) => {
    setEditandoId(rol.id);
    setNombreEditado(rol.nombre);
    setPrivilegiosEditados(rol.privilegios?.map((p) => p.id.toString()) || []);
  };

  const guardarEdicion = async (id) => {
    try {
      await updateRol(id, {
        nombre: nombreEditado,
        privilegioIds: privilegiosEditados.map(Number),
      });
      setEditandoId(null);
      setMensaje("✅ Rol actualizado correctamente");
      fetchDatos();
    } catch (err) {
      console.error("Error al actualizar rol:", err);
      setMensaje("❌ Error al actualizar rol");
    }
  };

  const handleEliminarRol = async (id) => {
    if (confirm("¿Eliminar este rol?")) {
      try {
        await deleteRol(id);
        setMensaje("✅ Rol eliminado");
        fetchDatos();
      } catch (err) {
        console.error("Error al eliminar rol:", err);
        setMensaje("❌ Error al eliminar rol");
      }
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Gestión de Roles</h2>

      {mensaje && (
        <div className="mb-4 text-sm text-center text-blue-600 font-medium">{mensaje}</div>
      )}

      {/* Crear nuevo rol */}
      <div className="bg-white shadow-md rounded-xl p-4 mb-8">
        <h3 className="text-lg font-semibold mb-2">Crear nuevo rol</h3>
        <input
          type="text"
          placeholder="Nombre del rol"
          value={nuevoRol}
          onChange={(e) => setNuevoRol(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-2"
        />
        <select
          multiple
          value={privilegiosSeleccionados}
          onChange={(e) =>
            setPrivilegiosSeleccionados(
              Array.from(e.target.selectedOptions, (opt) => opt.value)
            )
          }
          className="w-full border rounded p-2 h-28"
        >
          {privilegiosDisponibles.map((p) => (
            <option key={p.id} value={p.id}>{p.nombre}</option>
          ))}
        </select>
        <button
          onClick={handleCrearRol}
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
        >
          <PlusCircle size={18} /> Crear
        </button>
      </div>

      {/* Tabla de roles */}
      <div className="bg-white shadow-md rounded-xl overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr className="text-left text-sm">
              <th className="p-3">#</th>
              <th className="p-3">Nombre</th>
              <th className="p-3">Privilegios</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((rol, index) => (
              <tr key={rol.id} className="border-t align-top text-sm">
                <td className="p-3 font-medium">{index + 1}</td>
                <td className="p-3">
                  {editandoId === rol.id ? (
                    <input
                      value={nombreEditado}
                      onChange={(e) => setNombreEditado(e.target.value)}
                      className="w-full border px-2 py-1 rounded"
                    />
                  ) : (
                    rol.nombre
                  )}
                </td>
                <td className="p-3">
                  {editandoId === rol.id ? (
                    <select
                      multiple
                      value={privilegiosEditados}
                      onChange={(e) =>
                        setPrivilegiosEditados(
                          Array.from(e.target.selectedOptions, (opt) => opt.value)
                        )
                      }
                      className="w-full border rounded p-1 h-28"
                    >
                      {privilegiosDisponibles.map((priv) => (
                        <option key={priv.id} value={priv.id}>{priv.nombre}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {rol.privilegios?.map((p) => (
                        <span key={p.id} className="bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded-full">
                          {p.nombre}
                        </span>
                      ))}
                    </div>
                  )}
                </td>
                <td className="p-3 space-x-2">
                  {editandoId === rol.id ? (
                    <>
                      <button onClick={() => guardarEdicion(rol.id)} className="text-green-600">
                        <Check size={18} />
                      </button>
                      <button onClick={() => setEditandoId(null)} className="text-gray-500">
                        <X size={18} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => iniciarEdicion(rol)} className="text-yellow-600">
                        <PencilLine size={18} />
                      </button>
                      <button onClick={() => handleEliminarRol(rol.id)} className="text-red-600">
                        <Trash size={18} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {roles.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No hay roles registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
