/**
 * Centralized cart service — all cart API calls go through here.
 * Uses the shared `api` Axios instance (auto-auth, interceptors).
 */
import api from "@/services/api";
export type CartItemPayload = {
    productId: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
};

export const getCart = () =>
    api.get<{ items: CartItemPayload[] }>("/cart");

export const addItem = (payload: CartItemPayload) =>
    api.post<{ items: CartItemPayload[] }>("/cart", payload);

export const updateItem = (productId: string, quantity: number) =>
    api.put<{ items: CartItemPayload[] }>(`/cart/${productId}`, { quantity });

export const removeItem = (productId: string) =>
    api.delete<{ items: CartItemPayload[] }>(`/cart/${productId}`);

export const clearCart = () =>
    api.delete<object>("/cart");
