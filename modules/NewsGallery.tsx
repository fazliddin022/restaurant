import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "@/public/icons"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { NewsItem } from "@/@types"
import Image from "next/image"

const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || "https://anorkhulov.uz"

interface Props {
  news?: NewsItem[]
}

const NewsGallery = ({ news = [] }: Props) => {
  const t = useTranslations("NewsGallery")

  return (
    <section className="pb-10 pt-19">
      <div className="containers flex flex-col gap-17">
        <h2 className="text-5xl font-bold text-center">{t("title")}</h2>
        <ul className="flex items-center justify-center gap-25 mt-29">
          {news.map((item) => (
            <li
              key={item.id}
              className="bg-white/40 rounded-[30px] pb-4 flex flex-col items-start gap-3 pl-6 pr-2 hover:bg-white/60 transition-colors duration-300 cursor-pointer"
            >
              <Image
                src={`${IMAGE_URL}/${item.image}`}
                alt="news-image"
                width={213}
                height={157}
                className="max-w-[213px] w-full h-auto -mt-20 rounded-[30px]"
              />
              <p className="mt-3 max-w-[327px]">{item.description}</p>
              <div className="flex items-center gap-3">
                <Image
                  src={`${IMAGE_URL}/${item.author.avatar}`}
                  alt="avatar"
                  width={45}
                  height={45}
                  className="w-[45px] h-[45px] rounded-full object-cover"
                />
                <h2 className="text-lg font-semibold">{item.author.firstName}</h2>
              </div>
            </li>
          ))}
        </ul>
        <div className="w-full flex justify-end">
          <Link href="/news">
            <Button className="cursor-pointer py-6! px-5! rounded-br-none gap-2">
              {t("button")} <ArrowRightIcon />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default NewsGallery