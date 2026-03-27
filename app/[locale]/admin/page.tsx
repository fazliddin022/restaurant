import { cookies } from "next/headers"

const BASE = process.env.NEXT_PUBLIC_API_URL || "https://anorkhulov.uz/api"

async function getStats(token: string) {
  const [users, products, news, reservations] = await Promise.all([
    fetch(`${BASE}/users`, { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" }).then(r => r.json()).catch(() => ({ data: [] })),
    fetch(`${BASE}/products`, { cache: "no-store" }).then(r => r.json()).catch(() => ({ data: [] })),
    fetch(`${BASE}/news`, { cache: "no-store" }).then(r => r.json()).catch(() => ({ data: [] })),
    fetch(`${BASE}/reservations`, { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" }).then(r => r.json()).catch(() => ({ data: [] })),
  ])
  return {
    users: users?.data?.length ?? 0,
    products: products?.data?.length ?? 0,
    news: news?.data?.length ?? 0,
    reservations: reservations?.data?.length ?? 0,
  }
}

export default async function AdminDashboard() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value || ""
  const stats = await getStats(token)

  const cards = [
    { label: "Foydalanuvchilar", value: stats.users, icon: "👥", color: "bg-blue-500", href: "/admin/users" },
    { label: "Mahsulotlar", value: stats.products, icon: "🍽️", color: "bg-orange-500", href: "/admin/menu" },
    { label: "Yangiliklar", value: stats.news, icon: "📰", color: "bg-green-500", href: "/admin/news" },
    { label: "Bronlar", value: stats.reservations, icon: "📅", color: "bg-purple-500", href: "/admin/reservation" },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card) => (
          <a key={card.label} href={card.href} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
            <div className={`${card.color} w-14 h-14 rounded-xl flex items-center justify-center text-2xl`}>
              {card.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{card.label}</p>
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>
            </div>
          </a>
        ))}
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Xush kelibsiz, Admin! 👋</h2>
        <p className="text-gray-500 text-sm">Chap menyu orqali boshqaruv panelining bo'limlarini ko'rishingiz mumkin.</p>
      </div>
    </div>
  )
}