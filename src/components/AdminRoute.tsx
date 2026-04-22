import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Spinner } from "@/components/ui/spinner";

/**
 * AdminRoute — wraps any route that requires admin privileges.
 * Regular users are redirected to the home page.
 */
const AdminRoute = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spinner />
            </div>
        );
    }

    if (!user) return <Navigate to="/login" replace />;
    if (user.role !== "ADMIN") return <Navigate to="/" replace />;

    return <Outlet />;
};

export default AdminRoute;
