"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CartItem } from "@/services/api"
import { removeFromCart } from "@/services/api"
import { useState } from "react"
import { useRouter } from "@/i18n/navigation"
import Navbar from "@/modules/Navbar"

const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || "https://anorkhulov.uz"

interface Props {
  items: CartItem[]
  token: string
}

const CartContent = ({ items: initialItems, token }: Props) => {
  const [items, setItems] = useState<CartItem[]>(initialItems)
  const router = useRouter()

  const total = items.reduce((sum, item) => {
    return sum + parseFloat(item.product.price) * item.quantity
  }, 0)

  async function handleRemove(itemId: number) {
    try {
      await removeFromCart(token, itemId)
      setItems(prev => prev.filter(i => i.id !== itemId))
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
              <p className="text-2xl text-gray-500">Savatcha bo'sh</p>
              <Button
                className="mt-6 cursor-pointer"
                onClick={() => router.push("/menu")}
              >
                Menyuga o'tish
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {/* Cart items */}
              <div className="flex flex-col gap-4">
                {items.map(item => (
                  <div
                    key={item.id}
                    className="bg-white/50 rounded-[24px] p-5 flex items-center justify-between gap-6"
                  >
                    <div className="flex items-center gap-5">
                      <Image
                        src={`${IMAGE_URL}/${item.product.image}`}
                        alt={item.product.name}
                        width={80}
                        height={80}
                        className="w-20 h-20 object-cover rounded-[16px]"
                      />
                      <div>
                        <h3 className="text-xl font-bold">{item.product.name}</h3>
                        <p className="text-gray-500 text-sm">{item.product.description}</p>
                        <p className="text-lg font-bold mt-1">
                          ${(parseFloat(item.product.price) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 bg-white/70 rounded-full px-4 py-2">
                        <span className="font-semibold">x{item.quantity}</span>
                      </div>
                      <Button
                        onClick={() => handleRemove(item.id)}
                        variant="outline"
                        className="rounded-full w-9 h-9 p-0 cursor-pointer hover:bg-red-50 hover:border-red-400 hover:text-red-600 transition-colors"
                      >
                        ✕
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="bg-white/50 rounded-[24px] p-6 flex items-center justify-between">
                <span className="text-2xl font-bold">Jami:</span>
                <span className="text-3xl font-black">${total.toFixed(2)}</span>
              </div>

              <div className="flex justify-end">
                <Button className="cursor-pointer py-6! px-10! rounded-[13px] text-base font-semibold">
                  Buyurtma berish
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default CartContent