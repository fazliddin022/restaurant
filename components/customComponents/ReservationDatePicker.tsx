"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Field } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"

function formatDate(date: Date | undefined) {
  if (!date) return ""
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

function isValidDate(date: Date | undefined) {
  return date instanceof Date && !isNaN(date.getTime())
}

export function DatePickerInput() {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined) // start with no date
  const [month, setMonth] = React.useState<Date | undefined>(new Date()) // calendar shows current month
  const [value, setValue] = React.useState("") // input initially empty

  return (
    <Field className="mx-auto ">
      <InputGroup className="border-black border-b rounded-none py-6 ">
        <InputGroupInput
          id="date-required"
          value={value}
          placeholder="Выберите время"
          className="px-0! text-base!"
          onChange={(e) => {
            const inputDate = new Date(e.target.value)
            setValue(e.target.value)
            if (isValidDate(inputDate)) {
              setDate(inputDate)
              setMonth(inputDate)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setOpen(true)
            }
          }}
        />
        <InputGroupAddon align="inline-end" className="px-0!">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild >
              <InputGroupButton
                id="date-picker"
                variant="link"
                size="icon-sm"
                className="pl-2! cursor-pointer"
                aria-label="Select date"
              >
                <CalendarIcon />
                <span className="sr-only">Select date</span>
              </InputGroupButton>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="end"
              alignOffset={-8}
              sideOffset={10}
            >
              <Calendar
                
                mode="single"
                selected={date}
                month={month}
                onMonthChange={setMonth}
                onSelect={(selectedDate) => {
                  setDate(selectedDate)
                  setValue(formatDate(selectedDate))
                  setOpen(false)
                }}
              />
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}