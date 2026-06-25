import { authStorage } from "../utils/auth-storage";

// Base URL — Vite proxy "/api" → http://localhost:3000 (xem vite.config.ts).
// Khi build production, set VITE_API_BASE_URL trong .env để trỏ thẳng BE.
const API_HOST = "/api";

// --------- Helpers ---------
export const getFormData = (data: { [name: string]: any }): FormData => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    const value = data[key];
    if (Array.isArray(value)) {
      value.forEach((v) => formData.append(key, v));
    } else if (typeof value != "undefined" && value != "") {
      formData.append(key, value);
    }
  });
  return formData;
};

const getRequestHeaders = async (
  _method: string,
  isFormData?: boolean
): Promise<Headers> => {
  const headers = new Headers();
  const token = authStorage.getToken();
  if (token) {
    headers.append("Authorization", "Bearer " + token);
  }
  if (!isFormData) {
    headers.append("Content-Type", "application/json");
  }
  return headers;
};

const getRequestUrl = (query: string, body?: Record<string, unknown>) => {
  return (
    API_HOST +
    query +
    (body && Object.keys(body).length > 0
      ? "?" + new URLSearchParams(body as any).toString()
      : "")
  );
};

const apiFetch = async (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<any> => {
  let response: Response;
  try {
    response = await fetch(input, init);
  } catch (networkErr) {
    throw new Error(
      "Không kết nối được tới server. Hãy kiểm tra backend đã chạy chưa (port 3000)."
    );
  }

  // Đọc JSON; nếu rỗng thì bỏ qua
  let result: any = null;
  try {
    result = await response.json();
  } catch {
    /* response không có body JSON */
  }

  if (!response.ok) {
    let errorMessage = `Lỗi ${response.status}`;
    if (result?.message) errorMessage = result.message;
    else if (result?.error) errorMessage = result.error;
    throw new Error(errorMessage);
  }

  return result;
};

// --------- Public methods ---------
export const apiPost = async (query: string, body: any) => {
  const isFormData = body instanceof FormData;
  const headers = await getRequestHeaders("POST", isFormData);
  return apiFetch(getRequestUrl(query), {
    method: "POST",
    headers,
    body: isFormData ? body : JSON.stringify(body),
  });
};

export const apiDelete = async (query: string, body: any) => {
  const isFormData = body instanceof FormData;
  const headers = await getRequestHeaders("DELETE", isFormData);
  return apiFetch(getRequestUrl(query, body), {
    method: "DELETE",
    headers,
    body: isFormData ? body : JSON.stringify(body),
  });
};

export const apiPut = async (query: string, body: any) => {
  const isFormData = body instanceof FormData;
  const headers = await getRequestHeaders("PUT", isFormData);
  return apiFetch(getRequestUrl(query), {
    method: "PUT",
    headers,
    body: isFormData ? body : JSON.stringify(body),
  });
};

export const apiPatch = async (query: string, body: any) => {
  const isFormData = body instanceof FormData;
  const headers = await getRequestHeaders("PATCH", isFormData);
  return apiFetch(getRequestUrl(query), {
    method: "PATCH",
    headers,
    body: isFormData ? body : JSON.stringify(body),
  });
};

export const apiGet = async (query: string, body?: Record<string, unknown>) => {
  const headers = await getRequestHeaders("GET");
  return apiFetch(getRequestUrl(query, body), {
    method: "GET",
    headers,
  });
};