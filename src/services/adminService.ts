import api from "./api";
import type { ApiResponse, Order, Product, User } from "@/types";

export interface AdminProductPayload {
    name: string;
    brand: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    category: string;
    gender: string;
}

// Map Axios response to return Payload directly
export const adminGetProducts = () => api.get<ApiResponse<Product[]>>("/admin/products").then(res => res.data.data);
export const adminCreateProduct = (payload: AdminProductPayload) =>
    api.post<ApiResponse<Product>>("/admin/products", payload).then(res => res.data.data);
export const adminUpdateProduct = (id: string, payload: AdminProductPayload) =>
    api.put<ApiResponse<Product>>(`/admin/products/${id}`, payload).then(res => res.data.data);
export const adminDeleteProduct = (id: string) => api.delete<ApiResponse<null>>(`/admin/products/${id}`).then(res => res.data);

export const adminGetUsers = () => api.get<ApiResponse<User[]>>("/admin/users").then(res => res.data.data);
export const adminDeleteUser = (id: string) => api.delete<ApiResponse<null>>(`/admin/users/${id}`).then(res => res.data);
export const adminUpdateUserRole = (id: string, role: string) =>
    api.patch<ApiResponse<User>>(`/admin/users/${id}/role`, { role }).then(res => res.data.data);

export const adminGetOrders = () => api.get<ApiResponse<Order[]>>("/admin/orders").then(res => res.data.data);
export const adminUpdateOrderStatus = (id: string, status: Order["status"]) =>
    api.patch<ApiResponse<Order>>(`/admin/orders/${id}/status`, { status }).then(res => res.data.data);
