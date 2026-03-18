"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import DishCard from "@/components/customComponents/DishCard"
import Navbar from "./Navbar"
import { Link } from "@/i18n/navigation"
import { getCategories } from "@/services/api"
import { Category, Product } from "@/@types"

const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || "https://anorkhulov.uz"

const MenuPage = () => {
  const t = useTranslations("Menu")
  const [categories, setCategories] = useState<Category[]>([])
  const [activeCategory, setActiveCategory] = useState<number | "all">("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCategories()
      .then(res => setCategories(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const allProducts: Product[] = categories.flatMap(c => c.products)

  const filtered: Product[] =
    activeCategory === "all"
      ? allProducts
      : categories.find(c => c.id === activeCategory)?.products || []

  const tabs = [
    { key: "all" as const, label: t("all") },
    ...categories.map(c => ({ key: c.id as number | "all", label: c.name })),
  ]

  return (
    <section className="py-10">
      <div className="containers">
        <div className="bg-white/40 rounded-[50px] px-[68px] pb-16">
          <Navbar />

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:underline cursor-pointer">{t("home")}</Link>
            <span>›</span>
            <span className="text-black font-medium">{t("title")}</span>
          </div>

          <h1 className="text-5xl font-bold text-center mb-10">{t("title")}</h1>

          {/* Tabs */}
          <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
            {tabs.map(tab => (
              <button
                key={String(tab.key)}
                onClick={() => setActiveCategory(tab.key)}
                className={`px-5 py-2 rounded-full border text-base cursor-pointer transition-all duration-200
                  ${activeCategory === tab.key
                    ? "bg-black text-white border-black"
                    : "bg-white/60 text-black border-black/20 hover:border-black/50"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="text-center py-20 text-gray-500">Загрузка...</div>
          ) : (
            <div className="bg-white/30 rounded-[40px] p-10">
              <div className="grid grid-cols-4 gap-x-6 gap-y-20">
                {filtered.map(dish => (
                  <DishCard
                    key={dish.id}
                    id={dish.id}
                    name={dish.name}
                    description={dish.description}
                    price={`$${dish.price}`}
                    img={`${IMAGE_URL}/${dish.image}`}
                  />
                ))}
                {filtered.length === 0 && (
                  <p className="col-span-4 text-center text-gray-500 py-10">Mahsulotlar topilmadi</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default MenuPage