import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getCart } from "@/services/api"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    if (!token) return NextResponse.json({ count: 0 })

    const cart = await getCart(token)
    return NextResponse.json({ count: cart?.data?.length ?? 0 })
  } catch {
    return NextResponse.json({ count: 0 })
  }
}