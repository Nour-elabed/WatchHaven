import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { 
    LayoutDashboard, 
    Package, 
    ShoppingCart, 
    Users, 
    LogOut,
    Menu,
    X
} from "lucide-react";
import { useState } from "react";

const links = [
    { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/products", label: "Manage Products", icon: Package },
    { to: "/admin/orders", label: "Manage Orders", icon: ShoppingCart },
    { to: "/admin/checklist", label: "Checklist", icon: LayoutDashboard },
] as const;

const AdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    const navLinks = user?.role === "SUPER_ADMIN"
        ? [...links, { to: "/admin/users", label: "Manage Users", icon: Users }]
        : links;

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile menu button */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-lg bg-white shadow-md"
                >
                    {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0`}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-6 border-b">
                        <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
                        <p className="text-sm text-gray-600 mt-1">
                            {user?.username} ({user?.role})
                        </p>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4">
                        <ul className="space-y-2">
                            {navLinks.map((link) => {
                                const isActive = location.pathname === link.to;
                                const Icon = link.icon;
                                return (
                                    <li key={link.to}>
                                        <Link
                                            to={link.to}
                                            onClick={() => setSidebarOpen(false)}
                                            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                                                isActive
                                                    ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                                                    : "text-gray-700 hover:bg-gray-100"
                                            }`}
                                        >
                                            <Icon size={20} className="mr-3" />
                                            <span className="font-medium">{link.label}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t">
                        <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <LogOut size={20} className="mr-3" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:ml-64">
                <main className="p-6 pt-20 lg:pt-6">
                    <Outlet />
                </main>
            </div>

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default AdminLayout;
