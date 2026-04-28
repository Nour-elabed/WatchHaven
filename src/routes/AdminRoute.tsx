import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Spinner } from "@/components/ui/spinner";
import { ROLES } from "@/types";

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
    if (user.role !== ROLES.ADMIN && user.role !== ROLES.SUPER_ADMIN) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
};

export default AdminRoute;
