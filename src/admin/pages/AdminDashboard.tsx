import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { adminGetOrders, adminGetProducts, adminGetUsers } from "@/services/adminService";
import { Package, Users, ShoppingCart, DollarSign, Activity } from "lucide-react";

const AdminDashboard = () => {
    const { user } = useAuth();
    
    const { data: products } = useQuery({
        queryKey: ["admin", "products"],
        queryFn: async () => (await adminGetProducts()).data.data,
    });
    
    const { data: users } = useQuery({
        queryKey: ["admin", "users"],
        queryFn: async () => (await adminGetUsers()).data.data,
        enabled: user?.role === "SUPER_ADMIN",
    });
    
    const { data: orders } = useQuery({
        queryKey: ["admin", "orders"],
        queryFn: async () => (await adminGetOrders()).data.data,
    });

    // Calculate stats
    const totalRevenue = orders?.reduce((sum, order) => sum + (order.totalPrice || 0), 0) || 0;
    const pendingOrders = orders?.filter(order => order.status === 'pending').length || 0;
    const recentOrders = orders?.slice(0, 5) || [];

    const stats = [
        {
            title: "Total Products",
            value: products?.length || 0,
            icon: Package,
            color: "bg-blue-500",
            link: "/admin/products"
        },
        {
            title: "Total Orders",
            value: orders?.length || 0,
            icon: ShoppingCart,
            color: "bg-green-500",
            link: "/admin/orders"
        },
        {
            title: "Pending Orders",
            value: pendingOrders,
            icon: Activity,
            color: "bg-yellow-500",
            link: "/admin/orders"
        },
        {
            title: "Total Revenue",
            value: `$${totalRevenue.toFixed(2)}`,
            icon: DollarSign,
            color: "bg-purple-500"
        },
    ];

    if (user?.role === "SUPER_ADMIN") {
        stats.splice(3, 0, {
            title: "Total Users",
            value: users?.length || 0,
            icon: Users,
            color: "bg-red-500",
            link: "/admin/users"
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
                            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                                </div>
                                <div className={`${stat.color} p-3 rounded-lg`}>
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
                    <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                    <Link
                        to="/admin/orders"
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                        View All
                    </Link>
                </div>
                
                {recentOrders.length > 0 ? (
                    <div className="space-y-3">
                        {recentOrders.map((order) => (
                            <div key={order._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-900">Order #{order._id.slice(-8)}</p>
                                    <p className="text-sm text-gray-600">
                                        {typeof order.user === 'object' ? order.user.username : 'Unknown User'}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium text-gray-900">${order.totalPrice?.toFixed(2) || '0.00'}</p>
                                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {order.status || 'pending'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center py-8">No orders yet</p>
                )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Link
                        to="/admin/products"
                        className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                        <Package className="w-5 h-5 text-blue-600 mr-3" />
                        <span className="font-medium text-blue-900">Add New Product</span>
                    </Link>
                    <Link
                        to="/admin/orders"
                        className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                    >
                        <ShoppingCart className="w-5 h-5 text-green-600 mr-3" />
                        <span className="font-medium text-green-900">Manage Orders</span>
                    </Link>
                    {user?.role === "SUPER_ADMIN" && (
                        <Link
                            to="/admin/users"
                            className="flex items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                        >
                            <Users className="w-5 h-5 text-red-600 mr-3" />
                            <span className="font-medium text-red-900">Manage Users</span>
                        </Link>
                    )}
                    <Link
                        to="/admin/checklist"
                        className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                    >
                        <Activity className="w-5 h-5 text-purple-600 mr-3" />
                        <span className="font-medium text-purple-900">System Check</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
