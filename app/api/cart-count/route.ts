import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getCart } from "@/services/api"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    const userId = cookieStore.get("userId")?.value
    if (!token || !userId) return NextResponse.json({ count: 0 })

    const cartRes = await getCart(token, Number(userId))
    const count = cartRes?.data?.itemCount ?? cartRes?.data?.items?.length ?? 0
    return NextResponse.json({ count })
  } catch {
    return NextResponse.json({ count: 0 })
  }
}