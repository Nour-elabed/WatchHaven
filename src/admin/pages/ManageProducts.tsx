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
            { 
                key: "name", 
                header: "Product", 
                render: (p) => (
                    <div className="flex items-center gap-3">
                        <img src={p.image} className="w-10 h-10 object-cover rounded-lg" alt={p.name} />
                        <div>
                            <p className="font-bold text-sm">{p.name}</p>
                            <p className="text-[10px] uppercase font-bold text-muted-foreground">{p.brand}</p>
                        </div>
                    </div>
                ) 
            },
            { key: "price", header: "Price", render: (p) => `$${p.price.toLocaleString()}` },
            { key: "stock", header: "Stock", render: (p) => p.stock },
            { key: "category", header: "Category", render: (p) => p.category },
            { key: "gender", header: "Gender", render: (p) => p.gender },
            {
                key: "actions",
                header: "Actions",
                render: (p) => (
                    <div className="flex gap-2">
                        <button
                            className="bg-secondary text-secondary-foreground px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-border transition-colors"
                            type="button"
                            onClick={() => setEditingProduct(p)}
                        >
                            Edit
                        </button>
                        <button
                            className="bg-destructive/10 text-destructive px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-destructive hover:text-white transition-all"
                            type="button"
                            onClick={() => {
                                if(window.confirm(`Are you sure you want to delete ${p.name}?`)) {
                                    deleteMutation.mutate(p._id)
                                }
                            }}
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
        <section className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                   <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
                   <p className="text-muted-foreground text-sm">Add, remove, and update products in your store</p>
                </div>
                <button 
                  type="button" 
                  className="btn-primary" 
                  onClick={() => setIsCreateOpen(true)}
                >
                    Add New Product
                </button>
            </div>
            
            <div className="premium-card overflow-hidden">
                <DataTable columns={columns} rows={products} emptyText="No products found." />
            </div>

            <AdminModal title="Create New Product" isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)}>
                <ProductForm
                    onSubmit={async (payload) => {
                        await createMutation.mutateAsync(payload);
                    }}
                />
            </AdminModal>

            <AdminModal title={`Edit ${editingProduct?.name}`} isOpen={Boolean(editingProduct)} onClose={() => setEditingProduct(null)}>
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
