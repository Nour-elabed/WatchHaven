import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Product } from "@/types";
import {
    adminCreateProduct,
    adminDeleteProduct,
    adminGetProducts,
    adminUpdateProduct,
    type AdminProductPayload,
} from "@/services/adminService";
import DataTable, { type Column } from "@/admin/components/DataTable";
import AdminModal from "@/admin/components/AdminModal";
import ProductForm from "@/admin/components/ProductForm";

const ManageProducts = () => {
    const queryClient = useQueryClient();
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const { data: products = [] } = useQuery({
        queryKey: ["admin", "products"],
        queryFn: async () => (await adminGetProducts()).data.data,
    });

    const refresh = () => queryClient.invalidateQueries({ queryKey: ["admin", "products"] });

    const createMutation = useMutation({
        mutationFn: (payload: AdminProductPayload) => adminCreateProduct(payload),
        onSuccess: async () => {
            toast.success("Product created");
            setIsCreateOpen(false);
            await refresh();
        },
        onError: () => toast.error("Failed to create product"),
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: AdminProductPayload }) => adminUpdateProduct(id, payload),
        onSuccess: async () => {
            toast.success("Product updated");
            setEditingProduct(null);
            await refresh();
        },
        onError: () => toast.error("Failed to update product"),
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => adminDeleteProduct(id),
        onSuccess: async () => {
            toast.success("Product deleted");
            await refresh();
        },
        onError: () => toast.error("Failed to delete product"),
    });

    const columns = useMemo<Column<Product>[]>(
        () => [
            { key: "title", header: "Title", render: (p) => p.title ?? p.name },
            { key: "price", header: "Price", render: (p) => `$${p.price.toFixed(2)}` },
            { key: "stock", header: "Stock", render: (p) => p.stock },
            { key: "category", header: "Category", render: (p) => p.category },
            {
                key: "actions",
                header: "Actions",
                render: (p) => (
                    <div className="flex gap-2">
                        <button
                            className="rounded bg-gray-100 px-3 py-1 text-xs"
                            type="button"
                            onClick={() => setEditingProduct(p)}
                        >
                            Edit
                        </button>
                        <button
                            className="rounded bg-red-100 px-3 py-1 text-xs text-red-700"
                            type="button"
                            onClick={() => deleteMutation.mutate(p._id)}
                        >
                            Delete
                        </button>
                    </div>
                ),
            },
        ],
        [deleteMutation]
    );

    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Manage Products</h1>
                <button type="button" className="rounded bg-black px-4 py-2 text-sm text-white" onClick={() => setIsCreateOpen(true)}>
                    Add Product
                </button>
            </div>
            <DataTable columns={columns} rows={products} emptyText="No products found." />

            <AdminModal title="Create Product" isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)}>
                <ProductForm
                    onSubmit={async (payload) => {
                        await createMutation.mutateAsync(payload);
                    }}
                />
            </AdminModal>

            <AdminModal title="Edit Product" isOpen={Boolean(editingProduct)} onClose={() => setEditingProduct(null)}>
                <ProductForm
                    initialValue={editingProduct}
                    onSubmit={async (payload) => {
                        if (!editingProduct) return;
                        await updateMutation.mutateAsync({ id: editingProduct._id, payload });
                    }}
                />
            </AdminModal>
        </section>
    );
};

export default ManageProducts;
