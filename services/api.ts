import {
  SignInPayload,
  SignUpPayload,
  AuthResponse,
  Product,
  Category,
  NewsItem,
  GalleryItem,
} from "@/@types"

const BASE = process.env.NEXT_PUBLIC_API_URL || "https://anorkhulov.uz/api"

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${url}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
    cache: "no-store",
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data?.message?.[0] || "Request failed")
  return data
}

// ─── Auth ─────────────────────────────────────────────────────
export async function signUp(payload: SignUpPayload): Promise<AuthResponse> {
  return request("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export async function signIn(payload: SignInPayload): Promise<AuthResponse> {
  return request("/auth/signin", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

// ─── Products ─────────────────────────────────────────────────
export async function getProducts(categoryId?: number): Promise<{ data: Product[] }> {
  const query = categoryId ? `?categoryId=${categoryId}` : ""
  return request(`/products${query}`)
}

// ─── Categories ───────────────────────────────────────────────
export async function getCategories(): Promise<{ data: Category[] }> {
  return request("/categories")
}

// ─── News ─────────────────────────────────────────────────────
export async function getNews(): Promise<{ data: NewsItem[] }> {
  return request("/news")
}

// ─── Galleries ────────────────────────────────────────────────
export async function getGalleries(): Promise<{ data: GalleryItem[] }> {
  return request("/galleries")
}