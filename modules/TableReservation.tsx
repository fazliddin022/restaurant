import { DatePickerInput } from "@/components/customComponents/ReservationDatePicker"
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

const TableReservation = () => {
  const t = useTranslations("TableReservation")

  return (
    <div className="containers py-40 flex items-center justify-start relative">
      <form className="w-115.75 bg-[#cccccc] rounded-[31px]">
        <div className="flex flex-col items-start gap-10 py-10 px-13 relative pt-20 z-2">
          <div className="bg-black px-7 py-6 rounded-full absolute -top-10 border-6 border-[#cccccc]">
            <PlateIcon />
          </div>
          <h2 className="text-[32px] font-bold">{t("title")}</h2>

          <Input
            placeholder={t("phonePlaceholder")}
            className="border-transparent border-b-black rounded-none px-0 py-5 text-base!"
          />

          <Select>
            <SelectTrigger className="w-full border-transparent border-b-black rounded-none px-0 py-5 text-base!">
              <SelectValue placeholder={t("peoplePlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="0" disabled>{t("peoplePlaceholder")}</SelectItem>
                <SelectItem value="1">{t("person1")}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <DatePickerInput />

          <InputGroup>
            <InputGroupInput
              type="time"
              className="border-b text-base! border-black"
            />
          </InputGroup>

          <div className="w-full">
            <Select>
              <SelectTrigger className="w-full border-transparent border-b-black rounded-none px-0 pb-6 text-base!">
                <SelectValue placeholder={t("locationPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="0" disabled>{t("locationPlaceholder")}</SelectItem>
                  <SelectItem value="1">{t("location1")}</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <h2 className="text-[#06004C] text-sm mt-3 cursor-pointer">{t("mapLink")}</h2>
          </div>

          <Button className="cursor-pointer py-6! px-9!">{t("button")}</Button>
        </div>
      </form>
      <Image
        className="w-auto h-auto absolute -right-5"
        src={"/images/reservation-pizza.png"}
        alt="reservation-pizza"
        width={1025}
        height={936}
      />
    </div>
  )
}

export default TableReservation