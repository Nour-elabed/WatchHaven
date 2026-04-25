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

// NOTE: Products API returns { success, data: Product[], pagination }
// We return the raw ApiResponse here because components might need pagination info
export const getProducts = (params?: GetProductsParams) =>
    api.get<ApiResponse<Product[]>>("/products", { params }).then(res => res.data);

export const getProductById = (id: string) =>
    api.get<ApiResponse<Product>>(`/products/${id}`).then(res => res.data.data);
