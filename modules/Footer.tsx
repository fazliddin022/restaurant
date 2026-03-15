import { SocialIcon1, SocialIcon2, SocialIcon3, SocialIcon4 } from "@/public/icons"
import Image from "next/image"

interface FooterListType {
  id: number
  ulTitle: string
  children: Array<{ childId: number; title: string }>
}

const footerList: FooterListType[] = [
  {
    id: 1,
    ulTitle: "Наши услуги",
    children: [
      { childId: 1, title: "Цены" },
      { childId: 2, title: "Отслеживание" },
      { childId: 3, title: "Сообщить об ошибке" },
      { childId: 4, title: "Условия услуг" },
    ],
  },
  {
    id: 2,
    ulTitle: "Наша компания",
    children: [
      { childId: 5, title: "Отчетность" },
      { childId: 6, title: "Свяжитесь с нами" },
      { childId: 7, title: "Управление" },
    ],
  },
  {
    id: 3,
    ulTitle: "Адрес",
    children: [
      { childId: 8, title: "Узбекистан, Ташкент Улица, 24" },
      { childId: 9, title: "+99894848844848" },
      { childId: 10, title: "info@bmgsoft.com" },
    ],
  },
]

const Footer = () => {
  return (
    <section className="restaurant-footer mt-10 w-full bg-center bg-no-repeat bg-cover">
      <div className="containers py-15 flex gap-[159px]">
        <div className="flex flex-col items-start gap-6">
          <Image
            className="w-auto h-auto"
            src={"/images/bonappetit-logo.svg"}
            alt="footer-logo"
            width={136}
            height={70}
          />
          <ul className="flex gap-[10px]">
            <li className="cursor-pointer hover:opacity-70 transition-opacity"><SocialIcon1 /></li>
            <li className="cursor-pointer hover:opacity-70 transition-opacity"><SocialIcon2 /></li>
            <li className="cursor-pointer hover:opacity-70 transition-opacity"><SocialIcon3 /></li>
            <li className="cursor-pointer hover:opacity-70 transition-opacity"><SocialIcon4 /></li>
          </ul>
        </div>
        <div className="flex gap-[179px]">
          {footerList.map((item) => (
            <ul key={item.id}>
              <h2 className="text-[25px] font-bold">{item.ulTitle}</h2>
              <div className="flex flex-col gap-2 mt-3 max-w-[160px]">
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
