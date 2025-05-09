import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "@/pages/auth/Login";
import RegistrarUsuario from "@/routes/RegisterUser/RegisterUsers";
import GestionarRoles from "@/routes/ManageRoles/ManageRoles";

import { ThemeProvider } from "@/contexts/theme-context";

import Layout from "@/routes/layout";
import DashboardPage from "@/routes/dashboard/page";
import AsignarPrivilegios from "@/routes/ManagePrivilegios/ManagePrivilege";
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
                    path: "privilegios",
                    element: <AsignarPrivilegios />,
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
