import { getLocalProducts, getLocalProductById } from "@/data/localProducts";
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

// Using local products with your watch photos - replace with API calls when backend is ready
export const getProducts = async (params?: GetProductsParams): Promise<ApiResponse<Product[]>> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return getLocalProducts(params);
};

export const getProductById = async (id: string): Promise<Product> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    const response = getLocalProductById(id);
    return response.data;
};
