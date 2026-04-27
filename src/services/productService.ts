import { getMockProducts, getMockProductById } from "@/data/mockProducts";
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

// Using mock data for development - replace with API calls when backend is ready
export const getProducts = async (params?: GetProductsParams): Promise<ApiResponse<Product[]>> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return getMockProducts(params);
};

export const getProductById = async (id: string): Promise<Product> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    const response = getMockProductById(id);
    return response.data;
};
