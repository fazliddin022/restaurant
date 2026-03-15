import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ArrowRightIcon } from "@/public/icons"
import DishCard from "@/components/customComponents/DishCard"

interface PopularItem {
  id: number
  name: string
  description: string
  price: string
  img: string
}

const popularData: PopularItem[] = [
  { id: 1, name: "Chicken Soup",  description: "Spicy with Garlic",   price: "$10.00", img: "/images/chicken-soup.png" },
  { id: 2, name: "Caesar Salad",  description: "Fresh with Croutons", price: "$8.00",  img: "/images/chicken-soup.png" },
  { id: 3, name: "Beef Steak",    description: "Grilled Medium Rare", price: "$24.00", img: "/images/chicken-soup.png" },
  { id: 4, name: "Margherita",    description: "Classic Italian",     price: "$14.00", img: "/images/chicken-soup.png" },
  { id: 5, name: "Salmon Fillet", description: "With Lemon Butter",   price: "$18.00", img: "/images/chicken-soup.png" },
]

const PopularDishes = () => {
  return (
    <div className="dishes-section py-10">
      <div className="containers">
        <h2 className="font-bold text-5xl text-center">Популярные блюда</h2>
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
            Посмотреть меню <ArrowRightIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PopularDishes