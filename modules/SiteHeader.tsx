"use client"

import { usePathname, useRouter } from "@/i18n/navigation"
import { useLocale, useTranslations } from "next-intl"
import { ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { MailIcon, PhoneIcon, SignInIcon } from "@/public/icons"

const SiteHeader = () => {
  const t = useTranslations("SiteHeader")
  const pathname = usePathname()
  const router = useRouter()
  const locale = useLocale()

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value
    router.push(pathname, { locale: value })
  }

  return (
    <section className="py-3">
      <div className="containers flex items-center justify-between">
        <div className="flex gap-6.75">
          <span className="flex items-center gap-3"><PhoneIcon /> <p>+998(90)758383833</p></span>
          <span className="flex items-center gap-3"><MailIcon /><p>info@bmgsoft.com</p></span>
        </div>
        <div className="flex gap-9">
          <div className="flex items-center">
            <select
              value={locale}
              onChange={handleChange}
              className="px-3 outline-none cursor-pointer bg-white rounded-md text-black"
            >
              <option value="uz">UZ</option>
              <option value="ru">RU</option>
              <option value="en">EN</option>
            </select>
          </div>
          <Button className="py-3! px-3.5! text-sm cursor-pointer">
            <SignInIcon /> {t("signIn")}
          </Button>
        </div>
      </div>
    </section>
  )
}

export default SiteHeader