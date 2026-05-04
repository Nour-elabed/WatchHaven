import { useState } from "react";
import type { Product } from "@/types";
import type { AdminProductPayload } from "@/services/adminService";
import { Upload, X } from "lucide-react";

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
        style: initialValue?.style ?? "",
        tags: initialValue?.tags ?? [],
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [preview, setPreview] = useState<string | null>(initialValue?.image || null);

    const update = (key: keyof AdminProductPayload, value: string | number | string[]) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const compressImage = (file: File, maxWidth = 800, quality = 0.7): Promise<string> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            const url = URL.createObjectURL(file);
            img.onload = () => {
                URL.revokeObjectURL(url);
                const canvas = document.createElement("canvas");
                let { width, height } = img;
                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                if (!ctx) return reject(new Error("Canvas not supported"));
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL("image/jpeg", quality));
            };
            img.onerror = () => reject(new Error("Failed to load image"));
            img.src = url;
        });
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 10 * 1024 * 1024) {
            alert("Image must be under 10MB");
            return;
        }

        try {
            const compressed = await compressImage(file, 800, 0.7);
            setPreview(compressed);
            update("image", compressed);
        } catch {
            // Fallback to regular FileReader if compression fails
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setPreview(base64String);
                update("image", base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setPreview(null);
        update("image", "");
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
               <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Product Image</label>
               <div className="flex gap-4 items-start">
                  <div
                    className="flex-1 relative group cursor-pointer border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl hover:border-accent transition-all bg-gray-50 dark:bg-gray-800/50 overflow-hidden min-h-[120px] flex flex-col items-center justify-center p-4"
                    onClick={() => document.getElementById('image-upload')?.click()}
                  >
                    {preview ? (
                        <div className="w-full h-full absolute inset-0">
                            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <p className="text-white text-xs font-bold uppercase">Change Image</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <Upload className="text-gray-400 dark:text-gray-500 mb-2" size={24} />
                            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Click to upload</p>
                            <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">SVG, PNG, JPG (max 2MB)</p>
                        </>
                    )}
                    <input
                        id="image-upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                  </div>
                  {preview && (
                      <button
                        type="button"
                        onClick={removeImage}
                        className="p-2 bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 rounded-lg hover:bg-red-500 dark:hover:bg-red-600 hover:text-white transition-all"
                      >
                        <X size={18} />
                      </button>
                  )}
               </div>
               {/* Hidden fallback input for form requirement */}
               <input type="hidden" value={form.image} required />
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

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                   <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Style Description</label>
                   <input
                       className="w-full input-field py-2"
                       value={form.style}
                       onChange={(e) => update("style", e.target.value)}
                       placeholder="e.g. Vintage, Modern"
                   />
                </div>
                <div className="space-y-1">
                   <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Tags (comma separated)</label>
                   <input
                       className="w-full input-field py-2"
                       value={form.tags?.join(", ")}
                       onChange={(e) => update("tags", e.target.value.split(",").map(t => t.trim()))}
                       placeholder="e.g. rolex, dive, steel"
                   />
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
