import AboutPage from "@/modules/AboutPage"
import { NewsGallery } from "@/modules"
import { getNews, getCooks } from "@/services/api"

export default async function About() {
  const [newsRes, cooksRes] = await Promise.all([
    getNews().catch(() => ({ data: [] })),
    getCooks().catch(() => ({ data: [] })),
  ])

  return (
    <>
      <AboutPage team={cooksRes?.data ?? []} />
      <NewsGallery news={(newsRes?.data ?? []).slice(0, 3)} />
    </>
  )
}