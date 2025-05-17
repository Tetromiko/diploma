import { getData } from "./storage";

var API_URL = "";

export function setApiUrl(url: string) {
  API_URL = url;
}

async function withAuthHeaders(options?: RequestInit): Promise<RequestInit> {
  const token = await getData<string>("token");
  return {
    ...options,
    headers: {
      ...(options?.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
}

export async function getRemoteData<T = any>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const requestOptions = await withAuthHeaders({ ...options, method: "GET" });
  console.log("getRemoteData", API_URL + url, requestOptions);
  const response = await fetch(API_URL + url, requestOptions);
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}

export async function postRemoteData<T = any>(
  url: string,
  body?: any,
  options?: RequestInit
): Promise<T> {
  const requestOptions = await withAuthHeaders({
    ...options,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    body: JSON.stringify(body),
  });
  console.log("postRemoteData", API_URL + url, requestOptions);
  const response = await fetch(API_URL + url, requestOptions);
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}

export async function putRemoteData<T = any>(
  url: string,
  body?: any,
  options?: RequestInit
): Promise<T> {
  const requestOptions = await withAuthHeaders({
    ...options,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    body: JSON.stringify(body),
  });
  const response = await fetch(API_URL + url, requestOptions);
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}

export async function deleteRemoteData<T = any>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const requestOptions = await withAuthHeaders({
    ...options,
    method: "DELETE",
  });
  const response = await fetch(API_URL + url, requestOptions);
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}

export async function patchRemoteData<T = any>(
  url: string,
  body?: any,
  options?: RequestInit
): Promise<T> {
  const requestOptions = await withAuthHeaders({
    ...options,
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    body: JSON.stringify(body),
  });
  const response = await fetch(API_URL + url, requestOptions);
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}
