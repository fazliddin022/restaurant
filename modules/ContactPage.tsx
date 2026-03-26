"use client"

import Navbar from "./Navbar"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

const ContactPage = () => {
  const t = useTranslations("ContactPage")

  const contacts = [
    {
      id: 1,
      icon: (
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      ),
      title: t("writeUs"),
      lines: ["info@bmgsoft.com", "t.me/bmgsoft.com"],
    },
    {
      id: 2,
      icon: (
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
        </svg>
      ),
      title: t("callUs"),
      lines: ["+9998908767888", "+9989865332322"],
    },
    {
      id: 3,
      icon: (
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
        </svg>
      ),
      title: t("visitUs"),
      lines: [t("address1"), t("address2")],
    },
  ]

  return (
    <section className="py-10">
      <div className="containers">
        <div className="bg-white/40 rounded-[50px] px-[68px] pb-16">
          <Navbar />

          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:underline cursor-pointer">{t("home")}</Link>
            <span>›</span>
            <span className="text-black font-medium">{t("breadcrumb")}</span>
          </div>

          <h1 className="text-5xl font-bold text-center mb-14">{t("title")}</h1>

          <div className="flex items-start justify-center gap-20 mb-16">
            {contacts.map(c => (
              <div key={c.id} className="flex flex-col items-center gap-3 text-center">
                <div className="text-black">{c.icon}</div>
                <h3 className="text-2xl font-bold">{c.title}</h3>
                {c.lines.map((line, i) => (
                  <p key={i} className="text-gray-700">{line}</p>
                ))}
              </div>
            ))}
          </div>

          <h2 className="text-4xl font-bold text-center mb-10">{t("formTitle")}</h2>
          <form className="max-w-[600px] mx-auto flex flex-col gap-5">
            <input
              placeholder={t("namePlaceholder")}
              className="w-full border border-black/20 rounded-[12px] px-5 py-4 text-base bg-white/50 outline-none focus:border-black/50 transition-colors"
            />
            <input
              placeholder={t("emailPlaceholder")}
              type="email"
              className="w-full border border-black/20 rounded-[12px] px-5 py-4 text-base bg-white/50 outline-none focus:border-black/50 transition-colors"
            />
            <input
              placeholder={t("phonePlaceholder")}
              className="w-full border border-black/20 rounded-[12px] px-5 py-4 text-base bg-white/50 outline-none focus:border-black/50 transition-colors"
            />
            <textarea
              placeholder={t("messagePlaceholder")}
              rows={4}
              className="w-full border border-black/20 rounded-[12px] px-5 py-4 text-base bg-white/50 outline-none focus:border-black/50 transition-colors resize-none"
            />
            <div className="flex justify-end">
              <Button className="cursor-pointer py-6! px-10! rounded-[13px] text-base font-semibold">
                {t("sendBtn")}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactPage