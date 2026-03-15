import { Button } from "@/components/ui/button"
import { CartLightIcon, HeartIcon } from "@/public/icons"
import Image from "next/image"

interface DishCardProps {
  id: number
  name: string
  description: string
  price: string
  img: string
}

const DishCard = ({ name, description, price, img }: DishCardProps) => {
  return (
    <div className="w-[263px]">
      <div className="relative h-18 flex items-center justify-center z-[4]">
        <Image
          className="w-auto h-auto top-0 absolute"
          src={img}
          alt={name}
          width={224}
          height={217}
        />
      </div>
      <div className="bg-white/40 relative pt-40 px-4 flex flex-col p-5 gap-2 items-start justify-end rounded-[38px] hover:bg-white/60 transition-colors duration-300">
        <div className="w-full flex justify-between items-center">
          <h3 className="text-2xl font-bold">{name}</h3>
          <Button
            size={"icon"}
            className="cursor-pointer bg-transparent mt-0.5 hover:scale-110 transition-transform"
          >
            <HeartIcon />
          </Button>
        </div>
        <p>{description}</p>
        <p className="mt-4 font-bold text-2xl">{price}</p>
        <Button
          className="cursor-pointer absolute right-5 p-5 rounded-sm"
          size={"icon"}
        >
          <CartLightIcon />
        </Button>
      </div>
    </div>
  )
}

export default DishCard
