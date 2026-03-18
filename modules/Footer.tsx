import { SocialIcon1, SocialIcon2, SocialIcon3, SocialIcon4 } from "@/public/icons"
import { useTranslations } from "next-intl"
import Image from "next/image"

const Footer = () => {
  const t = useTranslations("Footer")

  const footerList = [
    {
      id: 1,
      ulTitle: t("services"),
      children: [
        { childId: 1, title: t("prices") },
        { childId: 2, title: t("tracking") },
        { childId: 3, title: t("report") },
        { childId: 4, title: t("terms") },
      ],
    },
    {
      id: 2,
      ulTitle: t("company"),
      children: [
        { childId: 5, title: t("reporting") },
        { childId: 6, title: t("contact") },
        { childId: 7, title: t("management") },
      ],
    },
    {
      id: 3,
      ulTitle: t("address"),
      children: [
        { childId: 8, title: t("street") },
        { childId: 9, title: "+99894848844848" },
        { childId: 10, title: "info@bmgsoft.com" },
      ],
    },
  ]

  return (
    <section className="restaurant-footer mt-10 w-full bg-center bg-no-repeat bg-cover">
      <div className="containers py-15 flex gap-39.75">
        <div className="flex flex-col items-start gap-6">
          <Image
            className="w-auto h-auto"
            src={"/images/bonappetit-logo.svg"}
            alt="footer-logo"
            width={136}
            height={70}
          />
          <ul className="flex gap-2.5">
            <li className="cursor-pointer hover:opacity-70 transition-opacity"><SocialIcon1 /></li>
            <li className="cursor-pointer hover:opacity-70 transition-opacity"><SocialIcon2 /></li>
            <li className="cursor-pointer hover:opacity-70 transition-opacity"><SocialIcon3 /></li>
            <li className="cursor-pointer hover:opacity-70 transition-opacity"><SocialIcon4 /></li>
          </ul>
        </div>
        <div className="flex gap-44.75">
          {footerList.map((item) => (
            <ul key={item.id}>
              <h2 className="text-[25px] font-bold">{item.ulTitle}</h2>
              <div className="flex flex-col gap-2 mt-3 max-w-40">
                {item.children.map((child) => (
                  <li key={child.childId} className="cursor-pointer hover:underline">
                    {child.title}
                  </li>
                ))}
              </div>
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Footer