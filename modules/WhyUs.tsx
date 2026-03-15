import { WhyIcon1, WhyIcon2, WhyIcon3, WhyIcon4, WhyIcon5, WhyIcon6 } from "@/public/icons"
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
    icon: <WhyIcon1 />,
    title: "Качественные продукты",
    description: "Используем только свежие продукты высшего качества для каждого блюда",
  },
  {
    id: 2,
    icon: <WhyIcon2 />,
    title: "Быстрая доставка",
    description: "Доставляем горячие блюда прямо к вашей двери в течение 30 минут",
  },
  {
    id: 3,
    icon: <WhyIcon3 />,
    title: "Вкусные рецепты",
    description: "Уникальные рецепты, созданные лучшими шеф-поварами нашего ресторана",
  },
  {
    id: 4,
    icon: <WhyIcon4 />,
    title: "Уютная атмосфера",
    description: "Создаём приятную обстановку для незабываемого отдыха с близкими",
  },
  {
    id: 5,
    icon: <WhyIcon5 />,
    title: "Опытные повара",
    description: "Наши повара имеют многолетний опыт работы в лучших ресторанах мира",
  },
  {
    id: 6,
    icon: <WhyIcon6 />,
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
