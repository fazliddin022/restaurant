"use client"

import { Button } from "@/components/ui/button"
import { Link, usePathname, useRouter } from "@/i18n/navigation"
import { MailIcon, PhoneIcon, SignInIcon } from "@/public/icons"
import { useLocale, useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import { getCookie, deleteCookie } from "cookies-next"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const languages = [
  { code: "ru", label: "Русский" },
  { code: "uz", label: "O'zbek"  },
  { code: "en", label: "English" },
]

const SiteHeader = () => {
  const t = useTranslations("SiteHeader")
  const pathname = usePathname()
  const router = useRouter()
  const locale = useLocale()
  const [user, setUser] = useState<{ username: string } | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)

    const value = getCookie("userInfo")
    if (!value) {
      setUser(null)
      return
    }

    try {
      setUser(JSON.parse(value as string))
    } catch {
      setUser(null)
    }
  }, [])

  function handleLogout() {
    deleteCookie("token")
    deleteCookie("userInfo")
    setUser(null)
    router.push("/")
    router.refresh()
  }

  const currentLang = languages.find(l => l.code === locale) || languages[0]

  return (
    <section className="py-3 w-full bg-white/70 backdrop-blur-sm border-b border-black/10">
      <div className="containers flex items-center justify-between">
        <div className="flex gap-6">
          <span className="flex items-center gap-3"><PhoneIcon /><p>+998(90)758383833</p></span>
          <span className="flex items-center gap-3"><MailIcon /><p>info@bmgsoft.com</p></span>
        </div>
        <div className="flex gap-4 items-center">

          {/* Language Popover */}
          {isHydrated ? (
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-black/10 bg-white/40 hover:bg-white/70 transition-colors cursor-pointer text-sm">
                  <span className="font-medium">{currentLang.label}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-40 p-1.5" align="end">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => router.push(pathname, { locale: lang.code })}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm cursor-pointer transition-colors
                      ${locale === lang.code
                        ? "bg-black text-white"
                        : "hover:bg-gray-100 text-black"
                      }`}
                  >
                    <span className="font-medium">{lang.label}</span>
                  </button>
                ))}
              </PopoverContent>
            </Popover>
          ) : (
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-black/10 bg-white/40 text-sm"
              aria-label="Current language"
            >
              <span className="font-medium">{currentLang.label}</span>
            </button>
          )}

          {/* User / Sign In */}
          {isHydrated && user ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button className="py-3! px-3.5! text-sm cursor-pointer">
                  <SignInIcon /> {user.username}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-36 p-2" align="end">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded hover:bg-red-50 text-red-600 font-medium cursor-pointer"
                >
                  Logout
                </button>
              </PopoverContent>
            </Popover>
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