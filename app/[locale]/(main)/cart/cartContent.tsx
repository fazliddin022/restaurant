"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "@/i18n/navigation"
import { Link } from "@/i18n/navigation"
import Navbar from "@/modules/Navbar"
import { CartItem } from "@/@types"

const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || "https://anorkhulov.uz"
const BASE = process.env.NEXT_PUBLIC_API_URL || "https://anorkhulov.uz/api"

interface Props {
  items: CartItem[]
  token: string
  userId: number
}

const CartContent = ({ items: initialItems, token }: Props) => {
  const [items, setItems] = useState<CartItem[]>(initialItems)
  const router = useRouter()

  const total = items.reduce((sum, item) => sum + item.totalPrice, 0)

  async function handleQuantity(itemId: number, newQty: number) {
    if (newQty < 1) return
    try {
      const res = await fetch(`${BASE}/cart/items/${itemId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: newQty }),
      })
      const data = await res.json()
      if (data?.data?.items) {
        setItems(data.data.items)
        window.dispatchEvent(new Event("cart-updated"))
      }
    } catch (err) {
      console.error(err)
    }
  }

  async function handleRemove(item: CartItem) {
    try {
      const res = await fetch(`${BASE}/cart/items/${item.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok || res.status === 200 || res.status === 204) {
        setItems(prev => prev.filter(i => i.id !== item.id))
        window.dispatchEvent(new Event("cart-updated"))
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <section className="py-10">
      <div className="containers">
        <div className="bg-white/40 rounded-[50px] px-[68px] pb-16">
          <Navbar />
          <h1 className="text-5xl font-bold text-center mb-12">Savatcha</h1>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-500 mb-6">Savatcha bo'sh</p>
              <Button onClick={() => router.push("/menu")} className="cursor-pointer">
                Menyuga o'tish
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {items.map(item => (
                <div key={item.id}
                  className="bg-white/50 rounded-[24px] p-5 flex items-center justify-between gap-6">
                  <div className="flex items-center gap-5">
                    <Image
                      src={`${IMAGE_URL}/${item.product.image}`}
                      alt={item.product.name}
                      width={80} height={80}
                      className="w-20 h-20 object-cover rounded-[16px]"
                    />
                    <div>
                      <h3 className="text-xl font-bold">{item.product.name}</h3>
                      <p className="text-gray-500 text-sm">${item.unitPrice.toLocaleString()}</p>
                      <p className="text-lg font-bold mt-1">${item.totalPrice.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 bg-white/70 rounded-full px-4 py-2 border border-black/10">
                      <button onClick={() => handleQuantity(item.id, item.quantity - 1)}
                        className="text-lg font-bold cursor-pointer hover:text-red-500 transition-colors w-5 text-center">
                        −
                      </button>
                      <span className="text-base font-semibold w-5 text-center">{item.quantity}</span>
                      <button onClick={() => handleQuantity(item.id, item.quantity + 1)}
                        className="text-lg font-bold cursor-pointer hover:text-green-500 transition-colors w-5 text-center">
                        +
                      </button>
                    </div>
                    <Button
                      onClick={() => handleRemove(item)}
                      variant="outline"
                      className="rounded-full w-9 h-9 p-0 cursor-pointer hover:bg-red-50 hover:border-red-400 hover:text-red-600 transition-colors">
                      ✕
                    </Button>
                  </div>
                </div>
              ))}

              <div className="bg-white/50 rounded-[24px] p-6 flex items-center justify-between">
                <span className="text-2xl font-bold">Jami:</span>
                <span className="text-3xl font-black">${total.toLocaleString()}</span>
              </div>

              <div className="flex justify-end">
                <Link href="/checkout">
                  <Button className="cursor-pointer py-6! px-10! rounded-[13px] text-base font-semibold">
                    Buyurtma berish
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default CartContent