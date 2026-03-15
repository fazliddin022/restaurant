import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "@/public/icons"
import Image from "next/image"

interface NewsItemType {
  id: number
  img: string
  description: string
  userAvatar: string
  userName: string
}

const newsList: NewsItemType[] = [
  {
    id: 1,
    img: "/images/gallery-photo.png",
    description:
      "Открываем новый филиал в центре Ташкента. Приходите и насладитесь нашими фирменными блюдами в уютной атмосфере.",
    userAvatar: "/images/author-avatar.png",
    userName: "Сергей",
  },
  {
    id: 2,
    img: "/images/gallery-photo.png",
    description:
      "Представляем обновлённое меню с сезонными блюдами. Шеф-повар приготовил особые новинки специально для вас.",
    userAvatar: "/images/author-avatar.png",
    userName: "Сергей",
  },
  {
    id: 3,
    img: "/images/gallery-photo.png",
    description:
      "Проводим кулинарный мастер-класс каждую субботу. Научитесь готовить наши фирменные блюда вместе с нами.",
    userAvatar: "/images/author-avatar.png",
    userName: "Сергей",
  },
]

const NewsGallery = () => {
  return (
    <section className="pb-10 pt-19">
      <div className="containers flex flex-col gap-17">
        <h2 className="text-5xl font-bold text-center">Новости/Галерея</h2>
        <ul className="flex items-center justify-center gap-25 mt-29">
          {newsList.map((item) => (
            <li
              key={item.id}
              className="bg-white/40 rounded-[30px] pb-4 flex flex-col items-start gap-3 pl-6 pr-2 hover:bg-white/60 transition-colors duration-300 cursor-pointer"
            >
              <Image
                src={item.img}
                alt="news-image"
                width={213}
                height={157}
                className="w-auto h-auto -mt-20 rounded-[30px] hover:scale-105 transition-transform duration-300"
              />
              <p className="mt-3 max-w-[327px]">{item.description}</p>
              <div className="flex items-center gap-3">
                <Image
                  src={item.userAvatar}
                  alt="news-user-avatar"
                  width={45}
                  height={45}
                  className="w-auto h-auto rounded-full"
                />
                <h2 className="text-lg font-semibold">{item.userName}</h2>
              </div>
            </li>
          ))}
        </ul>
        <div className="w-full flex justify-end">
          <Button className="cursor-pointer py-6! px-5! rounded-br-none gap-2">
            Посмотреть все <ArrowRightIcon />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default NewsGallery
