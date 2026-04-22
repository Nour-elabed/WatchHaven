import api from "./api";
import type { User, ApiResponse } from "@/types";

export interface LoginPayload {
    email: string;
    password: string;
    role?: "USER" | "ADMIN" | "SUPER_ADMIN";
}

export interface RegisterPayload {
    username: string;
    email: string;
    password: string;
}

export const login = (payload: LoginPayload) =>
    api.post<ApiResponse<User>>("/auth/login", payload);

export const register = (payload: RegisterPayload) =>
    api.post<ApiResponse<User>>("/auth/register", payload);

export const getProfile = () =>
    api.get<ApiResponse<User>>("/auth/profile");
