"use client"

import { Input } from "@/components/ui/input"
import { PlateIcon } from "@/public/icons"
import { InputGroup, InputGroupInput } from "@/components/ui/input-group"
import { useTranslations } from "next-intl"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState, useEffect } from "react"
import { getTables, createReservation } from "@/services/api"
import { Table } from "@/@types"
import { toast } from "sonner"
import { getCookie } from "cookies-next"
import React from "react"


// Faqat haqiqiy stollar — 8 ta, 3+3+2 joylashuv
const TABLE_LAYOUT = [
  { slot: "mid-1", cx: 360, cy: 110, r: 72, tableNumber: 1 },
  { slot: "mid-2", cx: 550, cy: 110, r: 72, tableNumber: 2 },
  { slot: "mid-3", cx: 740, cy: 110, r: 72, tableNumber: 3 },
  { slot: "mid-4", cx: 360, cy: 290, r: 72, tableNumber: 4 },
  { slot: "mid-5", cx: 550, cy: 290, r: 72, tableNumber: 5 },
  { slot: "mid-6", cx: 740, cy: 290, r: 72, tableNumber: 6 },
  { slot: "mid-7", cx: 455, cy: 470, r: 72, tableNumber: 7 },
  { slot: "mid-8", cx: 645, cy: 470, r: 72, tableNumber: 8 },
]

function getTableColor(status: string, selected: boolean) {
  if (selected) return "#1a56db"
  if (status === "AVAILABLE") return "#16a34a"
  if (status === "OCCUPIED")  return "#b91c1c"
  if (status === "RESERVED")  return "#ca8a04"
  return "#9ca3af"
}

