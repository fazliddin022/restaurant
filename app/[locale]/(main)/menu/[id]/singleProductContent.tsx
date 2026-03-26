"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CartLightIcon, HeartIcon } from "@/public/icons"
import { Product } from "@/@types"
import { useState } from "react"
import { addToCartAction } from "@/actions/addToCart"
import { toast } from "sonner"
import Navbar from "@/modules/Navbar"
import DishCard from "@/components/customComponents/DishCard"
import { Link } from "@/i18n/navigation"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || "https://anorkhulov.uz"

interface Props {
  product: Product
  similar: Product[]
}

const SingleProductContent = ({ product, similar }: Props) => {
  const [quantity, setQuantity] = useState(1)

  async function handleAddToCart() {
    const res = await addToCartAction(product.id)
    if (res.success) {
      toast.success("Savatchaga qo'shildi!", { position: "top-center" })
      window.dispatchEvent(new Event("cart-updated"))
    } else {
      toast.error(res.message || "Xatolik", { position: "top-center" })
    }
  }

  return (
    <section className="py-10">
      <div className="containers">
        <div className="bg-white/40 rounded-[50px] px-[68px] pb-16">
          <Navbar />

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:underline cursor-pointer">Главная</Link>
            <span>›</span>
            <Link href="/menu" className="hover:underline cursor-pointer">Меню</Link>
            <span>›</span>
            <span className="text-black font-medium">{product.category?.name}</span>
          </div>

          <h1 className="text-5xl font-bold text-center mb-10">{product.category?.name}</h1>

          {/* Product detail */}
          <div className="flex items-center gap-16 mb-16">
            <div className="w-[400px] shrink-0">
              <Image
                src={`${IMAGE_URL}/${product.image}`}
                alt={product.name}
                width={400}
                height={400}
                className="w-full h-[400px] object-cover rounded-[30px]"
              />
            </div>
            <div className="flex-1 flex flex-col gap-5">
              <h2 className="text-4xl font-bold">{product.name}</h2>
              <div className="flex items-center gap-3">
                <p className="text-3xl font-bold">${product.price}</p>
                {/* Stars */}
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(star => (
                    <span key={star} className={`text-xl ${star <= Math.round(product.rating) ? "text-yellow-400" : "text-gray-300"}`}>★</span>
                  ))}
                  <span className="text-gray-500 text-sm ml-1">{product.rating?.toFixed(1)}</span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">Описание:</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              {/* Quantity + Add to cart */}
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-4 bg-white/60 rounded-full px-5 py-3 border border-black/10">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="text-xl font-bold cursor-pointer hover:text-red-500 transition-colors w-6 text-center"
                  >−</button>
                  <span className="text-xl font-semibold w-6 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="text-xl font-bold cursor-pointer hover:text-green-500 transition-colors w-6 text-center"
                  >+</button>
                </div>
                <Button
                  onClick={handleAddToCart}
                  className="cursor-pointer py-7! px-8! rounded-[13px] text-base font-semibold gap-2"
                >
                  <CartLightIcon /> В корзину
                </Button>
                <Button size="icon" className="cursor-pointer bg-transparent border-2 border-black rounded-full hover:bg-black hover:text-white transition-colors">
                  <HeartIcon />
                </Button>
              </div>
            </div>
          </div>

          {/* Similar products */}
          {similar.length > 0 && (
            <>
              <h2 className="text-4xl font-bold mb-10">Похожие:</h2>
              <Carousel opts={{ align: "start" }} className="px-8">
                <CarouselContent className="-ml-6 pt-20 pb-6">
                  {similar.map(item => (
                    <CarouselItem key={item.id} className="pl-6 basis-1/4">
                      <DishCard
                        id={item.id}
                        name={item.name}
                        description={item.description}
                        price={`$${item.price}`}
                        img={`${IMAGE_URL}/${item.image}`}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0" />
                <CarouselNext className="right-0" />
              </Carousel>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default SingleProductContent