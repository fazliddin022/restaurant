"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import Navbar from "./Navbar"
import Image from "next/image"
import NewsCard from "@/components/customComponents/NewsCard"
import { getNews, getGalleries } from "@/services/api"
import { NewsItem, GalleryItem } from "@/@types"

const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || "https://anorkhulov.uz"
const PER_PAGE_NEWS = 6
const PER_PAGE_GALLERY = 8

function Pagination({ current, total, onChange }: { current: number; total: number; onChange: (p: number) => void }) {
  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      {Array.from({ length: total }, (_, i) => i + 1).map(p => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`w-9 h-9 rounded-full border text-sm cursor-pointer transition-colors duration-200
            ${p === current ? "bg-black text-white border-black" : "bg-white/60 text-black border-black/20 hover:border-black/50"}`}
        >{p}</button>
      ))}
      {total > 1 && <span className="text-black/40 px-1">...</span>}
      <button
        onClick={() => onChange(Math.min(current + 1, total))}
        className="w-9 h-9 rounded-full border border-black/20 bg-white/60 flex items-center justify-center cursor-pointer hover:border-black/50"
      >›</button>
    </div>
  )
}

const NewsPage = () => {
  const t = useTranslations("NewsPage")
  const [newsList, setNewsList]       = useState<NewsItem[]>([])
  const [galleries, setGalleries]     = useState<GalleryItem[]>([])
  const [newsPage, setNewsPage]       = useState(1)
  const [galleryPage, setGalleryPage] = useState(1)
  const [loading, setLoading]         = useState(true)

  useEffect(() => {
    Promise.all([getNews(), getGalleries()])
      .then(([newsRes, galRes]) => {
        setNewsList(newsRes.data)
        setGalleries(galRes.data)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const totalNewsPages    = Math.max(1, Math.ceil(newsList.length / PER_PAGE_NEWS))
  const totalGalleryPages = Math.max(1, Math.ceil(galleries.length / PER_PAGE_GALLERY))

  const visibleNews    = newsList.slice((newsPage - 1) * PER_PAGE_NEWS, newsPage * PER_PAGE_NEWS)
  const visibleGallery = galleries.slice((galleryPage - 1) * PER_PAGE_GALLERY, galleryPage * PER_PAGE_GALLERY)

  return (
    <section className="py-10">
      <div className="containers">
        <div className="bg-white/40 rounded-[50px] px-17 pb-16">
          <Navbar />

          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:underline cursor-pointer">{t("home")}</Link>
            <span>›</span>
            <span className="text-black font-medium">{t("news")}</span>
          </div>

          <h1 className="text-5xl font-bold text-center mb-32">{t("news")}</h1>

          {loading ? (
            <div className="text-center py-20 text-gray-500">Загрузка...</div>
          ) : (
            <>
              <ul className="grid grid-cols-3 gap-x-10 gap-y-28">
                {visibleNews.map(item => (
                  <NewsCard
                    key={item.id}
                    img={`${IMAGE_URL}/${item.image}`}
                    description={item.description}
                    userAvatar={`${IMAGE_URL}/${item.author.avatar}`}
                    userName={item.author.firstName}
                  />
                ))}
              </ul>
              <Pagination current={newsPage} total={totalNewsPages} onChange={setNewsPage} />
            </>
          )}

          <h2 className="text-5xl font-bold text-center mt-20 mb-12">{t("gallery")}</h2>

          <div className="grid grid-cols-4 gap-4">
            {visibleGallery.map(item => (
              <div key={item.id} className="rounded-[16px] overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200">
                <Image
                  src={`${IMAGE_URL}/${item.image}`}
                  alt="gallery"
                  width={300}
                  height={180}
                  className="w-full h-45 object-cover"
                />
              </div>
            ))}
          </div>

          {galleries.length > 0 && (
            <Pagination current={galleryPage} total={totalGalleryPages} onChange={setGalleryPage} />
          )}
        </div>
      </div>
    </section>
  )
}

export default NewsPage