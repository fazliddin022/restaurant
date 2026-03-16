import { Button } from "@/components/ui/button"
import Navbar from "./Navbar"
import { ArrowRightIcon } from "@/public/icons"
import { useTranslations } from "next-intl"
import Image from "next/image"

const Hero = () => {
  const t = useTranslations("Hero")

  return (
    <section className="py-10">
      <div className="relative bg-white/40 containers rounded-[50px] px-17 overflow-hidden">
        <Image
          src={"/images/hero-leaves-bg.png"}
          alt="hero-leaves-background"
          width={1481}
          height={742}
          className="absolute -left-18 top-32 opacity-80 pointer-events-none"
        />
        <Navbar />
        <div className="flex items-center justify-between py-15">
          <div className="w-94">
            <h2 className="text-6xl tracking-wide font-black leading-tight uppercase mb-4.25">
              {t("title")}
            </h2>
            <Button className="cursor-pointer py-6! px-6! rounded-br-none gap-2">
              {t("button")} <ArrowRightIcon />
            </Button>
          </div>
          <Image
            className="w-auto h-auto drop-shadow-2xl"
            src={"/images/hero-salmon-dish.png"}
            alt="hero-salmon-dish"
            width={613}
            height={609}
          />
        </div>
      </div>
    </section>
  )
}

export default Hero