"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import Navbar from "./Navbar"
import Image from "next/image"
import NewsCard from "@/components/customComponents/NewsCard"

const newsList = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  img: "/images/gallery-photo.png",
  description: "Используйте гибкие структуры, чтобы предоставить надёжный обзор для обзоров высокого уровня. Итеративные подходы к данным корпоративной.",
  userAvatar: "/images/author-avatar.png",
  userName: "Сергей",
}))

const galleryList = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  img: "/images/gallery-photo.png",
}))

const PER_PAGE_NEWS    = 6
const PER_PAGE_GALLERY = 8

function Pagination({ current, total, onChange }: { current: number; total: number; onChange: (p: number) => void }) {
  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`w-9 h-9 rounded-full border text-sm cursor-pointer transition-colors duration-200
            ${p === current ? "bg-black text-white border-black" : "bg-white/60 text-black border-black/20 hover:border-black/50"}`}
        >
          {p}
        </button>
      ))}
      <span className="text-black/40 px-1">...</span>
      <button
        onClick={() => onChange(Math.min(current + 1, total))}
        className="w-9 h-9 rounded-full border border-black/20 bg-white/60 flex items-center justify-center cursor-pointer hover:border-black/50"
      >›</button>
    </div>
  )
}

const NewsPage = () => {
  const t = useTranslations("NewsPage")
  const [newsPage, setNewsPage]       = useState(1)
  const [galleryPage, setGalleryPage] = useState(1)

  const totalNewsPages    = Math.ceil(newsList.length    / PER_PAGE_NEWS)
  const totalGalleryPages = Math.ceil(galleryList.length / PER_PAGE_GALLERY)

  const visibleNews    = newsList.slice((newsPage - 1) * PER_PAGE_NEWS, newsPage * PER_PAGE_NEWS)
  const visibleGallery = galleryList.slice((galleryPage - 1) * PER_PAGE_GALLERY, galleryPage * PER_PAGE_GALLERY)

  return (
    <section className="py-10">
      <div className="containers">
        <div className="bg-white/40 rounded-[50px] px-[68px] pb-16">

          <Navbar />

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:underline cursor-pointer">{t("home")}</Link>
            <span>›</span>
            <span className="text-black font-medium">{t("news")}</span>
          </div>

          {/* ── NEWS ── */}
          <h1 className="text-5xl font-bold text-center mb-32">{t("news")}</h1>

          <ul className="grid grid-cols-3 gap-x-10 gap-y-28">
            {visibleNews.map((item) => (
              <NewsCard
                key={item.id}
                img={item.img}
                description={item.description}
                userAvatar={item.userAvatar}
                userName={item.userName}
              />
            ))}
          </ul>

          <Pagination current={newsPage} total={totalNewsPages} onChange={setNewsPage} />

          {/* ── GALLERY ── */}
          <h2 className="text-5xl font-bold text-center mt-20 mb-12">{t("gallery")}</h2>

          <div className="grid grid-cols-4 gap-4">
            {visibleGallery.map((item) => (
              <div key={item.id} className="rounded-[16px] overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200">
                <Image src={item.img} alt="gallery" width={300} height={180} className="w-full h-[180px] object-cover" />
              </div>
            ))}
          </div>

          <Pagination current={galleryPage} total={totalGalleryPages} onChange={setGalleryPage} />

        </div>
      </div>
    </section>
  )
}

export default NewsPage