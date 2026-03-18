"use client"

import { Button } from "@/components/ui/button"
import { Link, usePathname, useRouter } from "@/i18n/navigation"
import { MailIcon, PhoneIcon, SignInIcon } from "@/public/icons"
import { useLocale, useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import { getCookie } from "cookies-next"

const SiteHeader = () => {
  const t = useTranslations("SiteHeader")
  const pathname = usePathname()
  const router = useRouter()
  const locale = useLocale()
  const [user, setUser] = useState<{ username: string } | null>(null)

  useEffect(() => {
    const value = getCookie("userInfo")
    if (value) {
      try {
        setUser(JSON.parse(value as string))
      } catch {
        setUser(null)
      }
    }
  }, [])

  const changeLanguage = (lang: string) => {
    router.push(pathname, { locale: lang })
  }

  return (
    <section className="py-3 w-full">
      <div className="containers flex items-center justify-between">
        <div className="flex gap-6.75">
          <span className="flex items-center gap-3"><PhoneIcon /> <p>+998(90)758383833</p></span>
          <span className="flex items-center gap-3"><MailIcon /><p>info@bmgsoft.com</p></span>
        </div>
        <div className="flex gap-9 items-center">
          <select
            value={locale}
            onChange={e => changeLanguage(e.target.value)}
            className="px-3 outline-none cursor-pointer bg-white rounded-md text-black"
          >
            <option value="uz">UZ</option>
            <option value="ru">RU</option>
            <option value="en">EN</option>
          </select>
          {user ? (
            <Button className="py-3! px-3.5! text-sm cursor-pointer">
              <SignInIcon /> {user.username}
            </Button>
          ) : (
            <Link href="/signin">
              <Button className="py-3! px-3.5! text-sm cursor-pointer">
                <SignInIcon /> {t("signIn")}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

export default SiteHeader