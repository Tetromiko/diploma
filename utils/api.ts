var API_URL = "https://localhost:7232/api";

export function setApiUrl(url: string) {
  API_URL = url;
}

export function setToken(token: string) {
  localStorage.setItem("token", token);
}

export function parseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1]; // Отримуємо payload
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload); // Повертаємо об'єкт з даними
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}

export function isTokenValid(): boolean {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  const tokenParts = token.split(".");
  if (tokenParts.length !== 3) {
    return false;
  }
  const payload = JSON.parse(atob(tokenParts[1]));
  const expirationTime = payload.exp * 1000;
  const currentTime = Date.now();
  if (currentTime > expirationTime) {
    return false;
  }
  return true;
}

function getToken(): string | null {
  // Для React Native
  if (typeof window === "undefined" && global?.localStorage === undefined) {
    // Використовуйте AsyncStorage у компонентах, тут fallback
    return null;
  }
  return localStorage.getItem("token");
}

function withAuthHeaders(options?: RequestInit): RequestInit {
  const token = getToken();
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
  try {
    const response = await fetch(API_URL + url, withAuthHeaders(options));
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    var data = await response.json();
    console.log("response", data);
    return data;
  } catch (err) {
    throw new Error(
      `Network error: немає з'єднання з ${API_URL + url}\n${err}`
    );
  }
}

export async function postRemoteData<T = any>(
  url: string,
  data: T,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(API_URL + url, {
      ...withAuthHeaders(options),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
        ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    } else {
      return (await response.text()) as unknown as T;
    }
  } catch (err) {
    throw new Error(
      `Network error: немає з'єднання з ${API_URL + url}\n${err}`
    );
  }
}

export async function putRemoteData<T = any>(
  url: string,
  data: T,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(API_URL + url, {
      ...withAuthHeaders(options),
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
        ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return response.json();
  } catch (err) {
    throw new Error(
      `Network error: немає з'єднання з ${API_URL + url}\n${err}`
    );
  }
}

export async function deleteRemoteData<T = any>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(API_URL + url, {
      ...withAuthHeaders(options),
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return response.json();
  } catch (err) {
    throw new Error(
      `Network error: немає з'єднання з ${API_URL + url}\n${err}`
    );
  }
}

export async function patchRemoteData<T = any>(
  url: string,
  data: T,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(API_URL + url, {
      ...withAuthHeaders(options),
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
        ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return response.json();
  } catch (err) {
    throw new Error(
      `Network error: немає з'єднання з ${API_URL + url}\n${err}`
    );
  }
}

export async function getRemoteBlob(url: string): Promise<Blob> {
  try {
    const response = await fetch(API_URL + url, withAuthHeaders());
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return response.blob();
  } catch (err) {
    throw new Error(
      `Network error: немає з'єднання з ${API_URL + url}\n${err}`
    );
  }
}
