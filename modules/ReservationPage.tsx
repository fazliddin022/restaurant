"use client"

import Navbar from "./Navbar"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupInput } from "@/components/ui/input-group"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import Image from "next/image"
import { useState, useEffect } from "react"
import { getTables, createReservation, Table } from "@/services/api"
import { toast } from "sonner"
import { getCookie } from "cookies-next"
import React from "react"

// Faqat haqiqiy stollar (3x3 grid) — bosiladi
const TABLE_LAYOUT = [
  { slot: "mid-1", cx: 340, cy: 130, r: 85, tableNumber: 1 },
  { slot: "mid-2", cx: 545, cy: 130, r: 85, tableNumber: 2 },
  { slot: "mid-3", cx: 750, cy: 130, r: 85, tableNumber: 3 },
  { slot: "mid-4", cx: 340, cy: 320, r: 85, tableNumber: 4 },
  { slot: "mid-5", cx: 545, cy: 320, r: 85, tableNumber: 5 },
  { slot: "mid-6", cx: 750, cy: 320, r: 85, tableNumber: 6 },
  { slot: "mid-7", cx: 340, cy: 510, r: 85, tableNumber: 7 },
  { slot: "mid-8", cx: 545, cy: 510, r: 85, tableNumber: 8 },
]

function getTableColor(status: string, selected: boolean) {
  if (selected) return "#1a56db"
  if (status === "AVAILABLE") return "#16a34a"
  if (status === "OCCUPIED")  return "#b91c1c"
  if (status === "RESERVED")  return "#ca8a04"
  return "#9ca3af"
}