const TableReservation = () => {
  const t = useTranslations("TableReservation")

  const [tables, setTables]                   = useState<Table[]>([])
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null)
  const [showMapModal, setShowMapModal]       = useState(false)
  const [submitting, setSubmitting]           = useState(false)
  const [form, setForm] = useState({
    email: "",
    guestCount: "",
    reservationDate: "",
    reservationTime: "",
  })

  useEffect(() => {
    getTables()
      .then((res) => setTables(res.data ?? []))
      .catch(() => {})
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
    setShowMapModal(false)
    toast.success(`Stol #${tableNumber} tanlandi`, { position: "top-center" })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedTableId) {
      toast.error("Iltimos stol tanlang!", { position: "top-center" })
      return
    }
    if (!form.email || !form.reservationDate || !form.reservationTime) {
      toast.error("Barcha maydonlarni to'ldiring!", { position: "top-center" })
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
        guestCount: Number(form.guestCount) || 1,
        reservationDate: form.reservationDate,
        reservationTime: form.reservationTime,
        tableId: selectedTableId,
      })
      toast.success("Bron muvaffaqiyatli amalga oshirildi!", { position: "top-center" })
      setSelectedTableId(null)
      setForm({ email: "", guestCount: "", reservationDate: "", reservationTime: "" })
      getTables().then((res) => setTables(res.data ?? [])).catch(() => {})
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Xatolik yuz berdi"
      toast.error(message, { position: "top-center" })
    } finally {
      setSubmitting(false)
    }
  }

  const selectedTable = tables.find((t) => t.id === selectedTableId)

  return (
    <div className="containers py-40 flex items-center justify-start relative">

      {/* ── Stol xaritasi Modal ── */}
      {showMapModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setShowMapModal(false)}
        >
          <div
            className="bg-white rounded-[24px] p-8 w-full max-w-[980px] mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowMapModal(false)}
              className="absolute top-4 right-5 text-2xl text-gray-500 hover:text-black cursor-pointer"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-center mb-5">Выберите место</h2>
            <div className="flex items-center gap-6 justify-center mb-4 text-sm font-medium flex-wrap">
              <span className="flex items-center gap-2"><span className="w-4 h-4 rounded-full bg-green-600 inline-block"/>Место свободно</span>
              <span className="flex items-center gap-2"><span className="w-4 h-4 rounded-full bg-red-700 inline-block"/>Место занято в этот час</span>
              <span className="flex items-center gap-2"><span className="w-4 h-4 rounded-full bg-yellow-500 inline-block"/>Место занято в этот день</span>
              <span className="flex items-center gap-2"><span className="w-4 h-4 rounded-full bg-blue-600 inline-block"/>Выбрано</span>
            </div>

            <svg viewBox="0 0 900 620" xmlns="http://www.w3.org/2000/svg" className="w-full rounded-[16px] bg-gray-50">
              {/* Вход */}
              <rect x="370" y="555" width="130" height="48" rx="10" fill="#e5e7eb"/>
              <text x="435" y="584" textAnchor="middle" fontSize="14" fill="#6b7280" fontWeight="600">Вход</text>

              {/* Окна — o'ng tomonda 3 ta panel */}
              <rect x="862" y="30"  width="20" height="110" rx="5" fill="#d1d5db"/>
              <rect x="862" y="200" width="20" height="110" rx="5" fill="#d1d5db"/>
              <rect x="862" y="370" width="20" height="110" rx="5" fill="#d1d5db"/>
              <text x="888" y="290" textAnchor="middle" fontSize="11" fill="#9ca3af" transform="rotate(90 888 290)">Окна</text>

              {/* Chap dekor ovallar — zona belgisi */}
              <ellipse cx="100" cy="160" rx="58" ry="105" fill={
                tables.slice(0,4).every(t => t.status === "AVAILABLE") ? "#16a34a" :
                tables.slice(0,4).some(t => t.status === "OCCUPIED") ? "#b91c1c" : "#ca8a04"
              }/>
              <ellipse cx="100" cy="400" rx="58" ry="105" fill={
                tables.slice(4).every(t => t.status === "AVAILABLE") ? "#16a34a" :
                tables.slice(4).some(t => t.status === "OCCUPIED") ? "#b91c1c" : "#ca8a04"
              }/>

              {/* Haqiqiy stollar — bosiladi */}
              {TABLE_LAYOUT.map((tbl) => {
                const status   = getTableStatus(tbl.tableNumber)
                const tblId    = getTableId(tbl.tableNumber)
                const selected = tblId !== null && tblId === selectedTableId
                const color    = getTableColor(status, selected)
                const blocked  = status === "OCCUPIED"
                return (
                  <g key={tbl.slot} onClick={() => handleTableClick(tbl.tableNumber)}
                    style={{ cursor: blocked ? "not-allowed" : "pointer" }}>
                    <circle cx={tbl.cx} cy={tbl.cy} r={tbl.r} fill={color}/>
                    <text
                      x={tbl.cx} y={tbl.cy + 6}
                      textAnchor="middle" fontSize="15" fontWeight="700" fill="white"
                    >#{tbl.tableNumber}</text>
                  </g>
                )
              })}
            </svg>
          </div>
        </div>
      )}

      {/* ── Forma ── */}
      <form
        onSubmit={handleSubmit}
        className="w-115.75 bg-[#cccccc] rounded-[31px]"
      >
        <div className="flex flex-col items-start gap-10 py-10 px-13 relative pt-20 z-2">
          <div className="bg-black px-7 py-6 rounded-full absolute -top-10 border-6 border-[#cccccc]">
            <PlateIcon />
          </div>
          <h2 className="text-[32px] font-bold">{t("title")}</h2>

          <Input
            placeholder={t("phonePlaceholder")}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border-transparent border-b-black rounded-none px-0 py-5 text-base!"
          />

          <Select value={form.guestCount} onValueChange={(v) => setForm({ ...form, guestCount: v })}>
            <SelectTrigger className="w-full border-transparent border-b-black rounded-none px-0 py-5 text-base!">
              <SelectValue placeholder={t("peoplePlaceholder")} />
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
            className="border-transparent border-b-black rounded-none px-0 py-5 text-base! w-full"
          />

          <InputGroup>
            <InputGroupInput
              type="time"
              value={form.reservationTime}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, reservationTime: e.target.value })}
              className="border-b text-base! border-black"
            />
          </InputGroup>

          <div className="w-full">
            {/* Stol tanlash select */}
            <Select
              value={selectedTableId ? String(selectedTableId) : ""}
              onValueChange={(v) => setSelectedTableId(Number(v))}
            >
              <SelectTrigger className="w-full border-transparent border-b-black rounded-none px-0 pb-6 text-base!">
                <SelectValue placeholder={t("locationPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {tables.map((table) => (
                    <SelectItem
                      key={table.id}
                      value={String(table.id)}
                      disabled={table.status === "OCCUPIED"}
                    >
                      Stol #{table.tableNumber}
                      {table.status === "OCCUPIED" ? " (band)" : table.status === "RESERVED" ? " (bugun band)" : ""}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Xaritadan tanlash */}
            <p
              onClick={() => setShowMapModal(true)}
              className="text-[#06004C] text-sm mt-3 cursor-pointer hover:underline"
            >
              {selectedTable
                ? `✅ Stol #${selectedTable.tableNumber} tanlangan — o'zgartirish`
                : t("mapLink")
              }
            </p>
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="cursor-pointer py-6! px-9!"
          >
            {submitting ? "Yuborilmoqda..." : t("button")}
          </Button>
        </div>
      </form>

      <Image
        className="w-256.25 h-auto absolute -right-5"
        src={"/images/reservation-pizza.png"}
        alt="reservation-pizza"
        width={1025}
        height={936}
      />
    </div>
  )
}

export default TableReservation