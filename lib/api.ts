// lib/api.ts
export async function apiFetch<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  if (typeof window === "undefined") {
    throw new Error("apiFetch can only be used in the browser");
  }

  const token = localStorage.getItem("token") || "";

  const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });

    if (!res.ok) {
      // 401 = Unauthorized
      if (res.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.reload(); // optional: redirect to login page
      }

      const text = await res.text();
      throw new Error(`API Error ${res.status}: ${text}`);
    }

    // Attempt to parse JSON
    const data = await res.json().catch(() => ({} as T));
    return data;
  } catch (err: any) {
    console.error("API fetch error:", err);
    throw err;
  }
}