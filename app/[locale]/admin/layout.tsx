import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import AdminSidebar from "@/modules/admin/AdminSidebar"
import AdminNavbar from "@/modules/admin/AdminNavbar"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const role = cookieStore.get("role")?.value

  if (role !== "ADMIN") {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}