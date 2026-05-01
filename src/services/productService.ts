import api from "./api";
import type { Product, ApiResponse } from "@/types";

export interface GetProductsParams {
    category?: string;
    brand?: string;
    gender?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    sort?: string;
    page?: number;
    limit?: number;
}

export const getProducts = async (params?: GetProductsParams): Promise<ApiResponse<Product[]>> => {
    const { data } = await api.get<ApiResponse<Product[]>>("/products", { params });
    return data;
};

export const getProductById = async (id: string): Promise<Product> => {
    const { data } = await api.get<ApiResponse<Product>>(`/products/${id}`);
    return data.data;
};
