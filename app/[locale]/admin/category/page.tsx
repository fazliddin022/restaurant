import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

const BASE = process.env.NEXT_PUBLIC_API_URL || "https://anorkhulov.uz/api"

async function getCategories() {
  const res = await fetch(`${BASE}/categories`, { cache: "no-store" })
  const data = await res.json()
  return data?.data ?? []
}

export default async function AdminCategoryPage() {
  const categories = await getCategories()

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Kategoriyalar ({categories.length})</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat: any) => (
          <div key={cat.id} className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                {cat.name?.[0]}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{cat.name}</p>
                <p className="text-xs text-gray-400">{cat.products?.length ?? 0} ta mahsulot</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              {(cat.products ?? []).slice(0, 3).map((p: any) => (
                <span key={p.id} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{p.name}</span>
              ))}
              {(cat.products?.length ?? 0) > 3 && (
                <span className="text-xs text-gray-400 px-2 py-1">+{cat.products.length - 3} ta</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}