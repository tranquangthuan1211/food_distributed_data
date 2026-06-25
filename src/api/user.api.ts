import { apiPost } from "./api.request";

/**
 * User-facing API helpers (login / register).
 *
 * BE chỉ expose 2 endpoint cho user:
 *   - POST /api/users/register
 *   - POST /api/users/login
 *
 * Lưu ý: BE không có /api/users (GET all) hay /api/users/info.
 * Nếu sau này cần thêm endpoint, sửa ở đây và ở BE (controllers/userController.js).
 */

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

class UserApi {
  /** Đăng nhập — trả về { success, data: { token, user } } */
  async signIn(payload: LoginPayload): Promise<{ success: boolean; data: AuthResponse; message?: string }> {
    return await apiPost("/users/login", payload);
  }

  /** Đăng ký — BE trả về { success, data: user } (KHÔNG có token, cần login lại) */
  async signUp(payload: RegisterPayload): Promise<{ success: boolean; data: AuthUser; message?: string }> {
    return await apiPost("/users/register", payload);
  }
}

export default new UserApi();