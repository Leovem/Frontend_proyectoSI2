import { useEffect, useState } from "react";
import {
  getUsuarios,
  updateUsuario,
  activarUsuario,
  desactivarUsuario,
} from "@/api/userService";
import { getRoles } from "@/api/roleService";
import { Pencil, ToggleLeft, ToggleRight, X } from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function GestionarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const [busqueda, setBusqueda] = useState("");
  const [filtroRol, setFiltroRol] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");

  const [ordenCampo, setOrdenCampo] = useState("usuario");
  const [ordenAscendente, setOrdenAscendente] = useState(true);
  const [pagina, setPagina] = useState(1);
  const elementosPorPagina = 10;

  const [rolesDisponibles, setRolesDisponibles] = useState([]);

  useEffect(() => {
    fetchUsuarios();
    fetchRoles();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  const fetchRoles = async () => {
    try {
      const data = await getRoles();
      setRolesDisponibles(data);
    } catch (err) {
      console.error("Error al obtener roles:", err);
    }
  };

  const handleToggleEstado = async (usuario) => {
    try {
      if (usuario.activo) {
        await desactivarUsuario(usuario.id);
        setMensaje(`Usuario ${usuario.usuario} desactivado`);
      } else {
        await activarUsuario(usuario.id);
        setMensaje(`Usuario ${usuario.usuario} activado`);
      }
      fetchUsuarios();
    } catch (err) {
      setMensaje("❌ Error al actualizar estado del usuario");
    }
  };

  const handleOpenDrawer = (usuario) => {
    setUsuarioActual({ ...usuario });
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
      setMensaje("Error al actualizar usuario.");
    }
  };

  const exportarAExcel = () => {
    const datos = usuariosFiltrados.map((u) => ({
      Usuario: u.usuario,
      Nombre: u.nombreCompleto,
      Email: u.email,
      Rol: u.rolNombre,
      Estado: u.activo ? "Activo" : "Inactivo",
    }));
    const ws = XLSX.utils.json_to_sheet(datos);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Usuarios");
    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([buffer], { type: "application/octet-stream" }), "usuarios.xlsx");
  };

  const usuariosFiltrados = usuarios
    .filter(u =>
      (filtroRol ? u.rolNombre === filtroRol : true) &&
      (filtroEstado ? (filtroEstado === "activo" ? u.activo : !u.activo) : true) &&
      (busqueda ? u.usuario.toLowerCase().includes(busqueda.toLowerCase()) : true)
    );

  const usuariosOrdenados = [...usuariosFiltrados]
    .sort((a, b) => {
      const valA = a[ordenCampo]?.toString().toLowerCase();
      const valB = b[ordenCampo]?.toString().toLowerCase();
      return ordenAscendente ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });

  const totalPaginas = Math.ceil(usuariosOrdenados.length / elementosPorPagina);
  const usuariosPaginados = usuariosOrdenados.slice(
    (pagina - 1) * elementosPorPagina,
    pagina * elementosPorPagina
  );

  return (
    <div className="p-8 relative">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-xl p-6">
        <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-700">Gestión de Usuarios</h2>
          <button onClick={exportarAExcel} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Exportar a Excel
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mb-4">
          <input placeholder="Buscar usuario..." className="border px-2 py-1 rounded" onChange={(e) => setBusqueda(e.target.value)} />
          <select onChange={(e) => setFiltroRol(e.target.value)} className="border px-2 py-1 rounded">
            <option value="">Todos los roles</option>
            {rolesDisponibles.map((rol) => (
              <option key={rol.id} value={rol.nombre}>{rol.nombre}</option>
            ))}
          </select>
          <select onChange={(e) => setFiltroEstado(e.target.value)} className="border px-2 py-1 rounded">
            <option value="">Todos</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm">
              <th className="p-2 cursor-pointer" onClick={() => {
                setOrdenCampo("usuario");
                setOrdenAscendente(!ordenAscendente);
              }}>Usuario</th>
              <th className="p-2">Nombre</th>
              <th className="p-2">Email</th>
              <th className="p-2">Rol</th>
              <th className="p-2">Estado</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosPaginados.map((usuario) => (
              <tr key={usuario.id} className="border-b text-sm">
                <td className="p-2">{usuario.usuario}</td>
                <td className="p-2">{usuario.nombreCompleto}</td>
                <td className="p-2">{usuario.email}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    usuario.rolNombre === "Admin"
                      ? "bg-red-100 text-red-700"
                      : usuario.rolNombre === "Docente"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }`}>
                    {usuario.rolNombre}
                  </span>
                </td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    usuario.activo ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}>
                    {usuario.activo ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="p-2 flex gap-2 items-center">
                  <button onClick={() => handleToggleEstado(usuario)} className="text-blue-600">
                    {usuario.activo ? <ToggleLeft size={18} /> : <ToggleRight size={18} />}
                  </button>
                  <button onClick={() => handleOpenDrawer(usuario)} className="text-gray-600">
                    <Pencil size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm">Página {pagina} de {totalPaginas}</p>
          <div className="flex gap-2">
            <button disabled={pagina === 1} onClick={() => setPagina(pagina - 1)} className="px-2 py-1 border rounded">
              Anterior
            </button>
            <button disabled={pagina === totalPaginas} onClick={() => setPagina(pagina + 1)} className="px-2 py-1 border rounded">
              Siguiente
            </button>
          </div>
        </div>

        {mensaje && <p className="mt-4 text-center text-sm text-blue-600">{mensaje}</p>}
      </div>

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
              <input name="usuario" value={usuarioActual.usuario} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="text-sm font-medium">Nombre Completo</label>
              <input name="nombreCompleto" value={usuarioActual.nombreCompleto} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input name="email" value={usuarioActual.email} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            </div>
          </div>

          <div className="mt-6 text-right">
            <button onClick={handleGuardarCambios} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Guardar Cambios
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
