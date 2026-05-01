import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { getStats } from "@/services/adminService";
import { Spinner } from "@/components/ui/spinner";
import { Package, Users, ShoppingCart, DollarSign, Activity } from "lucide-react";
import { ROLES, type DashboardStats } from "@/types";

const statusBadgeClass: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
};

const AdminDashboard = () => {
    const { user } = useAuth();

    const {
        data: dashboardStats,
        isLoading,
        isError,
        error,
    } = useQuery<DashboardStats>({
        queryKey: ["admin-stats"],
        queryFn: getStats,
    });

    if (isLoading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <Spinner />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                Failed to load stats: {error instanceof Error ? error.message : "Unknown error"}
            </div>
        );
    }

    const totalRevenue = dashboardStats?.totalRevenue ?? 0;
    const recentOrders = dashboardStats?.recentOrders ?? [];
    const ordersByStatus = dashboardStats?.ordersByStatus;

    const stats: Array<{
        title: string;
        value: number | string;
        icon: typeof Package;
        color: string;
        link?: string;
    }> = [
        {
            title: "Total Products",
            value: dashboardStats?.totalProducts ?? 0,
            icon: Package,
            color: "bg-blue-500",
            link: "/admin/products",
        },
        {
            title: "Total Orders",
            value: dashboardStats?.totalOrders ?? 0,
            icon: ShoppingCart,
            color: "bg-green-500",
            link: "/admin/orders",
        },
        {
            title: "Pending Orders",
            value: ordersByStatus?.pending ?? 0,
            icon: Activity,
            color: "bg-yellow-500",
            link: "/admin/orders",
        },
        {
            title: "Total Revenue",
            value: `$${totalRevenue.toFixed(2)}`,
            icon: DollarSign,
            color: "bg-purple-500",
        },
    ];

    if (user?.role === ROLES.SUPER_ADMIN) {
        stats.splice(3, 0, {
            title: "Total Users",
            value: dashboardStats?.totalUsers ?? 0,
            icon: Users,
            color: "bg-red-500",
            link: "/admin/users",
        });
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600 mt-2">Welcome back, {user?.username}! Here's your store overview.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Link
                            key={index}
                            to={stat.link || "#"}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow uppercase font-bold tracking-tight"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.title}</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                                </div>
                                <div className={`${stat.color} p-3 rounded-lg shadow-inner`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
                    <Link
                        to="/admin/orders"
                        className="text-sm text-blue-600 hover:text-blue-800 font-bold uppercase tracking-widest"
                    >
                        View All
                    </Link>
                </div>
                
                {recentOrders.length > 0 ? (
                    <div className="space-y-3">
                        {recentOrders.map((order) => (
                            <div key={order._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100/50">
                                <div>
                                    <p className="font-bold text-gray-900 uppercase text-xs tracking-widest">Order #{order._id.slice(-6).toUpperCase()}</p>
                                    <p className="text-sm text-gray-600 font-medium mt-1">
                                        {order.user?.username ?? "Unknown User"}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-gray-900">${order.totalPrice?.toFixed(2) || "0.00"}</p>
                                    <span className={`inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full mt-2 ${statusBadgeClass[order.status] ?? "bg-gray-100 text-gray-800"}`}>
                                        {order.status || "pending"}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center py-8 font-medium">No orders yet</p>
                )}
            </div>

            {/* Orders by Status */}
            {ordersByStatus && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-tight">Orders by Status</h2>
                    <div className="flex flex-wrap gap-3">
                        {(Object.entries(ordersByStatus) as Array<[keyof typeof ordersByStatus, number]>).map(([status, count]) => (
                            <div
                                key={status}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest ${statusBadgeClass[status] ?? "bg-gray-100 text-gray-800"}`}
                            >
                                <span>{status}</span>
                                <span className="bg-white/70 rounded-full px-2 py-0.5 text-[11px]">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-tight">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Link
                        to="/admin/products"
                        className="flex items-center p-4 bg-blue-50/50 rounded-xl hover:bg-blue-50 transition-all border border-blue-100/50"
                    >
                        <Package className="w-5 h-5 text-blue-600 mr-3" />
                        <span className="font-bold text-blue-900 text-sm">Add New Product</span>
                    </Link>
                    <Link
                        to="/admin/orders"
                        className="flex items-center p-4 bg-green-50/50 rounded-xl hover:bg-green-50 transition-all border border-green-100/50"
                    >
                        <ShoppingCart className="w-5 h-5 text-green-600 mr-3" />
                        <span className="font-bold text-green-900 text-sm">Manage Orders</span>
                    </Link>
                    {user?.role === ROLES.SUPER_ADMIN && (
                        <Link
                            to="/admin/users"
                            className="flex items-center p-4 bg-red-50/50 rounded-xl hover:bg-red-50 transition-all border border-red-100/50"
                        >
                            <Users className="w-5 h-5 text-red-600 mr-3" />
                            <span className="font-bold text-red-900 text-sm">Manage Users</span>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
