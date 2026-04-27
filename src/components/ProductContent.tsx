import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useCart } from "@/context/useCart";
import type { Product } from "@/types";

const ProductContent = ({ product }: { product: Product }) => {
    const { addToCart, toggleCart } = useCart();
    const images = useMemo(() => [product.image, product.image, product.image], [product.image]);
    const [currentImage, setCurrentImage] = useState(images[0]);
    const [qty, setQty] = useState(1);

    const canAdd = product.stock > 0;

    const handleAddToCart = async () => {
        if (!canAdd) {
            toast.error("Out of stock");
            return;
        }
        await addToCart({
            productId: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: qty,
        });
        toast.success(`${product.name} added to cart!`);
        toggleCart();
    };
    return (
    <div className="p-4 lg:p-16">
        <div className="grid grid-cols-1 lg:grid-cols-2  gap-8">
        <div className="flex flex-col py-2 lg:flex-row lg:items-start gap-4 ">
            <div className="flex order-1 mt-2 lg:mt-12 gap-3 ml-4  lg:flex-col lg:order-none lg:gap-8">
            {images.map((img) => (
                <img
                key={img}
                src={img}
                onClick={() => setCurrentImage(img)}
                className={`
                    w-20 h-20 object-cover rounded-md cursor-pointer transition
                    ${currentImage === img ? "ring-2 ring-blue-400" : "ring-0"}
                `}
                />
            ))}
            </div>
            <div className="relative flex-1 mt-18  lg:mt-10 mx-auto bg-gray-100 rounded-2xl overflow-hidden w-[350px] lg:max-w-[500px]">
    <img
    src={currentImage}
    className="w-full h-[350px] lg:h-[430px] object-cover"
    />
    <div className="flex flex-col gap-2">
       <Link to="/shop">
    <button className="rounded-full px-4 py-2 top-2 left-2 bg-white absolute flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
        <img src="/assets/icons/new.svg" alt="new" />
        <span className="font-semibold">Back to shop</span>
    </button>
</Link>

<button type="button" onClick={toggleCart} aria-label="Open cart">
    <img 
        src="/assets/icons/cart-btn.svg"
        alt="cart"
        className="absolute top-2 right-2 w-10 h-10 cursor-pointer"
    />
</button>
    </div>
    </div>
        </div>
        <div className="bg-white shadow-sm mt-10 rounded-2xl p-6 text-gray-900">
            <div className="space-y-4">
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">{product.brand}</p>
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{product.description}</p>
                </div>

                <div className="flex items-center justify-between border-t pt-4">
                    <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                    <span className="text-sm font-semibold text-muted-foreground">
                        Category: {product.gender}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">Quantity</span>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            className="w-8 h-8 rounded-full border hover:bg-gray-50 disabled:opacity-50"
                            onClick={() => setQty((p) => Math.max(1, p - 1))}
                            disabled={qty <= 1}
                        >
                            -
                        </button>
                        <span className="w-8 text-center font-semibold">{qty}</span>
                        <button
                            type="button"
                            className="w-8 h-8 rounded-full border hover:bg-gray-50 disabled:opacity-50"
                            onClick={() => setQty((p) => Math.min(product.stock, p + 1))}
                            disabled={!canAdd || qty >= product.stock}
                        >
                            +
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Stock</span>
                    <span className="font-semibold">{product.stock > 0 ? product.stock : "Out of stock"}</span>
                </div>

                <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={!canAdd}
                    className="w-full bg-black text-white font-semibold py-3 rounded-full hover:bg-gray-800 disabled:opacity-60"
                >
                    Add to cart
                </button>
            </div>
            <div className="mt-8 flex justify-center">
                <Link to="/shop" className="w-full">
                    <button className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border-2 border-black text-black font-semibold hover:bg-black hover:text-white transition-all w-full cursor-pointer group shadow-sm active:scale-95 duration-200">
                        Continue Shopping
                    </button>
                </Link>
            </div>
        </div>
        </div>
        
    </div>
    );
};
export default ProductContent;
