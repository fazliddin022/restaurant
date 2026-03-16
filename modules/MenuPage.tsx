"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import DishCard from "@/components/customComponents/DishCard"
import Navbar from "./Navbar"
import { Link } from "@/i18n/navigation"

interface DishItem {
  id: number
  name: string
  description: string
  price: string
  img: string
  category: string
}

const allDishes: DishItem[] = [
  { id: 1,  category: "first",   name: "Chicken Soup",   description: "Spicy with garlic", price: "$10.00", img: "/images/chicken-soup.png" },
  { id: 2,  category: "first",   name: "Chicken Soup",   description: "Spicy with garlic", price: "$10.00", img: "/images/chicken-soup.png" },
  { id: 3,  category: "first",   name: "Chicken Soup",   description: "Spicy with garlic", price: "$10.00", img: "/images/chicken-soup.png" },
  { id: 4,  category: "first",   name: "Chicken Soup",   description: "Spicy with garlic", price: "$10.00", img: "/images/chicken-soup.png" },
  { id: 5,  category: "second",  name: "Chicken Soup",   description: "Spicy with garlic", price: "$10.00", img: "/images/chicken-soup.png" },
  { id: 6,  category: "second",  name: "Chicken Soup",   description: "Spicy with garlic", price: "$10.00", img: "/images/chicken-soup.png" },
  { id: 7,  category: "second",  name: "Chicken Soup",   description: "Spicy with garlic", price: "$10.00", img: "/images/chicken-soup.png" },
  { id: 8,  category: "second",  name: "Chicken Soup",   description: "Spicy with garlic", price: "$10.00", img: "/images/chicken-soup.png" },
  { id: 9,  category: "salads",  name: "Chicken Soup",   description: "Spicy with garlic", price: "$10.00", img: "/images/chicken-soup.png" },
  { id: 10, category: "salads",  name: "Chicken Soup",   description: "Spicy with garlic", price: "$10.00", img: "/images/chicken-soup.png" },
  { id: 11, category: "salads",  name: "Chicken Soup",   description: "Spicy with garlic", price: "$10.00", img: "/images/chicken-soup.png" },
  { id: 12, category: "salads",  name: "Chicken Soup",   description: "Spicy with garlic", price: "$10.00", img: "/images/chicken-soup.png" },
  { id: 13, category: "drinks",  name: "Chicken Soup",   description: "Spicy with garlic", price: "$10.00", img: "/images/chicken-soup.png" },
  { id: 14, category: "drinks",  name: "Chicken Soup",   description: "Spicy with garlic", price: "$10.00", img: "/images/chicken-soup.png" },
  { id: 15, category: "fastfood",name: "Chicken Soup",   description: "Spicy with garlic", price: "$10.00", img: "/images/chicken-soup.png" },
  { id: 16, category: "fastfood",name: "Chicken Soup",   description: "Spicy with garlic", price: "$10.00", img: "/images/chicken-soup.png" },
]

const MenuPage = () => {
  const t = useTranslations("Menu")
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = [
    { key: "all",      label: t("all") },
    { key: "first",    label: t("first") },
    { key: "second",   label: t("second") },
    { key: "salads",   label: t("salads") },
    { key: "drinks",   label: t("drinks") },
    { key: "fastfood", label: t("fastfood") },
  ]

  const filtered = activeCategory === "all"
    ? allDishes
    : allDishes.filter((d) => d.category === activeCategory)

  return (
    <section className="py-10">
      <div className="containers">
        <div className="bg-white/40 rounded-[50px] px-[68px] pb-16">

          {/* Navbar inside */}
          <Navbar />

          {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:underline cursor-pointer">{t("home")}</Link>
          <span>›</span>
          <span className="text-black font-medium">{t("title")}</span>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold text-center mb-10">{t("title")}</h1>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2 rounded-full border text-base cursor-pointer transition-all duration-200
                ${activeCategory === cat.key
                  ? "bg-black text-white border-black"
                  : "bg-white/60 text-black border-black/20 hover:border-black/50"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dishes Grid */}
        <div className="bg-white/30 rounded-[40px] p-10">
          <div className="grid grid-cols-4 gap-x-6 gap-y-20">
            {filtered.map((dish) => (
              <DishCard
                key={dish.id}
                id={dish.id}
                name={dish.name}
                description={dish.description}
                price={dish.price}
                img={dish.img}
              />
            ))}
          </div>
        </div>

      </div>
      </div>
    </section>
  )
}

export default MenuPage