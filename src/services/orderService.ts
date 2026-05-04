import api from "./api";
import type { Order, ApiResponse, ShippingAddress } from "@/types";

export interface CreateOrderPayload {
    orderItems: any[];
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    itemsPrice: number;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
}

export const createOrder = (payload: CreateOrderPayload) =>
    api.post<ApiResponse<Order>>("/orders", payload).then(res => res.data.data);

export const getUserOrders = () =>
    api.get<ApiResponse<Order[]>>("/orders/my").then(res => res.data.data);

export const getOrderById = (id: string) =>
    api.get<ApiResponse<Order>>(`/orders/${id}`).then(res => res.data.data);
