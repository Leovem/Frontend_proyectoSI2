import { useEffect, useState } from "react";
import {
  getAllRoles,
  assignPrivilegesToRole,
  getPrivilegesByRole,
} from "@/api/roleService";
import { getAllPrivilegios } from "@/api/privilegeService";
import { ShieldCheck } from "lucide-react";

export default function AsignarPrivilegios() {
  const [roles, setRoles] = useState([]);
  const [privilegios, setPrivilegios] = useState([]);
  const [rolSeleccionado, setRolSeleccionado] = useState("");
  const [privilegiosSeleccionados, setPrivilegiosSeleccionados] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rolesData = await getAllRoles();
        const privilegiosData = await getAllPrivilegios();
        setRoles(rolesData);
        setPrivilegios(privilegiosData);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };
    fetchData();
  }, []);

  const handleRolChange = async (e) => {
    const rolId = e.target.value;
    setRolSeleccionado(rolId);
    try {
      const asignados = await getPrivilegesByRole(rolId);
      const ids = asignados.map((p) => p.id);
      setPrivilegiosSeleccionados(ids);
    } catch (err) {
      console.error("Error al cargar privilegios del rol:", err);
    }
  };

  const togglePrivilegio = (id) => {
    setPrivilegiosSeleccionados((prev) =>
      prev.includes(id)
        ? prev.filter((pid) => pid !== id)
        : [...prev, id]
    );
  };

  const handleAsignar = async () => {
    try {
      await assignPrivilegesToRole(rolSeleccionado, privilegiosSeleccionados);
      setMensaje("✅ Privilegios asignados correctamente.");
    } catch (err) {
      console.error("Error al asignar privilegios:", err);
      setMensaje("❌ Error al asignar privilegios.");
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-6">
        <div className="mb-6 border-b pb-4 flex items-center gap-2">
          <ShieldCheck className="text-blue-600" />
          <h2 className="text-2xl font-semibold text-gray-700">Asignar Privilegios a Roles</h2>
        </div>

        {/* Selector de Rol */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-600">Seleccionar Rol</label>
          <select
            value={rolSeleccionado}
            onChange={handleRolChange}
            className="w-full border px-4 py-2 rounded-lg"
          >
            <option value="">Seleccione un rol</option>
            {roles.map((rol) => (
              <option key={rol.id} value={rol.id}>
                {rol.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Lista de privilegios */}
        {rolSeleccionado && (
          <div className="mb-6">
            <p className="mb-2 font-medium text-gray-700">Seleccionar Privilegios:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {privilegios.map((priv) => (
                <label key={priv.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={privilegiosSeleccionados.includes(priv.id)}
                    onChange={() => togglePrivilegio(priv.id)}
                  />
                  {priv.nombre}
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Botón de asignar */}
        <div className="text-right">
          <button
            onClick={handleAsignar}
            disabled={!rolSeleccionado}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
          >
            Asignar Privilegios
          </button>
        </div>

        {/* Mensaje */}
        {mensaje && (
          <p className="mt-4 text-center font-medium text-sm text-blue-600">{mensaje}</p>
        )}
      </div>
    </div>
  );
}
