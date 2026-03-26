import { getProductById, getProducts } from "@/services/api"
import SingleProductContent from "./singleProductContent"
import { notFound } from "next/navigation"

export default async function SingleProductPage({
  params
}: {
  params: Promise<{ locale: string; id: string }>
}) {
  const { id } = await params
  try {
    const [productRes, similarRes] = await Promise.all([
      getProductById(Number(id)),
      getProducts(),
    ])
    const product = productRes?.data
    const similar = similarRes?.data?.filter(p => p.id !== product.id).slice(0, 6) ?? []
    return <SingleProductContent product={product} similar={similar} />
  } catch {
    notFound()
  }
}