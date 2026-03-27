"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { deleteCookie, getCookie } from "cookies-next"

export default function AdminNavbar() {
  const router = useRouter()
  const [username, setUsername] = useState("Admin")

  function handleLogout() {
    deleteCookie("token")
    deleteCookie("userId")
    deleteCookie("role")
    deleteCookie("userInfo")
    router.push("/signin")
  }

  useEffect(() => {
    try {
      const raw = getCookie("userInfo")
      if (!raw) return
      const parsed = JSON.parse(String(raw))
      if (parsed?.username && typeof parsed.username === "string") {
        setUsername(parsed.username)
      }
    } catch {
      setUsername("Admin")
    }
  }, [])

  return (
    <header className="bg-white shadow-sm px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2 text-gray-500 text-sm">
        <span>⬅</span>
        <button onClick={() => router.back()} className="hover:text-gray-800 cursor-pointer">Orqaga</button>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center text-sm font-bold">
            {username?.[0]?.toUpperCase() ?? "A"}
          </div>
          <span className="text-sm font-medium text-gray-700">{username}</span>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-red-500 hover:text-red-700 font-medium cursor-pointer border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
        >
          Chiqish
        </button>
      </div>
    </header>
  )
}