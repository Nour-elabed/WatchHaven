import api from "./api";
import type { ApiResponse, Order, Product, User } from "@/types";

export interface AdminProductPayload {
    title: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    category: string;
}

export const adminGetProducts = () => api.get<ApiResponse<Product[]>>("/admin/products");
export const adminCreateProduct = (payload: AdminProductPayload) =>
    api.post<ApiResponse<Product>>("/admin/products", payload);
export const adminUpdateProduct = (id: string, payload: AdminProductPayload) =>
    api.put<ApiResponse<Product>>(`/admin/products/${id}`, payload);
export const adminDeleteProduct = (id: string) => api.delete<ApiResponse<null>>(`/admin/products/${id}`);

export const adminGetUsers = () => api.get<ApiResponse<User[]>>("/admin/users");
export const adminDeleteUser = (id: string) => api.delete<ApiResponse<null>>(`/admin/users/${id}`);
export const adminUpdateUserRole = (id: string, role: "USER" | "ADMIN") =>
    api.patch<ApiResponse<User>>(`/admin/users/${id}/role`, { role });

export const adminGetOrders = () => api.get<ApiResponse<Order[]>>("/admin/orders");
export const adminUpdateOrderStatus = (id: string, status: Order["status"]) =>
    api.patch<ApiResponse<Order>>(`/admin/orders/${id}/status`, { status });
