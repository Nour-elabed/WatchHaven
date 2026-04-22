import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Order, User } from "@/types";
import { adminGetOrders, adminUpdateOrderStatus } from "@/services/adminService";
import DataTable, { type Column } from "@/admin/components/DataTable";

const orderStatuses: Order["status"][] = ["pending", "shipped", "delivered", "canceled"];

const ManageOrders = () => {
    const queryClient = useQueryClient();
    const { data: orders = [] } = useQuery({
        queryKey: ["admin", "orders"],
        queryFn: async () => (await adminGetOrders()).data.data,
    });

    const refresh = () => queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });

    const updateStatusMutation = useMutation({
        mutationFn: ({ id, status }: { id: string; status: Order["status"] }) => adminUpdateOrderStatus(id, status),
        onSuccess: async () => {
            toast.success("Order status updated");
            await refresh();
        },
        onError: () => toast.error("Failed to update status"),
    });

    const columns = useMemo<Column<Order>[]>(
        () => [
            { key: "id", header: "Order", render: (o) => <span className="font-mono text-xs">{o._id}</span> },
            {
                key: "customer",
                header: "Customer",
                render: (o) => {
                    const orderUser = o.user as User;
                    return <span>{orderUser?.username ?? "Unknown"}</span>;
                },
            },
            { key: "total", header: "Total", render: (o) => `$${o.totalPrice.toFixed(2)}` },
            {
                key: "status",
                header: "Status",
                render: (o) => (
                    <select
                        className="rounded border px-2 py-1 text-xs"
                        value={o.status}
                        onChange={(e) =>
                            updateStatusMutation.mutate({ id: o._id, status: e.target.value as Order["status"] })
                        }
                    >
                        {orderStatuses.map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                ),
            },
        ],
        [updateStatusMutation]
    );

    return (
        <section className="space-y-4">
            <h1 className="text-2xl font-bold">Manage Orders</h1>
            <DataTable columns={columns} rows={orders} emptyText="No orders found." />
        </section>
    );
};

export default ManageOrders;
