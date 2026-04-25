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

export interface PaginatedProducts {
    products: Product[];
    pagination: {
        total: number;
        page: number;
        pages: number;
    };
}

export const getProducts = (params?: GetProductsParams) =>
    api.get<ApiResponse<Product[]>>("/products", { params });

export const getProductById = (id: string) =>
    api.get<ApiResponse<Product>>(`/products/${id}`);
