import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { User } from "@/types";
import { adminDeleteUser, adminGetUsers, adminUpdateUserRole } from "@/services/adminService";
import DataTable, { type Column } from "@/admin/components/DataTable";

const ManageUsers = () => {
    const queryClient = useQueryClient();
    const { data: users = [] } = useQuery({
        queryKey: ["admin", "users"],
        queryFn: async () => (await adminGetUsers()).data.data,
    });

    const refresh = () => queryClient.invalidateQueries({ queryKey: ["admin", "users"] });

    const roleMutation = useMutation({
        mutationFn: ({ id, role }: { id: string; role: "USER" | "ADMIN" }) => adminUpdateUserRole(id, role),
        onSuccess: async () => {
            toast.success("Role updated");
            await refresh();
        },
        onError: () => toast.error("Failed to update role"),
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => adminDeleteUser(id),
        onSuccess: async () => {
            toast.success("User deleted");
            await refresh();
        },
        onError: () => toast.error("Failed to delete user"),
    });

    const columns = useMemo<Column<User>[]>(
        () => [
            { key: "username", header: "Username", render: (u) => u.username },
            { key: "email", header: "Email", render: (u) => u.email },
            { key: "role", header: "Role", render: (u) => u.role },
            {
                key: "actions",
                header: "Actions",
                render: (u) => (
                    <div className="flex gap-2">
                        <button
                            type="button"
                            className="rounded bg-gray-100 px-3 py-1 text-xs"
                            disabled={u.role === "SUPER_ADMIN"}
                            onClick={() => roleMutation.mutate({ id: u._id, role: u.role === "ADMIN" ? "USER" : "ADMIN" })}
                        >
                            {u.role === "SUPER_ADMIN" ? "Protected" : "Toggle Role"}
                        </button>
                        <button
                            type="button"
                            className="rounded bg-red-100 px-3 py-1 text-xs text-red-700"
                            disabled={u.role === "SUPER_ADMIN"}
                            onClick={() => deleteMutation.mutate(u._id)}
                        >
                            {u.role === "SUPER_ADMIN" ? "Protected" : "Delete"}
                        </button>
                    </div>
                ),
            },
        ],
        [deleteMutation, roleMutation]
    );

    return (
        <section className="space-y-4">
            <h1 className="text-2xl font-bold">Manage Users</h1>
            <DataTable columns={columns} rows={users} emptyText="No users found." />
        </section>
    );
};

export default ManageUsers;
