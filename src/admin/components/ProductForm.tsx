import { useState } from "react";
import type { Product } from "@/types";
import type { AdminProductPayload } from "@/services/adminService";

interface ProductFormProps {
    initialValue?: Product | null;
    onSubmit: (payload: AdminProductPayload) => Promise<void>;
}

const ProductForm = ({ initialValue, onSubmit }: ProductFormProps) => {
    const [form, setForm] = useState<AdminProductPayload>({
        name: initialValue?.name ?? "",
        brand: initialValue?.brand ?? "",
        description: initialValue?.description ?? "",
        price: initialValue?.price ?? 0,
        stock: initialValue?.stock ?? 0,
        image: initialValue?.image ?? "",
        category: initialValue?.category ?? "Classic",
        gender: initialValue?.gender ?? "UNISEX",
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

    const categories = ["Luxury", "Sport", "Classic", "Smart", "Minimalist"];
    const genders = ["MEN", "WOMEN", "UNISEX"];

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Product Name</label>
                  <input
                      className="w-full input-field py-2"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="e.g. Submariner"
                      required
                  />
               </div>
               <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Brand</label>
                  <input
                      className="w-full input-field py-2"
                      value={form.brand}
                      onChange={(e) => update("brand", e.target.value)}
                      placeholder="e.g. Rolex"
                      required
                  />
               </div>
            </div>

            <div className="space-y-1">
               <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Description</label>
               <textarea
                   className="w-full input-field py-2 min-h-[100px]"
                   value={form.description}
                   onChange={(e) => update("description", e.target.value)}
                   placeholder="Detailed product information..."
                   required
               />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                   <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Price ($)</label>
                   <input
                       className="w-full input-field py-2"
                       type="number"
                       min={0}
                       step="0.01"
                       value={form.price}
                       onChange={(e) => update("price", Number(e.target.value))}
                       required
                   />
                </div>
                <div className="space-y-1">
                   <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Stock</label>
                   <input
                       className="w-full input-field py-2"
                       type="number"
                       min={0}
                       value={form.stock}
                       onChange={(e) => update("stock", Number(e.target.value))}
                       required
                   />
                </div>
            </div>

            <div className="space-y-1">
               <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Image URL</label>
               <input
                   className="w-full input-field py-2"
                   value={form.image}
                   onChange={(e) => update("image", e.target.value)}
                   placeholder="https://images.unsplash.com/..."
                   required
               />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                   <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Style Category</label>
                   <select
                       className="w-full input-field py-2 appearance-none"
                       value={form.category}
                       onChange={(e) => update("category", e.target.value)}
                   >
                       {categories.map((cat) => (
                           <option key={cat} value={cat}>{cat}</option>
                       ))}
                   </select>
                </div>
                <div className="space-y-1">
                   <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Gender</label>
                   <select
                       className="w-full input-field py-2 appearance-none"
                       value={form.gender}
                       onChange={(e) => update("gender", e.target.value)}
                   >
                       {genders.map((g) => (
                           <option key={g} value={g}>{g}</option>
                       ))}
                   </select>
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary mt-4 py-3"
            >
                {isSubmitting ? "Saving..." : "Save Product"}
            </button>
        </form>
    );
};

export default ProductForm;
