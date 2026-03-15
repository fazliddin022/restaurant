import { ProductIcon, DeliveryIcon, ReceptIcon, AtmosphereIcon, ChefIcon, ServiceIcon } from "@/public/icons"
import { ReactNode } from "react"

interface WhyDataType {
  id: number
  icon: ReactNode
  title: string
  description: string
}

const whyDataList: WhyDataType[] = [
  {
    id: 1,
    icon: <ProductIcon />,
    title: "Качественные продукты",
    description: "Используем только свежие продукты высшего качества для каждого блюда",
  },
  {
    id: 2,
    icon: <DeliveryIcon />,
    title: "Быстрая доставка",
    description: "Доставляем горячие блюда прямо к вашей двери в течение 30 минут",
  },
  {
    id: 3,
    icon: <ReceptIcon />,
    title: "Вкусные рецепты",
    description: "Уникальные рецепты, созданные лучшими шеф-поварами нашего ресторана",
  },
  {
    id: 4,
    icon: <AtmosphereIcon />,
    title: "Уютная атмосфера",
    description: "Создаём приятную обстановку для незабываемого отдыха с близкими",
  },
  {
    id: 5,
    icon: <ChefIcon />,
    title: "Опытные повара",
    description: "Наши повара имеют многолетний опыт работы в лучших ресторанах мира",
  },
  {
    id: 6,
    icon: <ServiceIcon />,
    title: "Отличное обслуживание",
    description: "Дружелюбный персонал всегда готов помочь и сделать визит приятным",
  },
]

const WhyUs = () => {
  return (
    <div className="py-10">
      <div className="containers">
        <h2 className="text-center text-5xl font-bold">Почему именно мы?</h2>
        <ul className="flex flex-wrap mt-19 items-center justify-center gap-20">
          {whyDataList.map((item) => (
            <li
              key={item.id}
              className="flex flex-col justify-between items-start h-[180px] w-[380px] group"
            >
              <span className="group-hover:scale-110 transition-transform duration-300 block">
                {item.icon}
              </span>
              <h3 className="text-[32px] font-semibold">{item.title}</h3>
              <p className="text-gray-700">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default WhyUs
