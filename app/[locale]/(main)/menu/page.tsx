import MenuPage from "@/modules/MenuPage"
import { NewsGallery } from "@/modules"
import { getNews } from "@/services/api"

export default async function Menu() {
  const newsRes = await getNews().catch(() => ({ data: [] }))

  return (
    <div>
      <MenuPage />
      <NewsGallery news={(newsRes?.data ?? []).slice(0, 3)} />
    </div>
  )
}