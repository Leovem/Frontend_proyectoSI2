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
            {
                label: "Privilegios",
                icon: PackagePlus,
                path: "privilegios",
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

