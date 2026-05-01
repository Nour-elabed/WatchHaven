import axios from "axios";
import type { Product, ApiResponse } from "@/types";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000/api") + "/seller";

const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
};

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
    const { data } = await axios.get(`${API_URL}/products`, getAuthHeader());
    return data;
};

export const sellerCreateProduct = async (payload: any): Promise<ApiResponse<Product>> => {
    const { data } = await axios.post(`${API_URL}/products`, payload, getAuthHeader());
    return data;
};

export const sellerUpdateProduct = async (id: string, payload: any): Promise<ApiResponse<Product>> => {
    const { data } = await axios.put(`${API_URL}/products/${id}`, payload, getAuthHeader());
    return data;
};

export const sellerDeleteProduct = async (id: string): Promise<ApiResponse<void>> => {
    const { data } = await axios.delete(`${API_URL}/products/${id}`, getAuthHeader());
    return data;
};

export const sellerGetOrders = async (): Promise<ApiResponse<SellerOrder[]>> => {
    const { data } = await axios.get(`${API_URL}/orders`, getAuthHeader());
    return data;
};
