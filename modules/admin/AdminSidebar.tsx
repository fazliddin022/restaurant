"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { label: "Dashboard", icon: "🏠", href: "/admin" },
  { label: "Users", icon: "👥", href: "/admin/users" },
  { label: "Menu", icon: "🍽️", href: "/admin/menu" },
  { label: "Category", icon: "📂", href: "/admin/category" },
  { label: "News", icon: "📰", href: "/admin/news" },
  { label: "Reservation", icon: "📅", href: "/admin/reservation" },
  { label: "Contact", icon: "✉️", href: "/admin/contact" },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  // Extract path without locale prefix (e.g. /uz/admin/users -> /admin/users)
  const cleanPath = "/" + pathname.split("/").slice(2).join("/")

  return (
    <aside className="w-60 min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="px-6 py-5 border-b border-gray-700">
        <h1 className="text-xl font-bold tracking-wide">🍕 Admin Panel</h1>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = cleanPath === item.href || (item.href !== "/admin" && cleanPath.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-gray-700 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}