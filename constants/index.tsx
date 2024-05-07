import { LayoutDashboard, UserCog } from "lucide-react";

export const adminSideBarMenu = [
    {
        title: "Dashboard",
        icon: <LayoutDashboard width={48} />,
        path: "/",
    },
    {
        title: "My Profile",
        icon: <UserCog width={48} />,
        path: "/profile",
    },
]