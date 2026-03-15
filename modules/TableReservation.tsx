import { DatePickerInput } from "@/components/customComponents/ReservationDatePicker"
import { Input } from "@/components/ui/input"
import { PlateIcon } from "@/public/icons"
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import Image from "next/image";

const TableReservation = () => {
  return (
    <div className="containers py-40 flex items-center justify-start relative">
      <form className="w-115.75 bg-[#cccccc] rounded-[31px]">
       <div className="flex flex-col items-start  gap-10  py-10 px-13 relative pt-20 z-2">
       <div className="bg-black px-7 py-6 rounded-full absolute -top-10 border-6 border-[#cccccc]">
        <PlateIcon/>
        </div>
        <h2 className="text-[32px] font-bold">Забронировать стол</h2>

        <Input  placeholder="Ваш Номер" className=" border-transparent border-b-black rounded-none px-0 py-5 text-base!"/>

        <Select>
  <SelectTrigger className="w-full border-transparent border-b-black rounded-none px-0 py-5  text-base!">
    <SelectValue placeholder="На сколько человек?" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      {/* Placeholder, disabled so not selectable */}
      <SelectItem value="0" disabled>
        На сколько человек?
      </SelectItem>

      {/* Actual selectable items */}
      <SelectItem value="1">1 человек</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>

  {/* The actual time input */}
  <DatePickerInput />
<InputGroup>
      {/* The actual time input */}
      <InputGroupInput
     
        type="time"
        className="border-b text-base! border-black"
      />
    </InputGroup>

    
       
<div className="w-full">
<Select>
  <SelectTrigger className="w-full border-transparent border-b-black rounded-none px-0 pb-6 text-base! ">
    <SelectValue placeholder="Выберите место" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      {/* Placeholder, disabled so not selectable */}
      <SelectItem value="0" disabled>
      Выберите место
      </SelectItem>

      {/* Actual selectable items */}
      <SelectItem value="1">Ташкент</SelectItem>
    </SelectGroup>
  </SelectContent>

</Select>
<h2 className="text-[#06004C] text-sm mt-3 cursor-pointer">Выбрать места на карте</h2>
</div>
<Button className="cursor-pointer py-6! px-9!">Забронировать </Button>
       </div>

      </form>
     <Image className="w-auto h-auto absolute -right-5" src={"/images/reservation-pizza.png"} alt="order-image" width={1025} height={936}/>
    </div>
  )
}

export default TableReservation