"use client"

import { Button } from "@/components/ui/button"
import { CartIcon, LikedIcon } from "@/public/icons"
import { useTranslations } from "next-intl"
import { Link, usePathname } from "@/i18n/navigation"
import Image from "next/image"

const Navbar = () => {
  const t = useTranslations("Navbar")
  const pathname = usePathname()

  const navLinks = [
    { id: 1, label: t("menu"),        href: "/menu" },
    { id: 2, label: t("news"),        href: "/news" },
    { id: 3, label: t("reservation"), href: "/reservation" },
    { id: 4, label: t("about"),       href: "/about" },
    { id: 5, label: t("contacts"),    href: "/contacts" },
  ]

  return (
    <div className="flex items-center justify-between py-10">
      <Link href="/">
        <Image
          className="w-auto h-auto"
          src={"/images/bonappetit-logo.svg"}
          alt="website-logo"
          width={136}
          height={71}
        />
      </Link>
      <ul className="flex items-center gap-11">
        {navLinks.map((link) => (
          <li key={link.id}>
            <Link
              href={link.href}
              className={`text-lg cursor-pointer relative pb-0.5
                after:content-[''] after:absolute after:bottom-0 after:left-0
                after:h-0.5 after:bg-black after:transition-all after:duration-300
                ${pathname === link.href
                  ? "font-semibold after:w-full"
                  : "after:w-0 hover:after:w-full"
                }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex gap-5">
        <Button
          size={"icon"}
          className="cursor-pointer rounded-full bg-transparent border-2 border-black pt-0.5 hover:bg-black hover:text-white transition-colors duration-300"
        >
          <LikedIcon />
        </Button>
        <Button
          size={"icon"}
          className="cursor-pointer relative rounded-full bg-transparent border-2 border-black pt-0.5 hover:bg-black hover:text-white transition-colors duration-300"
        >
          <CartIcon />
          <div className="absolute -top-1 -right-1.5 bg-[#FF0000] w-3.5 h-3.5 rounded-full text-[10px] flex items-center justify-center">
            <p>1</p>
          </div>
        </Button>
      </div>
    </div>
  )
}

export default Navbar