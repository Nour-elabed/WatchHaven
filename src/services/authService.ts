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
    api.post<ApiResponse<User>>("/users/login", payload);

export const register = (payload: RegisterPayload) =>
    api.post<ApiResponse<User>>("/users/register", payload);

export const getProfile = () =>
    api.get<ApiResponse<User>>("/users/profile");
