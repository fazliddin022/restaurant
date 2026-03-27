import { cookies } from "next/headers"

const BASE = process.env.NEXT_PUBLIC_API_URL || "https://anorkhulov.uz/api"

async function getUsers(token: string) {
  const res = await fetch(`${BASE}/users`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  })
  const data = await res.json()
  return data?.data ?? []
}

export default async function UsersPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value || ""
  const users = await getUsers(token)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Foydalanuvchilar</h1>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 text-left">#</th>
              <th className="px-6 py-4 text-left">Ism</th>
              <th className="px-6 py-4 text-left">Username</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Role</th>
              <th className="px-6 py-4 text-left">Sana</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.length === 0 ? (
              <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-400">Ma'lumot topilmadi</td></tr>
            ) : users.map((user: any, i: number) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-gray-400">{i + 1}</td>
                <td className="px-6 py-4 font-medium text-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">
                      {user.firstName?.[0] ?? "?"}
                    </div>
                    {user.firstName} {user.lastName}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">@{user.username}</td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    user.role === "ADMIN" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-400">
                  {new Date(user.createdAt).toLocaleDateString("uz-UZ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}