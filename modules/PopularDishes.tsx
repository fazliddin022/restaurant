import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ArrowRightIcon } from "@/public/icons"
import { useTranslations } from "next-intl"
import { Product } from "@/@types"
import DishCard from "@/components/customComponents/DishCard"

interface Props {
  products: Product[]
}

const PopularDishes = ({ products }: Props) => {
  const t = useTranslations("PopularDishes")

  return (
    <div className="dishes-section py-10">
      <div className="containers">
        <h2 className="font-bold text-5xl text-center">{t("title")}</h2>
        <Carousel opts={{ align: "start", loop: false }} className="py-20 px-8">
          <CarouselContent className="-ml-6">
            {products.map((item) => (
              <CarouselItem key={item.id} className="pl-6 basis-1/4">
                <DishCard
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  price={`$${item.price}`}
                  img={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${item.image}`}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="w-9 h-9 left-0 border border-black/30 bg-white shadow-md hover:bg-black hover:text-white transition-colors duration-200" />
          <CarouselNext className="w-9 h-9 right-0 border border-black/30 bg-white shadow-md hover:bg-black hover:text-white transition-colors duration-200" />
        </Carousel>
        <div className="w-full flex justify-end">
          <Button className="cursor-pointer py-6! px-5! rounded-br-none gap-2">
            {t("button")} <ArrowRightIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PopularDishes