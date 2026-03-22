import { cookies } from "next/headers"
import { getCart, CartItem } from "@/services/api"
import CartContent from "./cartContent"

export default async function CartPage() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    if (!token) {
      return (
        <div className="containers py-40 flex flex-col items-center gap-6">
          <h1 className="text-4xl font-bold">Savatcha</h1>
          <p className="text-gray-500">Savatchani ko'rish uchun login qiling</p>
        </div>
      )
    }

    const cart = await getCart(token)
    return <CartContent items={cart?.data ?? []} token={token} />
  } catch {
    return (
      <div className="containers py-40 text-center">
        <h1 className="text-4xl font-bold">Savatcha bo'sh</h1>
      </div>
    )
  }
}