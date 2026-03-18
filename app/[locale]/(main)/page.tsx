import { Hero, WhyUs, NewsGallery } from "@/modules"
import PopularDishes from "@/modules/PopularDishes"
import TableReservation from "@/modules/TableReservation"
import { getProducts, getNews } from "@/services/api"

export default async function Home() {
  try {
    const [productsRes, newsRes] = await Promise.all([
      getProducts(),
      getNews(),
    ])

    return (
      <div>
        <Hero />
        <PopularDishes products={productsRes?.data ?? []} />
        <TableReservation />
        <WhyUs />
        <NewsGallery news={(newsRes?.data ?? []).slice(0, 3)} />
      </div>
    )
  } catch {
    return (
      <div>
        <Hero />
        <PopularDishes products={[]} />
        <TableReservation />
        <WhyUs />
        <NewsGallery news={[]} />
      </div>
    )
  }
}