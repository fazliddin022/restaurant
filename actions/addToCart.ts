"use server"

import { cookies } from "next/headers"
import { addToCart } from "@/services/api"

export async function addToCartAction(productId: number) {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value
  const userId = cookieStore.get("userId")?.value

  if (!token || !userId) {
    return { success: false, message: "Login qiling" }
  }

  try {
    await addToCart(token, Number(userId), productId, 1)
    return { success: true }
  } catch (err: unknown) {
    return { success: false, message: err instanceof Error ? err.message : "Xatolik" }
  }
}