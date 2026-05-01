import api from "./api";
import type { Product, ApiResponse } from "@/types";
import { getLocalProducts, getLocalProductById } from "@/data/localProducts";

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
    try {
        const { data } = await api.get<ApiResponse<Product[]>>("/products", { params });
        
        // If API succeeds but returns empty data, fallback to seed products
        if (data.success && (!data.data || data.data.length === 0)) {
            console.warn("API returned empty products, falling back to seed data");
            return getLocalProducts(params);
        }
        
        return data;
    } catch (error) {
        console.error("API fetch failed, falling back to seed data:", error);
        return getLocalProducts(params);
    }
};

export const getProductById = async (id: string): Promise<Product> => {
    try {
        const { data } = await api.get<ApiResponse<Product>>(`/products/${id}`);
        return data.data;
    } catch (error) {
        console.error(`API fetch for product ${id} failed, falling back to seed data:`, error);
        const local = getLocalProductById(id);
        return local.data;
    }
};
