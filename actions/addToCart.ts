"use server"

import { cookies } from "next/headers"

export async function addToCartAction(productId: number) {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  console.log("token:", token ? "exists" : "NOT FOUND")

  if (!token) {
    return { success: false, message: "Login qiling" }
  }

  try {
    const BASE = process.env.NEXT_PUBLIC_API_URL || "https://anorkhulov.uz/api"
    const res = await fetch(`${BASE}/cart/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, quantity: 1 }),
      cache: "no-store",
    })

    const data = await res.json()
    console.log("cart response:", res.status, JSON.stringify(data))

    if (!res.ok) {
      return { success: false, message: data?.message?.[0] || "Xatolik" }
    }

    return { success: true }
  } catch (err: unknown) {
    console.error("addToCart error:", err)
    return { success: false, message: "Server xatosi" }
  }
}

