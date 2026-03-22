import AboutPage from "@/modules/AboutPage"
import { NewsGallery } from "@/modules"
import { getNews } from "@/services/api"

export default async function About() {
  const newsRes = await getNews().catch(() => ({ data: [] }))
  return (
    <>
      <AboutPage />
      <NewsGallery news={(newsRes?.data ?? []).slice(0, 3)} />
    </>
  )
}