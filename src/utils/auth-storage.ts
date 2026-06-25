/**
 * auth-storage.ts
 * ----------------------------------------------------------------
 * Wrapper quanh localStorage để lưu token + user info.
 *
 * Lý do dùng localStorage thay vì cookies-next:
 *  - FE build bằng TanStack Start (Vite), không phải Next.js
 *  - cookies-next chỉ hoạt động đúng trong Next.js runtime
 *  - localStorage an toàn cho SPA, không cần SSR đụng tới
 *
 * Khi SSR (server render), `typeof window === 'undefined'`, mọi thao tác
 * trả về null / no-op để tránh crash.
 */

export const STORAGE_KEYS = {
  TOKEN: "token",
  USER: "user",
} as const;

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export const authStorage = {
  getToken(): string | null {
    if (!isBrowser()) return null;
    try {
      return window.localStorage.getItem(STORAGE_KEYS.TOKEN);
    } catch {
      return null;
    }
  },

  setToken(token: string): void {
    if (!isBrowser()) return;
    try {
      window.localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    } catch {
      // localStorage full / blocked — bỏ qua
    }
  },

  getUser<T = unknown>(): T | null {
    if (!isBrowser()) return null;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEYS.USER);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  },

  setUser(user: unknown): void {
    if (!isBrowser()) return;
    try {
      window.localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch {
      // ignore
    }
  },

  clear(): void {
    if (!isBrowser()) return;
    try {
      window.localStorage.removeItem(STORAGE_KEYS.TOKEN);
      window.localStorage.removeItem(STORAGE_KEYS.USER);
    } catch {
      // ignore
    }
  },
};