import { SiteHeader, Footer } from "@/modules"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  )
}