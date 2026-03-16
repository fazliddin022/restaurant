import { ProductIcon, DeliveryIcon, ReceptIcon, AtmosphereIcon, ChefIcon, ServiceIcon } from "@/public/icons"
import { useTranslations } from "next-intl"
import { ReactNode } from "react"

const WhyUs = () => {
  const t = useTranslations("WhyUs")

  const whyDataList: { id: number; icon: ReactNode; key: string }[] = [
    { id: 1, icon: <ProductIcon />,   key: "quality"    },
    { id: 2, icon: <DeliveryIcon />,  key: "delivery"   },
    { id: 3, icon: <ReceptIcon />,    key: "recipes"    },
    { id: 4, icon: <AtmosphereIcon />,key: "atmosphere" },
    { id: 5, icon: <ChefIcon />,      key: "chefs"      },
    { id: 6, icon: <ServiceIcon />,   key: "service"    },
  ]

  return (
    <div className="py-10">
      <div className="containers">
        <h2 className="text-center text-5xl font-bold">{t("title")}</h2>
        <ul className="flex flex-wrap mt-19 items-center justify-center gap-20">
          {whyDataList.map((item) => (
            <li
              key={item.id}
              className="flex flex-col justify-between items-start h-[180px] w-[380px] group"
            >
              <span className="group-hover:scale-110 transition-transform duration-300 block">
                {item.icon}
              </span>
              <h3 className="text-[32px] font-semibold">{t(`${item.key}.title`)}</h3>
              <p className="text-gray-700">{t(`${item.key}.description`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default WhyUs