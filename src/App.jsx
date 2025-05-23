import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "@/pages/auth/Login";
import RegistrarUsuario from "@/routes/RegisterUser/RegisterUsers";
import GestionarRoles from "@/routes/ManageRoles/ManageRoles";
import GestionarProveedores from "./routes/ManageProveedores/ManageProveedores";
import GestionarPresupuestos from "./routes/ManagePresupuestos/ManagePresupuestos";
import GestionarProyectos from "./routes/ManagePresupuestos/ManageProyectos";
import GestionarFacturas from "./routes/ManageFacturas/ManageFacturas";
import GestionarActivos from "./routes/ManageActivos/ManageActivos";

import { ThemeProvider } from "@/contexts/theme-context";

import Layout from "@/routes/layout";
import DashboardPage from "@/routes/dashboard/page";
import GestionarUsuarios from "@/routes/ManageUsers/ManageUser";

function App() {
    const router = createBrowserRouter([ 
        {
            path: "/",
            element: <Login />,  
        },
        {
            path: "/dashboard",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <DashboardPage />,
                },
                {
                    path: "analytics",
                    element: <h1 className="title">Analisis</h1>,
                },
                {
                    path: "reports",
                    element: <h1 className="title">Reportes</h1>,
                },
                {
                    path: "customers",
                    element: <GestionarUsuarios />,
                },
                {
                    path: "new-customer",
                    element: <RegistrarUsuario />,
                },
                {
                    path: "roles",
                    element: <GestionarRoles />,
                },
                {
                    path: "proveedores",
                    element: <GestionarProveedores />,
                },
                {
                    path: "presupuestos",
                    element: <GestionarPresupuestos />,
                },
                {
                    path: "proyectos",
                    element: <GestionarProyectos />,
                },
                {
                    path: "facturas",
                    element: <GestionarFacturas />,
                },
                {
                    path: "activos",
                    element: <GestionarActivos />,
                },
                {
                    path: "settings",
                    element: <h1 className="title">Ajustes</h1>,
                },
            ],
        },
    ]);

    return (
        <ThemeProvider storageKey="theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
