interface ApiResponse<T> {
    data: T | null;
    error: string | null;
}

export async function request<T>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    token?: string,
    body?: any
): Promise<ApiResponse<T>> {
    try {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) {
            throw new Error(`Xatolik: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        return { data: result, error: null };

    } catch (err: any) {
        return {
            data: null,
            error: err.message || 'Noma’lum xatolik yuz berdi'
        };
    }
}