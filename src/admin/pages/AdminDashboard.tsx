import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { getStats } from "@/services/adminService";
import { Spinner } from "@/components/ui/spinner";
import { Package, Users, ShoppingCart, DollarSign, Activity } from "lucide-react";
import { ROLES, type DashboardStats } from "@/types";

const statusBadgeClass: Record<string, string> = {
    pending: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300",
    processing: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
    shipped: "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300",
    delivered: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
    cancelled: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
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
            <div className="rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/20 p-4 text-sm text-red-700 dark:text-red-300">
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
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Admin Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Welcome back, {user?.username}! Here's your store overview.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Link
                            key={index}
                            to={stat.link || "#"}
                            className="bg-white dark:bg-card rounded-xl shadow-sm dark:shadow-gray-900/10 border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md dark:hover:shadow-gray-900/20 transition-shadow uppercase font-bold tracking-tight"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{stat.title}</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-2">{stat.value}</p>
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
            <div className="bg-white dark:bg-card rounded-xl shadow-sm dark:shadow-gray-900/10 border border-gray-200 dark:border-gray-800 p-6">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Recent Orders</h2>
                    <Link
                        to="/admin/orders"
                        className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-bold uppercase tracking-widest"
                    >
                        View All
                    </Link>
                </div>
                
                {recentOrders.length > 0 ? (
                    <div className="space-y-3">
                        {recentOrders.map((order) => (
                            <div key={order._id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100/50 dark:border-gray-700/50">
                                <div>
                                    <p className="font-bold text-gray-900 dark:text-gray-100 uppercase text-xs tracking-widest">Order #{order._id.slice(-6).toUpperCase()}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mt-1">
                                        {order.user?.username ?? "Unknown User"}
                                    </p>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-gray-900 dark:text-gray-100">${order.totalPrice?.toFixed(2) || "0.00"}</p>
                                    <span className={`inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full mt-2 ${statusBadgeClass[order.status] ?? "bg-gray-100 text-gray-800"}`}>
                                        {order.status || "pending"}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8 font-medium">No orders yet</p>
                )}
            </div>

            {/* Orders by Status */}
            {ordersByStatus && (
                <div className="bg-white dark:bg-card rounded-xl shadow-sm dark:shadow-gray-900/10 border border-gray-200 dark:border-gray-800 p-6">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 uppercase tracking-tight">Orders by Status</h2>
                    <div className="flex flex-wrap gap-3">
                        {(Object.entries(ordersByStatus) as Array<[keyof typeof ordersByStatus, number]>).map(([status, count]) => (
                            <div
                                key={status}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest ${statusBadgeClass[status] ?? "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300"}`}
                            >
                                <span>{status}</span>
                                <span className="bg-white/70 dark:bg-gray-700/50 rounded-full px-2 py-0.5 text-[11px]">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white dark:bg-card rounded-xl shadow-sm dark:shadow-gray-900/10 border border-gray-200 dark:border-gray-800 p-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6 uppercase tracking-tight">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Link
                        to="/admin/products"
                        className="flex items-center p-4 bg-blue-50/50 dark:bg-blue-900/20 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all border border-blue-100/50 dark:border-blue-800/50"
                    >
                        <Package className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
                        <span className="font-bold text-blue-900 dark:text-blue-300 text-sm">Add New Product</span>
                    </Link>
                    <Link
                        to="/admin/orders"
                        className="flex items-center p-4 bg-green-50/50 dark:bg-green-900/20 rounded-xl hover:bg-green-50 dark:hover:bg-green-900/30 transition-all border border-green-100/50 dark:border-green-800/50"
                    >
                        <ShoppingCart className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" />
                        <span className="font-bold text-green-900 dark:text-green-300 text-sm">Manage Orders</span>
                    </Link>
                    {user?.role === ROLES.SUPER_ADMIN && (
                        <Link
                            to="/admin/users"
                            className="flex items-center p-4 bg-red-50/50 dark:bg-red-900/20 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/30 transition-all border border-red-100/50 dark:border-red-800/50"
                        >
                            <Users className="w-5 h-5 text-red-600 dark:text-red-400 mr-3" />
                            <span className="font-bold text-red-900 dark:text-red-300 text-sm">Manage Users</span>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
