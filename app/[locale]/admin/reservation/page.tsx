import { cookies } from "next/headers"

const BASE = process.env.NEXT_PUBLIC_API_URL || "https://anorkhulov.uz/api"

async function getReservations(token: string) {
  const res = await fetch(`${BASE}/reservations`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  })
  const data = await res.json()
  return data?.data ?? []
}

export default async function AdminReservationPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value || ""
  const reservations = await getReservations(token)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Bronlar ({reservations.length})</h1>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 text-left">#</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Stol</th>
              <th className="px-6 py-4 text-left">Mehmonlar</th>
              <th className="px-6 py-4 text-left">Sana</th>
              <th className="px-6 py-4 text-left">Vaqt</th>
              <th className="px-6 py-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {reservations.length === 0 ? (
              <tr><td colSpan={7} className="px-6 py-8 text-center text-gray-400">Bronlar mavjud emas</td></tr>
            ) : reservations.map((r: any, i: number) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-400">{i + 1}</td>
                <td className="px-6 py-4 text-gray-700">{r.email}</td>
                <td className="px-6 py-4 text-gray-700">#{r.table?.tableNumber ?? r.tableId}</td>
                <td className="px-6 py-4 text-gray-700">{r.guestCount} kishi</td>
                <td className="px-6 py-4 text-gray-700">{r.reservationDate}</td>
                <td className="px-6 py-4 text-gray-700">{r.reservationTime}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    r.status === "CONFIRMED" ? "bg-green-100 text-green-700" :
                    r.status === "CANCELLED" ? "bg-red-100 text-red-700" :
                    "bg-yellow-100 text-yellow-700"
                  }`}>
                    {r.status ?? "PENDING"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}