// ─── Auth ─────────────────────────────────────────────────────
export interface SignUpPayload {
  firstName: string
  lastName: string
  email: string
  username: string
  password: string
}

export interface SignInPayload {
  username: string
  password: string
}

export interface AuthResponse {
  statusCode: number
  message: string
  data: {
    accessToken: string
    user: {
      id: number
      firstName: string
      lastName: string
      email: string
      username: string
      role: string
    }
  }
}

// ─── Category ─────────────────────────────────────────────────
export interface Product {
  id: number
  name: string
  description: string
  price: string
  image: string
  rating: number
  reviewsCount: number
  isAvailable: boolean
  category?: { id: number; name: string }
}

export interface Category {
  id: number
  name: string
  products: Product[]
}

// ─── News ─────────────────────────────────────────────────────
export interface NewsItem {
  id: number
  image: string
  description: string
  author: {
    id: number
    firstName: string
    lastName: string | null
    avatar: string
  }
}

// ─── Gallery ──────────────────────────────────────────────────
export interface GalleryItem {
  id: number
  image: string
}