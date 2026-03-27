import { cookies } from "next/headers"

const BASE = process.env.NEXT_PUBLIC_API_URL || "https://anorkhulov.uz/api"

async function getContacts(token: string) {
  const res = await fetch(`${BASE}/contact`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  })
  const data = await res.json()
  return data?.data ?? []
}

export default async function AdminContactPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value || ""
  const contacts = await getContacts(token)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Xabarlar ({contacts.length})</h1>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 text-left">#</th>
              <th className="px-6 py-4 text-left">Ism</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Telefon</th>
              <th className="px-6 py-4 text-left">Xabar</th>
              <th className="px-6 py-4 text-left">Sana</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {contacts.length === 0 ? (
              <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-400">Xabarlar mavjud emas</td></tr>
            ) : contacts.map((c: any, i: number) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-400">{i + 1}</td>
                <td className="px-6 py-4 font-medium text-gray-800">{c.name}</td>
                <td className="px-6 py-4 text-gray-600">{c.email}</td>
                <td className="px-6 py-4 text-gray-600">{c.phone}</td>
                <td className="px-6 py-4 text-gray-600 max-w-[250px]">
                  <p className="truncate">{c.message}</p>
                </td>
                <td className="px-6 py-4 text-gray-400 text-xs">
                  {c.createdAt ? new Date(c.createdAt).toLocaleDateString("uz-UZ") : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}