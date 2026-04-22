// ─── User ─────────────────────────────────────────────────────────────────
export interface User {
    _id: string;
    username: string;
    email: string;
    role: "USER" | "ADMIN" | "SUPER_ADMIN";
    isAdmin: boolean;
    token: string;
}

// ─── Product ──────────────────────────────────────────────────────────────
export interface Product {
    _id: string;
    title: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    stock: number;
    rating: number;
    numReviews: number;
}

// ─── Cart ─────────────────────────────────────────────────────────────────
export interface CartItem {
    productId: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

// ─── Order ────────────────────────────────────────────────────────────────
export interface OrderItem {
    product: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

export interface ShippingAddress {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
}

export interface Order {
    _id: string;
    user: string | User;
    orderItems: OrderItem[];
    shippingAddress: ShippingAddress;
    paymentMethod: "Cash on Delivery" | "Card" | "PayPal";
    totalPrice: number;
    isPaid: boolean;
    paidAt?: string;
    isDelivered: boolean;
    deliveredAt?: string;
    status: "pending" | "shipped" | "delivered" | "canceled";
    createdAt: string;
}

// ─── API Response Wrapper ─────────────────────────────────────────────────
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
}
