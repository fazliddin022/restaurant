"use client"

import Navbar from "./Navbar"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "@/public/icons"
import { useTranslations } from "next-intl"
import Image from "next/image"

import { TeamMember } from "@/@types"

const BASE_IMG = process.env.NEXT_PUBLIC_IMAGE_URL || "https://anorkhulov.uz"

interface Props {
  team: TeamMember[]
}

export default function AboutPage({ team }: Props) {
  const t = useTranslations("AboutPage")

  return (
    <section className="py-10">
      <div className="containers">
        <div className="bg-white/40 rounded-[50px] px-17 pb-16">
          <Navbar />

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:underline cursor-pointer">{t("home")}</Link>
            <span>›</span>
            <span className="text-black font-medium">{t("breadcrumb")}</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl font-bold text-center mb-10">{t("title")}</h1>

          {/* Intro text */}
          <p className="text-base leading-relaxed mb-16 text-gray-700">
            {t("intro1")}<br/><br/>{t("intro2")}
          </p>

          {/* Our Food */}
          <div className="flex items-center justify-between mb-16">
            <div className="w-141">
              <h2 className="text-4xl font-bold mb-6">{t("ourFoodTitle")}</h2>
              <p className="text-gray-700 leading-[150%] mb-6">
                {t("ourFoodText1")}<br/><br/>{t("ourFoodText2")}
              </p>
              <Button className="cursor-pointer py-6! px-5! rounded-br-none gap-2">
                {t("menuBtn")} <ArrowRightIcon />
              </Button>
            </div>
            <div className="w-105 shrink-0">
              <Image
                src="/images/our-dish.png"
                alt="our-food"
                width={503}
                height={676}
                className="w-125.75 h-169 object-cover rounded-[24px]"
              />
            </div>
          </div>

          {/* Our Journey */}
          <div className="flex items-center justify-between mb-16">
            <div className="w-105 shrink-0">
              <Image
                src="/images/burger-img.png"
                alt="our-journey"
                width={503}
                height={676}
                className="w-125.75 h-169 object-cover rounded-[24px]"
              />
            </div>
            <div className="w-141">
              <h2 className="text-4xl font-bold mb-6">{t("ourJourneyTitle")}</h2>
              <p className="text-gray-700 leading-relaxed">
                {t("ourJourneyText1")}<br/><br/>{t("ourJourneyText2")}
              </p>
            </div>
          </div>

          {/* Team */}
          <h2 className="text-4xl font-bold text-center mb-12">{t("teamTitle")}</h2>
          <div className="grid grid-cols-3 gap-10 mb-10">
            {team.map(member => (
              <div key={member.id} className="flex flex-col items-center gap-3">
                <Image
                  src={member.avatar ? `${BASE_IMG}/${member.avatar}` : "/images/chef-img.jpg"}
                  alt={member.firstName}
                  width={140}
                  height={140}
                  className="w-35 h-35 object-cover rounded-full border-4 border-white/60"
                />
                <h3 className="text-lg font-bold">{member.firstName} {member.lastName}</h3>
                <p className="text-sm text-gray-500">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}