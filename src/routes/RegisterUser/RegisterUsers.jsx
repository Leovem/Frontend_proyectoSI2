import { useEffect, useState } from "react";
import { registerUser } from "@/api/authService";
import { getAllRoles } from "@/api/roleService";
import { UserPlus } from "lucide-react";

export default function RegistrarUsuario() {
  const [formData, setFormData] = useState({
    usuario: "",
    nombreCompleto: "",
    email: "",
    contrasena: "",
    rolId: "",
  });

  const [roles, setRoles] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [exito, setExito] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await getAllRoles();
        setRoles(data);
      } catch (error) {
        console.error("Error al cargar roles:", error);
      }
    };
    fetchRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    try {
      await registerUser(formData);
      setExito(true);
      setMensaje("✅ Usuario registrado correctamente.");
    } catch (err) {
      setExito(false);
      setMensaje(`❌ ${err.message}`);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <div className="mb-6 border-b pb-4 flex items-center gap-2">
          <UserPlus className="text-blue-600" />
          <h2 className="text-2xl font-semibold text-gray-700">Registro de Usuario</h2>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">Usuario</label>
            <input
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">Nombre Completo</label>
            <input
              name="nombreCompleto"
              value={formData.nombreCompleto}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">Contraseña</label>
            <input
              type="password"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">Rol</label>
            <select
              name="rolId"
              value={formData.rolId}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg bg-white focus:ring-2 focus:ring-blue-300"
              required
            >
              <option value="">Seleccione un rol</option>
              {roles.map((rol) => (
                <option key={rol.id} value={rol.id}>
                  {rol.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2 text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Registrar Usuario
            </button>
          </div>
        </form>

        {mensaje && (
          <div className={`mt-6 text-sm text-center ${exito ? "text-green-600" : "text-red-600"}`}>
            {mensaje}
          </div>
        )}
      </div>
    </div>
  );
}
