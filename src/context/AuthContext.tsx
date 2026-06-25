import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { authStorage } from "../utils/auth-storage";
import UserApi, { type AuthUser, type LoginPayload, type RegisterPayload } from "../api/user.api";

// ====== Types ======
interface AuthState {
  user: AuthUser | null;
  token: string | null;
  loading: boolean; // đang gọi login/register
  error: string | null;
}

interface AuthContextValue extends AuthState {
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<AuthUser>;
  logout: () => void;
}

// ====== Context ======
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ====== Provider ======
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    loading: false,
    error: null,
  });

  // Rehydrate từ localStorage khi mount ở client
  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = authStorage.getToken();
    const user = authStorage.getUser<AuthUser>();
    if (token && user) {
      setState((s) => ({ ...s, token, user }));
    }
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const res = await UserApi.signIn(payload);
      if (!res?.success || !res?.data?.token) {
        throw new Error(res?.message || "Đăng nhập thất bại");
      }
      const { token, user } = res.data;
      authStorage.setToken(token);
      authStorage.setUser(user);
      setState({ user, token, loading: false, error: null });
    } catch (err: any) {
      setState((s) => ({ ...s, loading: false, error: err?.message || "Đăng nhập thất bại" }));
      throw err;
    }
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const res = await UserApi.signUp(payload);
      if (!res?.success || !res?.data) {
        throw new Error(res?.message || "Đăng ký thất bại");
      }
      // BE không trả token khi register → user phải login thủ công sau đó
      setState((s) => ({ ...s, loading: false }));
      return res.data;
    } catch (err: any) {
      setState((s) => ({ ...s, loading: false, error: err?.message || "Đăng ký thất bại" }));
      throw err;
    }
  }, []);

  const logout = useCallback(() => {
    authStorage.clear();
    setState({ user: null, token: null, loading: false, error: null });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      isAuthenticated: !!state.token && !!state.user,
      login,
      register,
      logout,
    }),
    [state, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ====== Hook ======
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth phải được dùng bên trong <AuthProvider>");
  }
  return ctx;
}