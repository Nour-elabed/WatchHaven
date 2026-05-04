import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/useCart";
import { ShoppingCart, X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

const TAX_RATE = 0.08; // 8% — adjust as needed

const CartDrawer = () => {
    const navigate = useNavigate();
    const {
        items,
        isOpen,
        closeCart,
        cartTotal,
        totalItems,
        updateQuantity,
        removeFromCart,
        clearCart,
    } = useCart();

    const drawerRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
                closeCart();
            }
        };
        if (isOpen) {
            // Small delay to prevent immediate close on the toggle button click
            const t = setTimeout(() => document.addEventListener("mousedown", handleClickOutside), 100);
            return () => {
                clearTimeout(t);
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [isOpen, closeCart]);

    // Prevent body scroll while drawer is open
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    const tax = cartTotal * TAX_RATE;
    const total = cartTotal + tax;

    return (
        <>
            {/* ── Backdrop ── */}
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
            />

            {/* ── Drawer Panel ── */}
            <div
                ref={drawerRef}
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <ShoppingCart size={20} className="text-gray-700" />
                        <h2 className="text-lg font-bold text-gray-900">Your Cart</h2>
                        {totalItems > 0 && (
                            <span className="ml-1 bg-black text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {totalItems}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={closeCart}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Close cart"
                    >
                        <X size={18} className="text-gray-600" />
                    </button>
                </div>

                {/* ── Items List ── */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                    {items.length === 0 ? (
                        /* Empty State */
                        <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                            <div className="rounded-full bg-gray-100 p-6">
                                <ShoppingBag size={40} className="text-gray-300" />
                            </div>
                            <p className="text-gray-500 font-medium">Your cart is empty</p>
                            <p className="text-sm text-gray-400">Add some products to get started!</p>
                            <button
                                onClick={() => { closeCart(); navigate('/shop'); }}
                                className="mt-2 bg-black text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-800 active:scale-95 transition-all duration-200"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div
                                key={item.productId}
                                className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors"
                            >
                                {/* Product image */}
                                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <ShoppingBag size={20} className="text-gray-300" />
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
                                    <p className="text-sm text-gray-500 font-medium mt-0.5">
                                        ${item.price.toFixed(2)}
                                    </p>

                                    {/* Quantity controls */}
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="flex items-center bg-gray-100 rounded-full px-2 py-0.5 gap-2">
                                            <button
                                                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                                className="w-5 h-5 flex items-center justify-center rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus size={10} />
                                            </button>
                                            <span className="text-sm font-semibold w-5 text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                                className="w-5 h-5 flex items-center justify-center rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                                                aria-label="Increase quantity"
                                            >
                                                <Plus size={10} />
                                            </button>
                                        </div>
                                        <span className="text-sm font-bold text-gray-800">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                {/* Remove */}
                                <button
                                    onClick={() => removeFromCart(item.productId)}
                                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                                    aria-label={`Remove ${item.name}`}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* ── Order Summary Footer (only when items exist) ── */}
                {items.length > 0 && (
                    <div className="border-t border-gray-100 px-6 py-5 space-y-3 bg-gray-50">
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between text-gray-500">
                                <span>Subtotal</span>
                                <span className="font-medium text-gray-800">${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <span>Tax (8%)</span>
                                <span className="font-medium text-gray-800">${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-base text-gray-900 border-t border-gray-200 pt-2 mt-2">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <button
                            onClick={() => {
                                closeCart();
                                navigate('/checkout');
                            }}
                            className="w-full bg-black text-white font-semibold py-3 rounded-full hover:bg-gray-800 active:scale-95 transition-all duration-200 text-sm"
                        >
                            Proceed to Checkout
                        </button>
                        <div className="flex gap-2">
                            <button
                                onClick={() => { closeCart(); navigate('/shop'); }}
                                className="flex-1 border border-gray-300 text-gray-700 font-medium py-2.5 rounded-full hover:bg-gray-100 transition-colors text-sm"
                            >
                                Continue Shopping
                            </button>
                            <button
                                onClick={clearCart}
                                className="flex-1 border border-red-200 text-red-500 font-medium py-2.5 rounded-full hover:bg-red-50 transition-colors text-sm"
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartDrawer;
