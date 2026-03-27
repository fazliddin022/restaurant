import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import AdminMenuClient from "@/modules/admin/AdminMenuClient"

const BASE = process.env.NEXT_PUBLIC_API_URL || "https://anorkhulov.uz/api"

async function getProducts() {
  const res = await fetch(`${BASE}/products`, { cache: "no-store" })
  const data = await res.json()
  return data?.data ?? []
}

async function getCategories() {
  const res = await fetch(`${BASE}/categories`, { cache: "no-store" })
  const data = await res.json()
  return data?.data ?? []
}

export async function deleteProduct(id: number) {
  "use server"
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value || ""
  await fetch(`${BASE}/products/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  })
  revalidatePath("/", "layout")
}

export async function createProduct(formData: FormData) {
  "use server"
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value || ""

  // multipart/form-data — fayl upload uchun
  const body = new FormData()
  body.append("name", formData.get("name") as string)
  body.append("description", formData.get("description") as string)
  body.append("price", String(Number(formData.get("price"))))
  body.append("categoryId", String(Number(formData.get("categoryId"))))
  const file = formData.get("image") as File | null
  if (file && file.size > 0) {
    body.append("image", file)
  }

  await fetch(`${BASE}/products`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      // Content-Type ni o'zi qo'yadi (multipart boundary bilan)
    },
    body,
  })
  revalidatePath("/", "layout")
}

export default async function AdminMenuPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()])

  return (
    <AdminMenuClient
      products={products}
      categories={categories}
      deleteProduct={deleteProduct}
      createProduct={createProduct}
    />
  )
}