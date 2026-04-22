import { useState } from "react";
import type { Product } from "@/types";
import type { AdminProductPayload } from "@/services/adminService";

interface ProductFormProps {
    initialValue?: Product | null;
    onSubmit: (payload: AdminProductPayload) => Promise<void>;
}

const ProductForm = ({ initialValue, onSubmit }: ProductFormProps) => {
    const [form, setForm] = useState<AdminProductPayload>({
        title: initialValue?.title ?? initialValue?.name ?? "",
        description: initialValue?.description ?? "",
        price: initialValue?.price ?? 0,
        stock: initialValue?.stock ?? 0,
        image: initialValue?.image ?? "",
        category: initialValue?.category ?? "Electronics",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const update = (key: keyof AdminProductPayload, value: string | number) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onSubmit(form);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <input
                className="w-full rounded border px-3 py-2"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="Product title"
                required
            />
            <textarea
                className="w-full rounded border px-3 py-2"
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="Description"
                required
            />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input
                    className="rounded border px-3 py-2"
                    type="number"
                    min={0}
                    step="0.01"
                    value={form.price}
                    onChange={(e) => update("price", Number(e.target.value))}
                    placeholder="Price"
                    required
                />
                <input
                    className="rounded border px-3 py-2"
                    type="number"
                    min={0}
                    value={form.stock}
                    onChange={(e) => update("stock", Number(e.target.value))}
                    placeholder="Stock"
                    required
                />
            </div>
            <input
                className="w-full rounded border px-3 py-2"
                value={form.image}
                onChange={(e) => update("image", e.target.value)}
                placeholder="Image URL"
                required
            />
            <select
                className="w-full rounded border px-3 py-2"
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
            >
                {["Electronics", "Clothing", "Accessories", "Home", "Sports", "Beauty"].map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded bg-black px-4 py-2 text-white disabled:opacity-60"
            >
                {isSubmitting ? "Saving..." : "Save Product"}
            </button>
        </form>
    );
};

export default ProductForm;
