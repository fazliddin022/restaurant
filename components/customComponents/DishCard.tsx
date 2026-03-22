"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CartLightIcon, HeartIcon } from "@/public/icons"
import { addToCartAction } from "@/actions/addToCart"
import { toast } from "sonner"

interface DishCardProps {
  id: number
  name: string
  description: string
  price: string
  img: string
}

const DishCard = ({ id, name, description, price, img }: DishCardProps) => {

  async function handleAddToCart() {
    const res = await addToCartAction(id)
    if (res.success) {
      toast.success("Savatchaga qo'shildi!", { position: "top-center" })
      // Navbar cart count ni yangilash uchun event
      window.dispatchEvent(new Event("cart-updated"))
    } else {
      toast.error(res.message || "Xatolik", { position: "top-center" })
    }
  }

  return (
    <div className="w-65.75 relative min-h-77.5 bg-white/40 rounded-[38px] flex flex-col items-center hover:bg-white/60 transition-colors duration-300">
      <Image
        src={img}
        alt={name}
        width={224}
        height={217}
        className="max-w-56 w-full h-auto -mt-20"
      />
      <div className="w-full px-5 h-full flex flex-col justify-between pb-4">
        <div>
          <div className="w-full flex justify-between items-center">
            <h3 className="text-2xl font-bold">{name}</h3>
            <Button size="icon" className="cursor-pointer bg-transparent mt-0.5 hover:scale-110 transition-transform">
              <HeartIcon />
            </Button>
          </div>
          <p className="mt-2">{description}</p>
        </div>
        <p className="mt-4 font-bold text-2xl">{price}</p>
        <Button
          onClick={handleAddToCart}
          className="cursor-pointer absolute right-8 bottom-7 p-4 rounded-sm scale-140"
          size="icon"
        >
          <CartLightIcon />
        </Button>
      </div>
    </div>
  )
}

export default DishCard