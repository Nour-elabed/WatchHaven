import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const links = [
    { to: "/admin/dashboard", label: "Dashboard" },
    { to: "/admin/products", label: "Products" },
    { to: "/admin/orders", label: "Orders" },
    { to: "/admin/checklist", label: "Checklist" },
] as const;

const AdminLayout = () => {
    const location = useLocation();
    const { user } = useAuth();
    const navLinks = user?.role === "SUPER_ADMIN"
        ? [...links, { to: "/admin/users", label: "Users" }]
        : links;

    return (
        <main className="mx-auto min-h-screen w-full max-w-7xl px-6 pb-10 pt-24">
            <div className="mb-6 flex flex-wrap gap-2">
                {navLinks.map((link) => {
                    const isActive = location.pathname === link.to;
                    return (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`rounded-full px-4 py-2 text-sm ${isActive ? "bg-black text-white" : "bg-gray-100 text-gray-700"}`}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </div>
            <Outlet />
        </main>
    );
};

export default AdminLayout;
