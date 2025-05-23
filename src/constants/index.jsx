import { ChartColumn, Home, NotepadText, Package, PackagePlus, Settings, ShoppingBag, UserCheck, UserPlus, Users } from "lucide-react";


export const navbarLinks = [
    {
        title: "Dashboard",
        links: [
            {
                label: "Dashboard",
                icon: Home,
                path: "/dashboard",
            },
            {
                label: "Analisis",
                icon: ChartColumn,
                path: "analytics",
            },
            {
                label: "Reportes",
                icon: NotepadText,
                path: "reports",
            },
        ],
    },
    {
        title: "Gestionar Usuarios",
        links: [
            {
                label: "Usuarios",
                icon: Users,
                path: "customers",
            },
            {
                label: "Nuevo usuario",
                icon: UserPlus,
                path: "new-customer",
            },
        ],
    },
    {
        title: "Gestionar roles y privilegios",
        links: [
            {
                label: "Roles",
                icon: Package,
                path: "roles",
            },
        ],
    },
    {
        title: "Gestionar proveedores",
        links: [
            {
                label: "Proveedores",
                icon: Package,
                path: "proveedores",
            },
            
        ],
    },
    {
        title: "Gestionar presupuestos",
        links: [
            {
                label: "Presupuestos",
                icon: Package,
                path: "presupuestos",
            },
            {
                label: "Proyectos",
                icon: Package,
                path: "proyectos",
            },
        ],
    },
    {
        title: "Gestionar Facturas",
        links: [
            {
                label: "Facturas",
                icon: Package,
                path: "facturas",
            },
        ],
    },
    {
        title: "Gestionar Activos",
        links: [
            {
                label: "Activos",
                icon: Package,
                path: "activos",
            },
        ],
    },
    {
        title: "Ajustes",
        links: [
            {
                label: "Ajustes",
                icon: Settings,
                path: "settings",
            },
        ],
    },
];

