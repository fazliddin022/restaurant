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
  if (!res.ok) {
    const msg = Array.isArray(data?.message)
      ? data.message[0]
      : (data?.message || "Request failed")
    throw new Error(msg)
  }
  return data
}

// ─── Auth ─────────────────────────────────────────────────────
export async function signUp(payload: SignUpPayload): Promise<AuthResponse> {
  return request("/auth/signup", { method: "POST", body: JSON.stringify(payload) })
}
export async function signIn(payload: SignInPayload): Promise<AuthResponse> {
  return request("/auth/signin", { method: "POST", body: JSON.stringify(payload) })
}

// ─── Products ─────────────────────────────────────────────────
export async function getProducts(categoryId?: number): Promise<{ data: Product[] }> {
  const query = categoryId ? `?categoryId=${categoryId}` : ""
  return request(`/products${query}`)
}
export async function getProductById(id: number): Promise<{ data: Product }> {
  return request(`/products/${id}`)
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

// ─── Cart ─────────────────────────────────────────────────────
export async function getCart(token: string, userId: number): Promise<{ data: CartResponse }> {
  return request(`/cart/current?userId=${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export async function addToCart(
  token: string,
  userId: number,
  productId: number,
  quantity = 1
): Promise<{ data: CartResponse }> {
  return request("/cart/items", {
    method: "POST",
    body: JSON.stringify({ userId, productId, quantity }),
    headers: { Authorization: `Bearer ${token}` },
  })
}

// ─── Reservation ──────────────────────────────────────────────
export async function getTables(): Promise<{ data: Table[] }> {
  return request("/restaurant-tables")
}
export async function createReservation(
  token: string,
  payload: ReservationPayload
): Promise<unknown> {
  return request("/reservations/create", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { Authorization: `Bearer ${token}` },
  })
}

// ─── Contact ──────────────────────────────────────────────────
export async function sendContact(payload: ContactPayload): Promise<unknown> {
  return request("/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

// ─── Types ────────────────────────────────────────────────────
export interface CartItem {
  id: number
  quantity: number
  note: string | null
  unitPrice: number
  totalPrice: number
  product: {
    id: number
    name: string
    image: string
    price: number
    isAvailable: boolean
  }
}

export interface CartResponse {
  id: number
  status: string
  user: unknown
  table: unknown
  itemCount: number
  subtotal: number
  items: CartItem[]
}

export interface Table {
  id: number
  tableNumber: number
  capacity: number
  location: string
  status: "AVAILABLE" | "OCCUPIED" | "RESERVED"
}

export interface ReservationPayload {
  email: string
  guestCount: number
  reservationDate: string
  reservationTime: string
  tableId: number
}

export interface ContactPayload {
  name: string
  email: string
  phone: string
  message: string
}