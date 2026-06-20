import CookieHelper from "../utils/cookie.helper";

// import CookieHelper from "./cookie-helper";
const API_HOST = "http://localhost:3001/api/v1";

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
  method: string,
  isFormData?: boolean
): Promise<any> => {
  const token =  CookieHelper.getItem("token");
  // console.log(token);
  const headers = new Headers();
  if (token) {
    headers.append("Authorization", "Bearer " + token);
  }
  if (!isFormData) {
    headers.append("Content-Type", "application/json");
  }
  return headers;
};

// Attach body as search params
const getRequestUrl = (query: string, body?: any) => {
  return API_HOST + query + (body ? "?" + new URLSearchParams(body) : "");
};

const apiFetch = async (
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) => {
  try {
    const response = await fetch(input, init);
    const result = await response.json();
    if (!response.ok) {
      const message = `Lỗi: ${result.message || response.status}`;
      throw new Error(message);
    }
    return result;
  } catch (error) {
    throw error;
  }
};

export const apiPost = async (query: string, body: any) => {
  const isFormData = body instanceof FormData;
  const headers = await getRequestHeaders("POST", isFormData);
  try {
    return await apiFetch(getRequestUrl(query), {
      method: "POST",
      headers,
      body: isFormData ? body : JSON.stringify(body),
    });
  }
  catch (error: any) {
    // console.log(error)
    throw new Error(error.message)
  }
};

export const apiDelete = async (query: string, body: any) => {
  const isFormData = body instanceof FormData;
  const headers = await getRequestHeaders("DELETE", isFormData);
  return await apiFetch(getRequestUrl(query, body), {
    method: "DELETE",
    headers,
    body: isFormData ? body : JSON.stringify(body),
  });
};

export const apiPut = async (query: string, body: any) => {
  const isFormData = body instanceof FormData;
  const headers = await getRequestHeaders("PUT", isFormData);
  return await apiFetch(getRequestUrl(query), {
    method: "PUT",
    headers,
    body: isFormData ? body : JSON.stringify(body),
  });
};

export const apiPatch = async (query: string, body: any) => {
  const isFormData = body instanceof FormData;
  const headers = await getRequestHeaders("PATCH", isFormData);
  return await apiFetch(getRequestUrl(query), {
    method: "PATCH",
    headers,
    body: isFormData ? body : JSON.stringify(body),
  });
};

export const apiGet = async (query: string, body?: any) => {
  const headers = await getRequestHeaders("GET");
  return await apiFetch(getRequestUrl(query, body), {
    method: "GET",
    headers,
  });
};