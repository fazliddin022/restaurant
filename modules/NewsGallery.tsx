import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "@/public/icons"
import { useTranslations } from "next-intl"
import NewsCard from "@/components/customComponents/NewsCard"

const newsList = [
  { id: 1, img: "/images/gallery-photo.png", description: "", userAvatar: "/images/author-avatar.png", userName: "Сергей" },
  { id: 2, img: "/images/gallery-photo.png", description: "", userAvatar: "/images/author-avatar.png", userName: "Сергей" },
  { id: 3, img: "/images/gallery-photo.png", description: "", userAvatar: "/images/author-avatar.png", userName: "Сергей" },
]

const NewsGallery = () => {
  const t = useTranslations("NewsGallery")

  const filledList = newsList.map((item, i) => ({
    ...item,
    description: t(`news${i + 1}` as "news1" | "news2" | "news3"),
  }))

  return (
    <section className="pb-10 pt-19">
      <div className="containers flex flex-col gap-17">
        <h2 className="text-5xl font-bold text-center">{t("title")}</h2>
        <ul className="flex items-center justify-center gap-25 mt-29">
          {filledList.map((item) => (
            <NewsCard
              key={item.id}
              img={item.img}
              description={item.description}
              userAvatar={item.userAvatar}
              userName={item.userName}
            />
          ))}
        </ul>
        <div className="w-full flex justify-end">
          <Button className="cursor-pointer py-6! px-5! rounded-br-none gap-2">
            {t("button")} <ArrowRightIcon />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default NewsGallery