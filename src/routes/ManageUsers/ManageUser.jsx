import { useEffect, useState } from "react";
import {
  getUsuarios,
  updateUsuario,
  activarUsuario,
  desactivarUsuario,
} from "@/api/userService";
import { Pencil, ToggleLeft, ToggleRight, X } from "lucide-react";

export default function GestionarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [mensaje, setMensaje] = useState("");

  // Drawer states
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState(null);

  const fetchUsuarios = async () => {
    try {
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleToggleEstado = async (usuario) => {
    try {
      console.log("Usuario actual:", usuario);
      if (usuario.activo) {
        console.log("Desactivando usuario...");
        const res = await desactivarUsuario(usuario.id);
        console.log("Respuesta desactivar:", res);
        setMensaje(`Usuario ${usuario.usuario} desactivado`);
      } else {
        console.log("Activando usuario...");
        const res = await activarUsuario(usuario.id);
        console.log("Respuesta activar:", res);
        setMensaje(`Usuario ${usuario.usuario} activado`);
      }
      await fetchUsuarios();
    } catch (err) {
      console.error("❌ Error al cambiar estado del usuario:", err);
      if (err.response) {
        console.error("📦 Error del backend:", err.response.data);
      }
      setMensaje("❌ Error al actualizar estado del usuario");
    }
  };
  


  const handleOpenDrawer = (usuario) => {
    setUsuarioActual({ ...usuario }); // Clonamos para edición
    setIsDrawerOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuarioActual((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardarCambios = async () => {
    try {
      await updateUsuario(usuarioActual.id, usuarioActual);
      setMensaje("Usuario actualizado correctamente.");
      setIsDrawerOpen(false);
      fetchUsuarios();
    } catch (err) {
      console.error("Error al actualizar usuario:", err);
      setMensaje("Error al actualizar usuario.");
    }
  };

  return (
    <div className="p-8 relative">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-2">Gestión de Usuarios</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-sm">
                <th className="p-2">#</th>
                <th className="p-2">Usuario</th>
                <th className="p-2">Nombre</th>
                <th className="p-2">Email</th>
                <th className="p-2">Rol</th>
                <th className="p-2">Fecha de ultimo acceso</th>
                <th className="p-2">Estado</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario, index) => (
                <tr key={usuario.id} className="border-b text-sm">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{usuario.usuario}</td>
                  <td className="p-2">{usuario.nombreCompleto}</td>
                  <td className="p-2">{usuario.email}</td>
                  <td className="p-2">{usuario.rolNombre || "Sin rol"}</td>
                  <td className="p-2">{usuario.fechaUltimoAcceso}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        usuario.activo ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {usuario.activo ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="p-2 flex gap-2 items-center">
                    <button onClick={() => handleToggleEstado(usuario)} className="text-blue-600">
                      {usuario.activo ? <ToggleLeft size={18} /> : <ToggleRight size={18} />}
                    </button>
                    <button
                      onClick={() => handleOpenDrawer(usuario)}
                      className="text-gray-600"
                      title="Editar"
                    >
                      <Pencil size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {mensaje && (
          <p className="mt-4 text-center text-sm text-blue-600">{mensaje}</p>
        )}
      </div>

      {/* === Drawer lateral === */}
      {isDrawerOpen && usuarioActual && (
        <div className="fixed top-0 right-0 h-full w-[350px] md:w-[400px] bg-white shadow-lg z-50 p-6 transition-all">
          <div className="flex items-center justify-between mb-4 border-b pb-2">
            <h3 className="text-lg font-semibold">Editar Usuario</h3>
            <button onClick={() => setIsDrawerOpen(false)} className="text-gray-500">
              <X />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Usuario</label>
              <input
                name="usuario"
                value={usuarioActual.usuario}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Nombre Completo</label>
              <input
                name="nombreCompleto"
                value={usuarioActual.nombreCompleto}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                name="email"
                value={usuarioActual.email}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          <div className="mt-6 text-right">
            <button
              onClick={handleGuardarCambios}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
