import { Link, Outlet, useLocation } from "react-router-dom";

const links = [
    { to: "/admin", label: "Overview" },
    { to: "/admin/products", label: "Products" },
    { to: "/admin/users", label: "Users" },
    { to: "/admin/orders", label: "Orders" },
    { to: "/admin/checklist", label: "Checklist" },
];

const AdminLayout = () => {
    const location = useLocation();

    return (
        <main className="mx-auto min-h-screen w-full max-w-7xl px-6 pb-10 pt-24">
            <div className="mb-6 flex flex-wrap gap-2">
                {links.map((link) => {
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
