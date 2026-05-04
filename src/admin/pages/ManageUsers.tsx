import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/context/AuthContext";
import {
    deleteUser as deleteUserApi,
    getAllUsers,
    updateUserRole as updateUserRoleApi,
} from "@/services/adminService";
import { ROLES, type Role, type User } from "@/types";

const ManageUsers = () => {
    const { user: currentUser } = useAuth();
    const queryClient = useQueryClient();

    const { data: users, isLoading, isError, error } = useQuery<User[]>({
        queryKey: ["admin-users"],
        queryFn: getAllUsers,
    });

    const roleMutation = useMutation({
        mutationFn: ({ id, role }: { id: string; role: Role }) => updateUserRoleApi(id, role),
        onSuccess: () => {
            toast.success("Role updated");
            queryClient.invalidateQueries({ queryKey: ["admin-users"] });
        },
        onError: (err: Error) => toast.error(err.message),
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteUserApi(id),
        onSuccess: () => {
            toast.success("User deleted");
            queryClient.invalidateQueries({ queryKey: ["admin-users"] });
        },
        onError: (err: Error) => toast.error(err.message),
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
                Failed to load users: {error instanceof Error ? error.message : "Unknown error"}
            </div>
        );
    }

    const handleRoleChange = (id: string, role: Role) => {
        roleMutation.mutate({ id, role });
    };

    const handleDelete = (u: User) => {
        if (window.confirm(`Delete user ${u.username}? This cannot be undone.`)) {
            deleteMutation.mutate(u.id);
        }
    };

    const formatDate = (iso?: string) => (iso ? new Date(iso).toLocaleDateString() : "—");

    const roleBadgeClass = (role: Role) => {
        if (role === ROLES.SUPER_ADMIN) return "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300";
        if (role === ROLES.ADMIN) return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300";
        return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300";
    };

    return (
        <section className="space-y-4">
            <header className="flex items-center justify-between flex-wrap gap-2">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Manage Users</h1>
                <span className="text-sm text-gray-500 dark:text-gray-400">{users?.length ?? 0} total</span>
            </header>

            <div className="overflow-x-auto rounded-lg border dark:border-gray-800">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800 text-sm">
                    <thead className="bg-gray-50 dark:bg-gray-800/50 text-left text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        <tr>
                            <th className="px-4 py-3">User</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Role</th>
                            <th className="px-4 py-3">Joined</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-card">
                        {users?.map((u) => {
                            const isCurrent = u.id === currentUser?.id;
                            const isSuper = u.role === ROLES.SUPER_ADMIN;
                            const isProtected = isCurrent || isSuper;

                            return (
                                <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 text-center text-xs font-bold leading-8 uppercase text-gray-700 dark:text-gray-300">
                                                {u.username?.charAt(0) ?? "?"}
                                            </div>
                                            <span className="font-medium text-gray-900 dark:text-gray-100">{u.username}</span>
                                            {isCurrent && (
                                                <span className="rounded bg-yellow-100 dark:bg-yellow-900/30 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-yellow-800 dark:text-yellow-300">
                                                    you
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{u.email}</td>
                                    <td className="px-4 py-3">
                                        {isProtected ? (
                                            <span className={`rounded-full px-2 py-1 text-xs font-medium ${roleBadgeClass(u.role)}`}>
                                                {u.role}
                                            </span>
                                        ) : (
                                            <select
                                                value={u.role}
                                                onChange={(e) => handleRoleChange(u.id, e.target.value as Role)}
                                                disabled={roleMutation.isPending}
                                                className="rounded border dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 px-2 py-1 text-xs"
                                            >
                                                <option value={ROLES.USER}>USER</option>
                                                <option value={ROLES.ADMIN}>ADMIN</option>
                                            </select>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{formatDate(u.createdAt)}</td>
                                    <td className="px-4 py-3 text-right">
                                        <button
                                            type="button"
                                            disabled={isProtected || deleteMutation.isPending}
                                            onClick={() => handleDelete(u)}
                                            className="rounded bg-red-50 dark:bg-red-900/20 px-3 py-1 text-xs font-medium text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 disabled:opacity-40 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        {users?.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default ManageUsers;
