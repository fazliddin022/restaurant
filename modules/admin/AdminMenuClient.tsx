"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface Product {
  id: number
  name: string
  description: string
  price: string
  image: string
  category?: { id: number; name: string }
  isAvailable: boolean
}

interface Category {
  id: number
  name: string
}

interface Props {
  products: Product[]
  categories: Category[]
  deleteProduct: (id: number) => Promise<void>
  createProduct: (formData: FormData) => Promise<void>
}

const BASE_IMG = process.env.NEXT_PUBLIC_IMAGE_URL || "https://anorkhulov.uz/uploads"

export default function AdminMenuClient({ products, categories, deleteProduct, createProduct }: Props) {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [deleting, setDeleting] = useState<number | null>(null)

  function handleDelete(id: number) {
    if (!confirm("O'chirishni tasdiqlaysizmi?")) return
    setDeleting(id)
    startTransition(async () => {
      await deleteProduct(id)
      toast.success("Mahsulot o'chirildi")
      setDeleting(null)
      router.refresh()
    })
  }

  function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      await createProduct(formData)
      toast.success("Mahsulot qo'shildi!")
      setShowModal(false)
      router.refresh()
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Menu ({products.length})</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-700 transition-colors cursor-pointer"
        >
          + Mahsulot qo'shish
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 text-left">#</th>
              <th className="px-6 py-4 text-left">Rasm</th>
              <th className="px-6 py-4 text-left">Nomi</th>
              <th className="px-6 py-4 text-left">Kategoriya</th>
              <th className="px-6 py-4 text-left">Narx</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Amal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((p, i) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-400">{i + 1}</td>
                <td className="px-6 py-4">
                  <img
                    src={`${BASE_IMG}/${p.image}`}
                    alt={p.name}
                    className="w-12 h-12 object-cover rounded-lg bg-gray-100"
                    onError={(e) => { 
                      const img = e.target as HTMLImageElement
                      img.onerror = null
                      img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-size='20'%3E🍽%3C/text%3E%3C/svg%3E"
                    }}
                  />
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-800">{p.name}</p>
                  <p className="text-gray-400 text-xs truncate max-w-[200px]">{p.description}</p>
                </td>
                <td className="px-6 py-4 text-gray-600">{p.category?.name ?? "—"}</td>
                <td className="px-6 py-4 font-semibold text-gray-800">${p.price}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    p.isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}>
                    {p.isAvailable ? "Mavjud" : "Mavjud emas"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(p.id)}
                    disabled={deleting === p.id}
                    className="text-red-500 hover:text-red-700 text-xs font-medium cursor-pointer disabled:opacity-40"
                  >
                    {deleting === p.id ? "..." : "O'chirish"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-6">Yangi mahsulot</h2>
            <form onSubmit={handleCreate} className="flex flex-col gap-4">
              <input name="name" required placeholder="Nomi" className="border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gray-300" />
              <textarea name="description" placeholder="Tavsif" className="border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gray-300 resize-none" rows={3} />
              <input name="price" type="number" required placeholder="Narx" className="border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gray-300" />
              <select name="categoryId" required className="border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gray-300">
                <option value="">Kategoriya tanlang</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Rasm (fayl)</label>
                <input name="image" type="file" accept="image/*" className="block w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer" />
              </div>
              <div className="flex gap-3 mt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 border rounded-xl py-2.5 text-sm cursor-pointer hover:bg-gray-50">Bekor qilish</button>
                <button type="submit" disabled={isPending} className="flex-1 bg-gray-900 text-white rounded-xl py-2.5 text-sm cursor-pointer hover:bg-gray-700 disabled:opacity-50">
                  {isPending ? "Saqlanmoqda..." : "Saqlash"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}