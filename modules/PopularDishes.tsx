"use client"

import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ArrowRightIcon } from "@/public/icons"
import { useTranslations } from "next-intl"
import { Product } from "@/@types"
import DishCard from "@/components/customComponents/DishCard"
import Link from "next/link"

interface Props {
  products: Product[]
}

const IMAGE_BASE = process.env.NEXT_PUBLIC_IMAGE_URL || "https://anorkhulov.uz/uploads"
const FALLBACK_IMAGE = "/images/our-dish.png"

function buildProductImageSrc(image: Product["image"]) {
  const cleanImage = typeof image === "string" ? image.trim() : ""
  if (!cleanImage || cleanImage === "null" || cleanImage === "undefined") {
    return FALLBACK_IMAGE
  }
  if (/^https?:\/\//i.test(cleanImage)) {
    return cleanImage
  }
  const base = IMAGE_BASE.replace(/\/$/, "")
  const path = cleanImage.replace(/^\//, "")
  return `${base}/${path}`
}

const PopularDishes = ({ products }: Props) => {
  const t = useTranslations("PopularDishes")

  return (
    <div className="dishes-section py-10">
      <div className="containers">
        <h2 className="font-bold text-5xl text-center">{t("title")}</h2>
        <Carousel opts={{ align: "start", loop: false }} className="px-8">
          <CarouselContent className="-ml-6 pt-20 pb-6">
            {products.map((item) => (
              <CarouselItem key={item.id} className="pl-6 basis-1/4">
                <DishCard
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  price={`$${item.price}`}
                  img={buildProductImageSrc(item.image)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="w-9 h-9 left-0 border border-black/30 bg-white shadow-md hover:bg-black hover:text-white transition-colors duration-200" />
          <CarouselNext className="w-9 h-9 right-0 border border-black/30 bg-white shadow-md hover:bg-black hover:text-white transition-colors duration-200" />
        </Carousel>
        <div className="w-full flex justify-end">
          <Link href="/menu">
            <Button className="cursor-pointer py-6! px-5! rounded-br-none gap-2">
              {t("button")} <ArrowRightIcon />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PopularDishes