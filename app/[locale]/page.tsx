import { Hero, PopularDishes, TableReservation, WhyUs, NewsGallery } from "@/modules";

export default function Home() {
  return (
    <div>
      <Hero />
      <PopularDishes />
      <TableReservation />
      <WhyUs />
      <NewsGallery />
    </div>
  );
}
