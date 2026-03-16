import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "@/public/icons"
import { useTranslations } from "next-intl"
import Image from "next/image"

const NewsGallery = () => {
  const t = useTranslations("NewsGallery")

  const newsList = [
    { id: 1, img: "/images/gallery-photo.png", description: t("news1"), userAvatar: "/images/author-avatar.png", userName: "Sergey" },
    { id: 2, img: "/images/gallery-photo.png", description: t("news2"), userAvatar: "/images/author-avatar.png", userName: "Sergey" },
    { id: 3, img: "/images/gallery-photo.png", description: t("news3"), userAvatar: "/images/author-avatar.png", userName: "Sergey" },
  ]

  return (
    <section className="pb-10 pt-19">
      <div className="containers flex flex-col gap-17">
        <h2 className="text-5xl font-bold text-center">{t("title")}</h2>
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
            {t("button")} <ArrowRightIcon />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default NewsGallery