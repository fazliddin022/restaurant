"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CartItem } from "@/services/api"
import { toast } from "sonner"
import Navbar from "@/modules/Navbar"

interface Props {
  items: CartItem[]
  token: string
  userId: number
  username: string
}

const CheckoutContent = ({ items, userId, username }: Props) => {
  const [delivery, setDelivery] = useState<"pickup" | "delivery">("pickup")
  const [payment, setPayment] = useState<"card" | "cash">("card")
  const [loading, setLoading] = useState(false)

  const total = items.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0)

  async function handleOrder() {
    setLoading(true)
    // Backend yo'q shu sahifada — faqat toast
    setTimeout(() => {
      toast.success("Buyurtmangiz qabul qilindi! Tez orada siz bilan bog'lanamiz.", {
        position: "top-center",
        duration: 4000,
      })
      setLoading(false)
    }, 1000)
  }

  return (
    <section className="py-10">
      <div className="containers">
        <div className="bg-white/40 rounded-[50px] px-[68px] pb-16">
          <Navbar />

          <h1 className="text-5xl font-bold text-center mb-14">Оформление заказа</h1>

          <div className="flex gap-16">
            {/* Left */}
            <div className="flex-1 flex flex-col gap-10">
              {/* Delivery method */}
              <div>
                <h2 className="text-2xl font-bold mb-5">Способ получения:</h2>
                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="delivery"
                      value="pickup"
                      checked={delivery === "pickup"}
                      onChange={() => setDelivery("pickup")}
                      className="w-5 h-5 cursor-pointer"
                    />
                    <span className="text-lg">Заказ с собой</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="delivery"
                      value="delivery"
                      checked={delivery === "delivery"}
                      onChange={() => setDelivery("delivery")}
                      className="w-5 h-5 cursor-pointer"
                    />
                    <span className="text-lg">Доставка до двери</span>
                  </label>
                </div>

                {delivery === "delivery" && (
                  <div className="mt-5 ml-8">
                    <div className="flex items-center gap-2 mb-2">
                      <span>🏠</span>
                      <span className="font-semibold">Доставка по адресу:</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">Укажите адрес доставки на карте:</p>
                    <Button className="cursor-pointer py-5! px-8! rounded-[13px]">
                      Выбрать
                    </Button>
                  </div>
                )}
              </div>

              {/* Payment method */}
              <div>
                <h2 className="text-2xl font-bold mb-5">Способ оплаты:</h2>
                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={payment === "card"}
                      onChange={() => setPayment("card")}
                      className="w-5 h-5 cursor-pointer"
                    />
                    <div>
                      <span className="text-lg">Картой онлайн</span>
                      {payment === "card" && (
                        <div className="flex gap-2 mt-2">
                          {["HUMO", "UZCARD", "VISA", "MC", "Apple Pay"].map(c => (
                            <span key={c} className="bg-gray-100 border border-gray-200 rounded px-2 py-1 text-xs font-bold">{c}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={payment === "cash"}
                      onChange={() => setPayment("cash")}
                      className="w-5 h-5 cursor-pointer"
                    />
                    <span className="text-lg">Оплата при получении</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right — Order summary */}
            <div className="w-[380px] shrink-0">
              <div className="bg-white/50 rounded-[30px] p-8 flex flex-col gap-5">
                <h2 className="text-2xl font-bold text-center">Ваш заказ</h2>
                <div className="flex flex-col gap-3">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between items-center border-b border-black/10 pb-3">
                      <span className="text-gray-700">{item.product.name}({item.quantity})</span>
                      <span className="font-semibold">${(Number(item.product.price) * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center border-b border-black/10 pb-3">
                    <span className="text-gray-700">Доставка</span>
                    <span className="font-semibold text-green-600">Бесплатно</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xl font-bold">Итого:</span>
                    <span className="text-xl font-black">${total.toFixed(2)}</span>
                  </div>
                </div>
                <Button
                  onClick={handleOrder}
                  disabled={loading}
                  className="w-full cursor-pointer py-7! rounded-[13px] text-base font-semibold mt-2"
                >
                  {loading ? "Yuborilmoqda..." : "Заказать"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CheckoutContent