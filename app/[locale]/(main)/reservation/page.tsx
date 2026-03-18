import ReservationPage from "@/modules/ReservationPage"
import { NewsGallery } from "@/modules"
import { getNews } from "@/services/api"

export default async function Reservation() {
  const newsRes = await getNews().catch(() => ({ data: [] }))

  return (
    <>
      <ReservationPage />
      <NewsGallery news={(newsRes?.data ?? []).slice(0, 3)} />
    </>
  )
}