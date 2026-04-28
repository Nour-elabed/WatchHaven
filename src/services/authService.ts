import api from "./api";
import type { User, ApiResponse } from "@/types";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    username: string;
    email: string;
    password: string;
}

export interface UpdateProfilePayload {
    username?: string;
    email?: string;
    password?: string;
}

export const login = (payload: LoginPayload): Promise<User> =>
    api.post<ApiResponse<User>>("/auth/login", payload).then((res) => res.data.data);

export const register = (payload: RegisterPayload): Promise<User> =>
    api.post<ApiResponse<User>>("/auth/register", payload).then((res) => res.data.data);

export const getProfile = (): Promise<User> =>
    api.get<ApiResponse<User>>("/auth/profile").then((res) => res.data.data);

export const updateProfile = (payload: UpdateProfilePayload): Promise<User> =>
    api.put<ApiResponse<User>>("/auth/profile", payload).then((res) => res.data.data);
