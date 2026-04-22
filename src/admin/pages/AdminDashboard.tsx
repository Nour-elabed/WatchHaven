import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { adminGetOrders, adminGetProducts, adminGetUsers } from "@/services/adminService";

const AdminDashboard = () => {
    const { user } = useAuth();
    const { data: products } = useQuery({
        queryKey: ["admin", "products", "count"],
        queryFn: async () => (await adminGetProducts()).data.data,
    });
    const { data: users } = useQuery({
        queryKey: ["admin", "users", "count"],
        queryFn: async () => (await adminGetUsers()).data.data,
        enabled: user?.role === "SUPER_ADMIN",
    });
    const { data: orders } = useQuery({
        queryKey: ["admin", "orders", "count"],
        queryFn: async () => (await adminGetOrders()).data.data,
    });

    return (
        <section>
            <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>
            <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border p-5">
                    <p className="text-sm text-gray-500">Products</p>
                    <p className="mt-2 text-3xl font-bold">{products?.length ?? 0}</p>
                </div>
                <div className="rounded-xl border p-5">
                    <p className="text-sm text-gray-500">Users</p>
                    <p className="mt-2 text-3xl font-bold">{user?.role === "SUPER_ADMIN" ? users?.length ?? 0 : "-"}</p>
                </div>
                <div className="rounded-xl border p-5">
                    <p className="text-sm text-gray-500">Orders</p>
                    <p className="mt-2 text-3xl font-bold">{orders?.length ?? 0}</p>
                </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <Link to="/admin/products" className="rounded-lg border px-4 py-3 text-center text-sm font-medium hover:bg-gray-50">
                    Manage Products
                </Link>
                {user?.role === "SUPER_ADMIN" && (
                    <Link to="/admin/users" className="rounded-lg border px-4 py-3 text-center text-sm font-medium hover:bg-gray-50">
                        Manage Users
                    </Link>
                )}
                <Link to="/admin/orders" className="rounded-lg border px-4 py-3 text-center text-sm font-medium hover:bg-gray-50">
                    Manage Orders
                </Link>
                <Link to="/admin/checklist" className="rounded-lg border px-4 py-3 text-center text-sm font-medium hover:bg-gray-50">
                    Run Integration Checklist
                </Link>
            </div>
        </section>
    );
};

export default AdminDashboard;
