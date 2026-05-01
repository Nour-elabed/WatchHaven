
// ─── Roles ────────────────────────────────────────────────────────────────
export const ROLES = {
    USER: "USER",
    ADMIN: "ADMIN",
    SUPER_ADMIN: "SUPER_ADMIN",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

// ─── User ─────────────────────────────────────────────────────────────────
export interface User {
    id: string;
    username: string;
    email: string;
    role: Role;
    isAdmin: boolean;
    createdAt?: string;
    token?: string;
}

// ─── Product ──────────────────────────────────────────────────────────────
export interface Product {
    _id: string;
    name: string;
    brand: string;
    description: string;
    price: number;
    category: "Luxury" | "Sport" | "Classic" | "Smart" | "Minimalist";
    gender: "MEN" | "WOMEN" | "UNISEX";
    image: string;
    stock: number;
    rating: number;
    numReviews: number;
    tags?: string[];
    style?: string;
    seller?: {
        _id: string;
        username: string;
        email: string;
    };
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
    seller?: string;
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
    itemsPrice: number;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    isPaid: boolean;
    paidAt?: string;
    isDelivered: boolean;
    deliveredAt?: string;
    status: OrderStatus;
    createdAt: string;
}

// ─── Order Status ─────────────────────────────────────────────────────────
// Canonical statuses per spec. "canceled" (US spelling) is also accepted at
// runtime to remain compatible with documents written by older code.
export type OrderStatus =
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "canceled";

// ─── Dashboard ────────────────────────────────────────────────────────────
export interface RecentOrder {
    _id: string;
    user: { username: string };
    totalPrice: number;
    status: string;
    createdAt: string;
}

export interface DashboardStats {
    totalUsers: number;
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
    recentOrders: RecentOrder[];
    ordersByStatus: {
        pending: number;
        processing: number;
        shipped: number;
        delivered: number;
        cancelled: number;
    };
}

// ─── API Response Wrapper ─────────────────────────────────────────────────
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    pagination?: {
        total: number;
        page: number;
        pages: number;
    };
    message?: string;
}
