import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ArrowRightIcon } from "@/public/icons"
import { useTranslations } from "next-intl"
import DishCard from "@/components/customComponents/DishCard"

const PopularDishes = () => {
  const t = useTranslations("PopularDishes")

  const popularData = [
    { id: 1, name: t("dish1.name"), description: t("dish1.description"), price: "$10.00", img: "/images/chicken-soup.png" },
    { id: 2, name: t("dish2.name"), description: t("dish2.description"), price: "$8.00",  img: "/images/chicken-soup.png" },
    { id: 3, name: t("dish3.name"), description: t("dish3.description"), price: "$24.00", img: "/images/chicken-soup.png" },
    { id: 4, name: t("dish4.name"), description: t("dish4.description"), price: "$14.00", img: "/images/chicken-soup.png" },
    { id: 5, name: t("dish5.name"), description: t("dish5.description"), price: "$18.00", img: "/images/chicken-soup.png" },
  ]

  return (
    <div className="dishes-section py-10">
      <div className="containers">
        <h2 className="font-bold text-5xl text-center">{t("title")}</h2>
        <Carousel
          opts={{ align: "start", loop: false }}
          className="py-20 px-8"
        >
          <CarouselContent className="-ml-6">
            {popularData.map((item) => (
              <CarouselItem key={item.id} className="pl-6 basis-1/4">
                <DishCard
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  img={item.img}
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