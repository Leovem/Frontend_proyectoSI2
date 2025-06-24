import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "@/pages/auth/Login";
import RegistrarUsuario from "@/routes/RegisterUser/RegisterUsers";
import GestionarRoles from "@/routes/ManageRoles/ManageRoles";
import GestionarProveedores from "./routes/ManageProveedores/ManageProveedores";
import GestionarPresupuestos from "./routes/ManagePresupuestos/ManagePresupuestos";
import GestionarProyectos from "./routes/ManagePresupuestos/ManageProyectos";
import GestionarFacturas from "./routes/ManageFacturas/ManageFacturas";
import GestionarActivos from "./routes/ManageActivos/ManageActivos";
import DepreciacionActivos from './routes/ManageActivos/DepreciacionActivos';
import RevaluacionActivos from './routes/ManageActivos/RevaluacionActivos';
import GestionarAuditoria from "./routes/Auditoria/Auditoria";
import AdquirirPlanForm from "@/pages/FormPlan/AdquirirPlanForm";
import PlanesPage from "@/pages/FormPlan/PlanesPage";
import Home from "@/pages/Home/Home";
import PagoPlan from "@/pages/FormPlan/PagoPlan";
import PagoExitoso from './pages/Pagos/PagoExitoso';
import PagoCancelado from './pages/Pagos/PagoCancelado';

import { ThemeProvider } from "@/contexts/theme-context";

import Layout from "@/routes/layout";
import DashboardPage from "@/routes/dashboard/page";
import GestionarUsuarios from "@/routes/ManageUsers/ManageUser";
import Reportes from "@/routes/Reportes/Reportes";

function App() {
    const router = createBrowserRouter([ 
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
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
                    element: <Reportes />,
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
                    path: "depreciacion",
                    element: <DepreciacionActivos />,
                },
                {
                    path: "revaluacion",
                    element: <RevaluacionActivos />,
                },
                {
                    path: "auditoria",
                    element: <GestionarAuditoria />,
                },
                {
                    path: "settings",
                    element: <h1 className="title">Ajustes</h1>,
                },
            ],
        },
        {
            path: "/adquirir-plan",
            element: <AdquirirPlanForm />,
        },
        {
            path: "/planes",
            element: <PlanesPage />,
        },
        {
            path: "/pagar",
            element: <PagoPlan />,
        },
        {
            path: "/pago-exitoso",
            element: <PagoExitoso />,
        },
        {
            path: "/pago-cancelado",
            element: <PagoCancelado />,
        }
    ]);

    return (
        <ThemeProvider storageKey="theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
