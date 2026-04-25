import api from "./api";
import type { Order, ApiResponse, ShippingAddress, OrderItem } from "@/types";

export interface CreateOrderPayload {
    orderItems: OrderItem[];
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    totalPrice: number;
}

export const createOrder = (payload: CreateOrderPayload) =>
    api.post<ApiResponse<Order>>("/orders", payload).then(res => res.data.data);

export const getUserOrders = () =>
    api.get<ApiResponse<Order[]>>("/orders/my").then(res => res.data.data);

export const getOrderById = (id: string) =>
    api.get<ApiResponse<Order>>(`/orders/${id}`).then(res => res.data.data);