const ReservationPage = () => {
  const t  = useTranslations("ReservationPage")
  const tr = useTranslations("TableReservation")

  const workingHours = [
    { day: t("monday"),    hours: "10:00–23:00" },
    { day: t("tuesday"),   hours: "10:00–23:00" },
    { day: t("wednesday"), hours: "10:00–23:00" },
    { day: t("thursday"),  hours: "10:00–23:00" },
    { day: t("friday"),    hours: "10:00–23:00" },
    { day: t("saturday"),  hours: "10:00–23:00" },
    { day: t("sunday"),    hours: "11:00–22:00" },
  ]

  const contacts = [
    {
      id: 1,
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      ),
      title: t("writeUs"),
      lines: ["info@bmgsoft.com", "t.me/bmgsoft.com"],
    },
    {
      id: 2,
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
        </svg>
      ),
      title: t("callUs"),
      lines: ["+998903617888", "+998865332322"],
    },
    {
      id: 3,
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
        </svg>
      ),
      title: t("visitUs"),
      lines: [t("address1"), t("address2")],
    },
  ]

  const [tables, setTables]                   = useState<Table[]>([])
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null)
  const [loadingTables, setLoadingTables]     = useState(false)
  const [submitting, setSubmitting]           = useState(false)
  const [showMapModal, setShowMapModal]       = useState(false)
  const [form, setForm] = useState({
    email: "",
    guestCount: "1",
    reservationDate: "",
    reservationTime: "",
  })

  // Backenddan kelgan unique location'lar (modal uchun)

  useEffect(() => {
    setLoadingTables(true)
    getTables()
      .then((res) => setTables(res.data ?? []))
      .catch(() => toast.error("Stollarni yuklashda xatolik"))
      .finally(() => setLoadingTables(false))
  }, [])

  function getTableStatus(tableNumber: number): string {
    return tables.find((t) => t.tableNumber === tableNumber)?.status ?? "AVAILABLE"
  }
  function getTableId(tableNumber: number): number | null {
    return tables.find((t) => t.tableNumber === tableNumber)?.id ?? null
  }

  function handleTableClick(tableNumber: number) {
    const status = getTableStatus(tableNumber)
    if (status === "OCCUPIED") {
      toast.error("Bu stol hozir band!", { position: "top-center" })
      return
    }
    const id = getTableId(tableNumber)
    setSelectedTableId(id)
    toast.success(`Stol #${tableNumber} tanlandi`, { position: "top-center" })
  }

  async function handleSubmit() {
    if (!selectedTableId) {
      toast.error("Iltimos stol tanlang!", { position: "top-center" })
      return
    }
    if (!form.email || !form.reservationDate || !form.reservationTime) {
      toast.error("Ism, sana va vaqtni to'ldiring!", { position: "top-center" })
      return
    }
    const token = getCookie("token") as string | undefined
    if (!token) {
      toast.error("Bron qilish uchun tizimga kiring!", { position: "top-center" })
      return
    }
    setSubmitting(true)
    try {
      await createReservation(token, {
        email: form.email,
        guestCount: Number(form.guestCount),
        reservationDate: form.reservationDate,
        reservationTime: form.reservationTime,
        tableId: selectedTableId,
      })
      toast.success("Bron muvaffaqiyatli amalga oshirildi!", { position: "top-center" })
      setSelectedTableId(null)
      setForm({ email: "", guestCount: "1", reservationDate: "", reservationTime: "" })
      getTables().then((res) => setTables(res.data ?? [])).catch(() => {})
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Xatolik yuz berdi"
      toast.error(message, { position: "top-center" })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <section className="py-10">
        <div className="containers">
          <div className="bg-white/40 rounded-[50px] px-[68px] pb-16">

            <Navbar />

            <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 mt-18.25">
              <Link href="/" className="hover:underline cursor-pointer">{t("home")}</Link>
              <span>›</span>
              <span className="text-black font-medium">{t("title")}</span>
            </div>

            <h1 className="text-5xl font-bold text-center mb-14">{t("title")}</h1>

            {/* Ish vaqtlari + Rasm */}
            <div className="flex items-center justify-between gap-10 mb-16">
              <div className="w-[554px] shrink-0">
                <h2 className="text-2xl font-bold mb-6">{t("workingHours")}</h2>
                <table className="w-full">
                  <tbody>
                    {workingHours.map((row) => (
                      <tr key={row.day} className="border-b border-black/10">
                        <td className="py-3 text-base">{row.day}</td>
                        <td className="py-3 text-base text-right font-medium">{row.hours}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="shrink-0">
                <Image
                  src={"/images/glass-img.png"}
                  alt="restaurant"
                  width={503}
                  height={402}
                  className="w-[503px] h-[676px] object-cover rounded-[24px]"
                />
              </div>
            </div>

            {/* ── Stol xaritasi MODAL ── */}
            {showMapModal && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
                onClick={() => setShowMapModal(false)}
              >
                <div
                  className="bg-white rounded-[24px] p-8 w-full max-w-[860px] mx-4 relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Yopish tugmasi */}
                  <button
                    onClick={() => setShowMapModal(false)}
                    className="absolute top-4 right-5 text-2xl text-gray-500 hover:text-black cursor-pointer"
                  >
                    ✕
                  </button>

                  <h2 className="text-2xl font-bold text-center mb-4">Выберите место</h2>

                  {/* Legend */}
                  <div className="flex items-center gap-5 justify-end mb-3 text-sm font-medium">
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-green-600 inline-block"/>Bo&apos;sh</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-700 inline-block"/>Hozir band</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"/>Bugun band</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-600 inline-block"/>Tanlangan</span>
                  </div>

                  {loadingTables ? (
                    <div className="flex justify-center items-center h-[480px] text-gray-500">Yuklanmoqda...</div>
                  ) : (
                    <svg viewBox="0 0 880 640" xmlns="http://www.w3.org/2000/svg" className="w-full rounded-[16px] bg-gray-50">
                      {/* Вход */}
                      <rect x="340" y="565" width="140" height="58" rx="12" fill="#e5e7eb"/>
                      <text x="410" y="599" textAnchor="middle" fontSize="15" fill="#374151" fontWeight="600">Вход</text>
                      {/* Окна */}
                      <rect x="848" y="40"  width="22" height="120" rx="6" fill="#d1d5db"/>
                      <rect x="848" y="220" width="22" height="120" rx="6" fill="#d1d5db"/>
                      <rect x="848" y="400" width="22" height="120" rx="6" fill="#d1d5db"/>
                      <text x="876" y="310" textAnchor="middle" fontSize="12" fill="#9ca3af" transform="rotate(90 876 310)">Окна</text>

                      {/* Chap dekor ovallar — zona belgisi */}
                      <ellipse cx="105" cy="175" rx="65" ry="115" fill={
                        tables.slice(0,3).every(t => t.status === "AVAILABLE") ? "#16a34a" :
                        tables.slice(0,3).some(t => t.status === "OCCUPIED") ? "#b91c1c" : "#ca8a04"
                      }/>
                      <ellipse cx="105" cy="435" rx="65" ry="115" fill={
                        tables.slice(3).every(t => t.status === "AVAILABLE") ? "#16a34a" :
                        tables.slice(3).some(t => t.status === "OCCUPIED") ? "#b91c1c" : "#ca8a04"
                      }/>

                      {/* Haqiqiy stollar */}
                      {TABLE_LAYOUT.map((tbl) => {
                        const status   = getTableStatus(tbl.tableNumber)
                        const tblId    = getTableId(tbl.tableNumber)
                        const selected = tblId !== null && tblId === selectedTableId
                        const color    = getTableColor(status, selected)
                        const blocked  = status === "OCCUPIED"
                        return (
                          <g key={tbl.slot} onClick={() => {
                            handleTableClick(tbl.tableNumber)
                            if (status !== "OCCUPIED") setShowMapModal(false)
                          }} style={{ cursor: blocked ? "not-allowed" : "pointer" }}>
                            <circle cx={tbl.cx} cy={tbl.cy} r={tbl.r} fill={color}/>
                            <text
                              x={tbl.cx} y={tbl.cy + 6}
                              textAnchor="middle" fontSize="13" fontWeight="700" fill="white"
                            >#{tbl.tableNumber}</text>
                          </g>
                        )
                      })}
                    </svg>
                  )}

                  {selectedTableId && (
                    <p className="mt-3 text-center text-sm font-semibold text-blue-700">
                      ✅ Stol #{tables.find((t) => t.id === selectedTableId)?.tableNumber} tanlandi
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* ── Forma ── */}
            <h2 className="text-4xl font-bold text-center mb-10">{t("wantToBook")}</h2>

            <div className="flex flex-col gap-8 max-w-[600px] mx-auto">
              <Input
                placeholder="Email *"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="border-transparent border-b-black rounded-none px-0 py-5 text-base! bg-transparent"
              />
              <Select value={form.guestCount} onValueChange={(v) => setForm({ ...form, guestCount: v })}>
                <SelectTrigger className="w-full border-transparent border-b-black rounded-none px-0 py-5 text-base!">
                  <SelectValue placeholder={tr("peoplePlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {[1,2,3,4,5,6,7,8].map((n) => (
                      <SelectItem key={n} value={String(n)}>{n} kishi</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Input
                type="date"
                value={form.reservationDate}
                onChange={(e) => setForm({ ...form, reservationDate: e.target.value })}
                className="border-transparent border-b-black rounded-none px-0 py-5 text-base! bg-transparent"
              />
              <InputGroup>
                <InputGroupInput
                  type="time"
                  value={form.reservationTime}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, reservationTime: e.target.value })}
                  className="border-b text-base! border-black"
                />
              </InputGroup>

              {/* Stol tanlash — backenddan */}
              <Select
                value={selectedTableId ? String(selectedTableId) : ""}
                onValueChange={(v) => setSelectedTableId(Number(v))}
              >
                <SelectTrigger className="w-full border-transparent border-b-black rounded-none px-0 py-5 text-base!">
                  <SelectValue placeholder={tr("locationPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {tables.map((table) => (
                      <SelectItem
                        key={table.id}
                        value={String(table.id)}
                        disabled={table.status === "OCCUPIED"}
                      >
                        Stol #{table.tableNumber} — {table.location}
                        {table.status === "OCCUPIED" ? " (band)" : table.status === "RESERVED" ? " (bugun band)" : ""}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* Xaritadan stol tanlash */}
              <p
                onClick={() => setShowMapModal(true)}
                className="text-[#06004C] text-sm cursor-pointer -mt-4 hover:underline"
              >
                {selectedTableId
                  ? `✅ Stol #${tables.find((t) => t.id === selectedTableId)?.tableNumber} tanlangan — o'zgartirish`
                  : tr("mapLink")
                }
              </p>

              <div className="flex justify-end">
                <Button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="cursor-pointer py-6! px-9!"
                >
                  {submitting ? "Yuborilmoqda..." : tr("button")}
                </Button>
              </div>
            </div>

            {/* Contact */}
            <h2 className="text-4xl font-bold text-center mt-16 mb-12">{t("contactUs")}</h2>
            <div className="flex items-start justify-center gap-24">
              {contacts.map((c) => (
                <div key={c.id} className="flex flex-col items-center gap-3 text-center">
                  <div className="text-black">{c.icon}</div>
                  <h3 className="text-xl font-bold">{c.title}</h3>
                  {c.lines.map((line, i) => (
                    <p key={i} className="text-sm text-gray-700">{line}</p>
                  ))}
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

export default ReservationPage