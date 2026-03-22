"use client"

import { Button } from "@/components/ui/button"
import { CartIcon, LikedIcon } from "@/public/icons"
import { useTranslations } from "next-intl"
import { Link, usePathname } from "@/i18n/navigation"
import Image from "next/image"
import { useEffect, useState } from "react"

const Navbar = () => {
  const t = useTranslations("Navbar")
  const pathname = usePathname()
  const [cartCount, setCartCount] = useState(0)

  function fetchCartCount() {
    fetch("/api/cart-count", { credentials: "include" })
      .then(r => r.json())
      .then(d => setCartCount(d.count ?? 0))
      .catch(() => setCartCount(0))
  }

  useEffect(() => {
    fetchCartCount()

    // Cart yangilanganda qayta fetch qilish
    window.addEventListener("cart-updated", fetchCartCount)
    return () => window.removeEventListener("cart-updated", fetchCartCount)
  }, [])

  const navLinks = [
    { id: 1, label: t("menu"),        href: "/menu"        },
    { id: 2, label: t("news"),        href: "/news"        },
    { id: 3, label: t("reservation"), href: "/reservation" },
    { id: 4, label: t("about"),       href: "/about"       },
    { id: 5, label: t("contacts"),    href: "/contacts"    },
  ]

  return (
    <div className="flex items-center justify-between py-10">
      <Link href="/">
        <Image
          className="w-34 h-auto"
          src="/images/bonappetit-logo.svg"
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
              className={`text-lg cursor-pointer transition-colors duration-200
                ${pathname === link.href ? "text-[#FF0000] font-medium" : "hover:text-[#FF0000]"}`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-5">
        <Button size="icon" className="cursor-pointer rounded-full bg-transparent border-2 border-black pt-0.5 hover:bg-black hover:text-white transition-colors duration-300">
          <LikedIcon />
        </Button>
        <Link href="/cart">
          <Button size="icon" className="cursor-pointer relative rounded-full bg-transparent border-2 border-black pt-0.5 hover:bg-black hover:text-white transition-colors duration-300">
            <CartIcon />
            <div className="absolute -top-1 -right-1.5 bg-[#FF0000] w-3.5 h-3.5 rounded-full text-[10px] flex items-center justify-center">
              <span>{cartCount}</span>
            </div>
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Navbar