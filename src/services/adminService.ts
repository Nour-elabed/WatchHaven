import api from "./api";
import type { ApiResponse, DashboardStats, Order, Product, Role, User } from "@/types";

// Dashboard
export const getStats = (): Promise<DashboardStats> =>
    api.get<ApiResponse<DashboardStats>>("/admin/stats").then((res) => res.data.data);

export interface AdminProductPayload {
    name: string;
    brand: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    category: string;
    gender: string;
    style?: string;
    tags?: string[];
}

// Products
export const adminGetProducts = (): Promise<Product[]> =>
    api.get<ApiResponse<Product[]>>("/admin/products").then((res) => res.data.data);
export const adminCreateProduct = (payload: AdminProductPayload): Promise<Product> =>
    api.post<ApiResponse<Product>>("/admin/products", payload).then((res) => res.data.data);
export const adminUpdateProduct = (id: string, payload: AdminProductPayload): Promise<Product> =>
    api.put<ApiResponse<Product>>(`/admin/products/${id}`, payload).then((res) => res.data.data);
export const adminDeleteProduct = (id: string): Promise<void> =>
    api.delete(`/admin/products/${id}`).then(() => undefined);

// Users (super-admin only)
export const getAllUsers = (): Promise<User[]> =>
    api.get<ApiResponse<User[]>>("/admin/users").then((res) => res.data.data);
export const getUserById = (id: string): Promise<User> =>
    api.get<ApiResponse<User>>(`/admin/users/${id}`).then((res) => res.data.data);
export const updateUserRole = (id: string, role: Role): Promise<User> =>
    api.put<ApiResponse<User>>(`/admin/users/${id}/role`, { role }).then((res) => res.data.data);
export const deleteUser = (id: string): Promise<void> =>
    api.delete(`/admin/users/${id}`).then(() => undefined);

// Orders
export const adminGetOrders = (): Promise<Order[]> =>
    api.get<ApiResponse<Order[]>>("/admin/orders").then((res) => res.data.data);
export const adminUpdateOrderStatus = (id: string, status: Order["status"]): Promise<Order> =>
    api.patch<ApiResponse<Order>>(`/admin/orders/${id}/status`, { status }).then((res) => res.data.data);

