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
        const apiProducts = data.success && data.data ? data.data : [];
        
        // Always merge with seed products so the catalog stays full
        const seedResult = getLocalProducts(params);
        const seedProducts = seedResult.data || [];
        
        // Use a Set to avoid duplicates — API products take priority
        const seenIds = new Set(apiProducts.map(p => p._id));
        const merged = [
            ...apiProducts,
            ...seedProducts.filter(p => !seenIds.has(p._id)),
        ];
        
        return { success: true, data: merged, message: "Products fetched" };
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
