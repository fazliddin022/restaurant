import { cookies } from "next/headers"
import { getCart } from "@/services/api"
import CartContent from "./cartContent"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"

export default async function CartPage() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    const userId = cookieStore.get("userId")?.value

    if (!token || !userId) {
      return (
        <div className="containers py-40 flex flex-col items-center gap-6">
          <h1 className="text-4xl font-bold">Savatcha</h1>
          <p className="text-gray-500">Savatchani ko'rish uchun login qiling</p>
          <Link href="/signin"><Button>Login</Button></Link>
        </div>
      )
    }

    const cartRes = await getCart(token, Number(userId))
    const items = cartRes?.data?.items ?? []
    return <CartContent items={items} token={token} userId={Number(userId)} />
  } catch {
    return (
      <div className="containers py-40 text-center">
        <h1 className="text-4xl font-bold">Savatcha bo'sh</h1>
      </div>
    )
  }
}