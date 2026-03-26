import { cookies } from "next/headers"
import { getCart } from "@/services/api"
import CheckoutContent from "./checkoutContent"
import { redirect } from "next/navigation"

export default async function CheckoutPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value
  const userId = cookieStore.get("userId")?.value
  const userInfo = cookieStore.get("userInfo")?.value

  if (!token || !userId) redirect("/signin")

  try {
    const cart = await getCart(token, Number(userId))
    const user = userInfo ? JSON.parse(userInfo) : {}
    return <CheckoutContent items={cart?.data?.items ?? []} token={token} userId={Number(userId)} username={user.username ?? ""} />
  } catch {
    redirect("/cart")
  }
}