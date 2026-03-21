/**
 * CartContext — the single source of truth for cart state on the frontend.
 *
 * Hydration strategy:
 *  - Logged-in users  → load from DB on mount; sync every mutation to DB.
 *  - Guest users      → load/save to localStorage only.
 *  - On login         → DB is authoritative; local copy is replaced.
 *
 * Consumers: import { useCart } from "@/context/useCart"
 */
import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { useAuth } from "@/context/AuthContext";
import * as cartService from "@/lib/cartService";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export type CartContextType = {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  cartTotal: number;
  toggleCart: () => void;
  closeCart: () => void;
  addToCart: (product: Omit<CartItem, "quantity"> & { quantity?: number }) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const LS_KEY = "cart_items";

const loadFromLocalStorage = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveToLocalStorage = (items: CartItem[]) => {
  localStorage.setItem(LS_KEY, JSON.stringify(items));
};

const isLoggedIn = () => Boolean(localStorage.getItem("token"));

// ─── Context ──────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // ── Hydrate on mount and user change ─────────────────────────────────────────────
  useEffect(() => {
    const hydrate = async () => {
      if (user) {
        try {
          const { data } = await cartService.getCart();
          // data.items comes from MongoDB
          setItems(data.items ?? []);
        } catch {
          // Token may be stale — fall back to localStorage
          setItems(loadFromLocalStorage());
        }
      } else {
        setItems(loadFromLocalStorage());
      }
    };
    hydrate();
  }, [user]);

  // ── Keep localStorage in sync as a local cache ───────────────────────────
  useEffect(() => {
    saveToLocalStorage(items);
  }, [items]);

  // ── Derived totals (memoized to avoid recalculation on every render) ─────
  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const cartTotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );

  // ── Actions ──────────────────────────────────────────────────────────────

  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  /**
   * Add a product to the cart.
   * Optimistic update: update local state immediately, then sync to DB.
   */
  const addToCart = useCallback(
    async (product: Omit<CartItem, "quantity"> & { quantity?: number }) => {
      const qty = product.quantity ?? 1;

      // Optimistic local update
      setItems((prev) => {
        const existing = prev.find((i) => i.productId === product.productId);
        if (existing) {
          return prev.map((i) =>
            i.productId === product.productId
              ? { ...i, quantity: i.quantity + qty }
              : i
          );
        }
        return [...prev, { ...product, quantity: qty }];
      });

      // Sync with DB if logged in
      if (isLoggedIn()) {
        try {
          await cartService.addItem({
            productId: product.productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: qty,
          });
        } catch (err) {
          console.error("addToCart sync error:", err);
        }
      }
    },
    []
  );

  /**
   * Remove a product from the cart by productId.
   */
  const removeFromCart = useCallback(async (productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));

    if (isLoggedIn()) {
      try {
        await cartService.removeItem(productId);
      } catch (err) {
        console.error("removeFromCart sync error:", err);
      }
    }
  }, []);

  /**
   * Set the exact quantity for a cart item.
   * Quantity < 1 removes the item instead.
   */
  const updateQuantity = useCallback(
    async (productId: string, quantity: number) => {
      if (quantity < 1) {
        return removeFromCart(productId);
      }

      setItems((prev) =>
        prev.map((i) =>
          i.productId === productId ? { ...i, quantity } : i
        )
      );

      if (isLoggedIn()) {
        try {
          await cartService.updateItem(productId, quantity);
        } catch (err) {
          console.error("updateQuantity sync error:", err);
        }
      }
    },
    [removeFromCart]
  );

  /**
   * Clear all items from the cart.
   */
  const clearCart = useCallback(async () => {
    setItems([]);

    if (isLoggedIn()) {
      try {
        await cartService.clearCart();
      } catch (err) {
        console.error("clearCart sync error:", err);
      }
    }
  }, []);

  // ─────────────────────────────────────────────────────────────────────────

  const value = useMemo<CartContextType>(
    () => ({
      items,
      isOpen,
      totalItems,
      cartTotal,
      toggleCart,
      closeCart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }),
    [
      items,
      isOpen,
      totalItems,
      cartTotal,
      toggleCart,
      closeCart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
