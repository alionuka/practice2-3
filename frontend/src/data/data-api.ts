import type { TStrapiResponse } from "@/types";
import { getStrapiURL } from "@/lib/utils";

type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type ApiOptions<TBody = unknown> = {
  method?: HTTPMethod;
  body?: TBody;
  authToken?: string;
  headers?: HeadersInit;
  cache?: RequestCache;
  timeoutMs?: number;
};

async function apiRequest<TResponse, TBody = unknown>(
  pathOrUrl: string,
  options: ApiOptions<TBody> = {}
): Promise<TStrapiResponse<TResponse>> {
  const {
    method = "GET",
    body,
    authToken,
    headers,
    cache = "no-store",
    timeoutMs = 30000,
  } = options;

  const url = pathOrUrl.startsWith("http")
    ? pathOrUrl
    : `${getStrapiURL()}${pathOrUrl}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method,
      cache,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (response.status === 204) {
      return {
        data: null,
        meta: {},
        status: response.status,
        success: true,
      };
    }

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        data: null,
        error: data?.error ?? {
          status: response.status,
          name: "Error",
          message: response.statusText || "An error occurred",
        },
        success: false,
        status: response.status,
      };
    }

    return {
      ...data,
      success: true,
      status: response.status,
    };
  } catch (error) {
    return {
      data: null,
      error: {
        name: "FetchError",
        message:
          error instanceof Error ? error.message : "Failed to fetch data",
      },
      success: false,
      status: 500,
    };
  } finally {
    clearTimeout(timeout);
  }
}

export const api = {
  get<TResponse>(url: string, options?: Omit<ApiOptions, "method" | "body">) {
    return apiRequest<TResponse>(url, {
      ...options,
      method: "GET",
    });
  },

  post<TResponse, TBody = unknown>(
    url: string,
    body: TBody,
    options?: Omit<ApiOptions<TBody>, "method" | "body">
  ) {
    return apiRequest<TResponse, TBody>(url, {
      ...options,
      method: "POST",
      body,
    });
  },

  put<TResponse, TBody = unknown>(
    url: string,
    body: TBody,
    options?: Omit<ApiOptions<TBody>, "method" | "body">
  ) {
    return apiRequest<TResponse, TBody>(url, {
      ...options,
      method: "PUT",
      body,
    });
  },

  patch<TResponse, TBody = unknown>(
    url: string,
    body: TBody,
    options?: Omit<ApiOptions<TBody>, "method" | "body">
  ) {
    return apiRequest<TResponse, TBody>(url, {
      ...options,
      method: "PATCH",
      body,
    });
  },

  delete<TResponse>(url: string, options?: Omit<ApiOptions, "method">) {
    return apiRequest<TResponse>(url, {
      ...options,
      method: "DELETE",
    });
  },
};