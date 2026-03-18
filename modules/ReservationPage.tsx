import Navbar from "./Navbar"
import { NewsGallery } from "@/modules"
import { DatePickerInput } from "@/components/customComponents/ReservationDatePicker"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupInput } from "@/components/ui/input-group"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import Image from "next/image"

const ReservationPage = () => {
  const t = useTranslations("ReservationPage")
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

  return (
    <>
      <section className="py-10">
        <div className="containers">
          <div className="bg-white/40 rounded-[50px] px-[68px] pb-16">

            <Navbar />

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 mt-18.25">
              <Link href="/" className="hover:underline cursor-pointer">{t("home")}</Link>
              <span>›</span>
              <span className="text-black font-medium">{t("title")}</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl font-bold text-center mb-14">{t("title")}</h1>

            {/* ── Working Hours + Image ── */}
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

            {/* ── Reservation Form ── */}
            <h2 className="text-4xl font-bold text-center mb-10">{t("wantToBook")}</h2>

            <div className="flex flex-col gap-8 max-w-[600px] mx-auto">
              <Input
                placeholder={tr("phonePlaceholder")}
                className="border-transparent border-b-black rounded-none px-0 py-5 text-base! bg-transparent"
              />
              <Select>
                <SelectTrigger className="w-full border-transparent border-b-black rounded-none px-0 py-5 text-base!">
                  <SelectValue placeholder={tr("peoplePlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="1">{tr("person1")}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <DatePickerInput />
              <InputGroup>
                <InputGroupInput type="time" className="border-b text-base! border-black" />
              </InputGroup>
              <Select>
                <SelectTrigger className="w-full border-transparent border-b-black rounded-none px-0 py-5 text-base!">
                  <SelectValue placeholder={tr("locationPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="1">{tr("location1")}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p className="text-[#06004C] text-sm cursor-pointer -mt-4">{tr("mapLink")}</p>
              <div className="flex justify-end">
                <Button className="cursor-pointer py-6! px-9!">{tr("button")}</Button>
              </div>
            </div>

            {/* ── Contact Us ── */}
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