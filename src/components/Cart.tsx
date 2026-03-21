import { useState } from "react";
import { useCart } from "@/context/useCart";
import { toast } from "sonner";

const Cart = ({ product }: { product: any }) => {
  const { addToCart, toggleCart } = useCart();

  const sizes = ["S", "M", "L", "XL", "2XL"];
  const [selected, setSelected] = useState(sizes[0]);
  const [count, setCount] = useState(1);

  const numericPrice = parseFloat(product.price.replace(/[^0-9.]/g, ""));
  const subtotal = numericPrice * count;
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const handleDecrement = () => setCount((prev) => Math.max(1, prev - 1));
  const handleIncrement = () => setCount((prev) => prev + 1);

  const handleAddToCart = async () => {
    const finalProduct = {
      productId: String(product.id) + "-" + selected,
      name: `${product.description} (Size: ${selected})`,
      price: numericPrice,
      image: product.image,
      quantity: count
    };
    await addToCart(finalProduct);
    toast.success(`${finalProduct.name} added to cart!`);
    toggleCart(); // open the drawer immediately so user sees confirmation
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <img
            src="/assets/icons/star.svg"
            className="w-4 h-4"
            alt="Star rating icon"
          />
          <span className="text-gray-500 text-sm font-semibold underline">
            4.9 - 142 reviews
          </span>
        </div>

        <div className="flex flex-col items-end gap-1">
          <span className="text-md font-semibold">
            ${subtotal.toFixed(2)}
          </span>
          <span className="text-sm text-gray-400 line-through">
            ${(subtotal * 1.15).toFixed(2)}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <span className="text-sm font-semibold">Size : {selected}</span>

        <div className="flex gap-3">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelected(size)}
              className={`
                w-12 h-8 border rounded-md text-gray-600
                flex items-center justify-center
                transition-colors duration-150
                ${selected === size
                  ? "bg-blue-400 text-white font-semibold border-blue-500"
                  : "border-gray-300 hover:border-gray-500"
                }
              `}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:flex sm:items-center sm:justify-between mt-4">
        <div className="bg-gray-100 flex items-center px-2 py-1 rounded-full w-full sm:w-28 justify-between">
          <button
            onClick={handleDecrement}
            className="bg-white rounded-full border w-6 h-6 text-sm font-semibold"
          >
            -
          </button>

          <span className="font-semibold text-sm">{count}</span>

          <button
            onClick={handleIncrement}
            className="bg-white rounded-full border w-6 h-6 text-sm font-semibold"
          >
            +
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          className="
            flex items-center justify-center gap-2
            rounded-full
            px-6 py-2
            sm:px-6 sm:py-2.5
            bg-black text-white text-sm font-semibold
            shadow-md
            active:scale-95
            sm:hover:bg-black/80 sm:hover:shadow-lg sm:hover:scale-105
            transition-all duration-200
          "
        >
          <img
            src="/assets/icons/path.svg"
            alt="cart"
            className="w-4 h-4"
          />
          Add to cart
        </button>
      </div>

      <div className="hidden md:block mt-6 rounded-lg border p-4 text-sm space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-500">Quantity</span>
          <span className="font-semibold">{count}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Tax (8%)</span>
          <span className="font-semibold">${tax.toFixed(2)}</span>
        </div>

        <div className="border-t my-2" />

        <div className="flex justify-between text-base">
          <span className="font-semibold">Total</span>
          <span className="font-bold">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
