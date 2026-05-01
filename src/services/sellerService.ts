import api from "./api";
import type { Product, ApiResponse } from "@/types";

export interface SellerOrder {
    _id: string;
    user: {
        username: string;
        email: string;
    };
    items: Array<{
        product: string;
        name: string;
        price: number;
        quantity: number;
        image?: string;
    }>;
    totalEarned: number;
    status: string;
    createdAt: string;
}

export const sellerGetProducts = async (): Promise<ApiResponse<Product[]>> => {
    const { data } = await api.get<ApiResponse<Product[]>>("/seller/products");
    return data;
};

export const sellerCreateProduct = async (payload: any): Promise<ApiResponse<Product>> => {
    const { data } = await api.post<ApiResponse<Product>>("/seller/products", payload);
    return data;
};

export const sellerUpdateProduct = async (id: string, payload: any): Promise<ApiResponse<Product>> => {
    const { data } = await api.put<ApiResponse<Product>>(`/seller/products/${id}`, payload);
    return data;
};

export const sellerDeleteProduct = async (id: string): Promise<ApiResponse<void>> => {
    const { data } = await api.delete<ApiResponse<void>>(`/seller/products/${id}`);
    return data;
};

export const sellerGetOrders = async (): Promise<ApiResponse<SellerOrder[]>> => {
    const { data } = await api.get<ApiResponse<SellerOrder[]>>("/seller/orders");
    return data;
};
