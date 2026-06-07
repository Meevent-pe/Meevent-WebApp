interface CustomFetchOptions extends RequestInit { }

export async function apiClient(endpoint: string, options: CustomFetchOptions = {}) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";

    const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const fullUrl = `${cleanBaseUrl}${cleanEndpoint}`;

    const headers = new Headers(options.headers);
    if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
    }

    const config: RequestInit = {
        ...options,
        headers,
    };

    try {
        const response = await fetch(fullUrl, config);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        if (response.status === 204) {
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error(`🚨 [API Client Error] en ${endpoint}:`, error);
        throw error;
    }
}
