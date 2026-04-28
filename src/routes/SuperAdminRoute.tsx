import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Spinner } from "@/components/ui/spinner";
import { ROLES } from "@/types";

const SuperAdminRoute = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spinner />
            </div>
        );
    }

    if (!user) return <Navigate to="/login" replace />;
    if (user.role !== ROLES.SUPER_ADMIN) return <Navigate to="/admin/dashboard" replace />;
    return <Outlet />;
};

export default SuperAdminRoute;
