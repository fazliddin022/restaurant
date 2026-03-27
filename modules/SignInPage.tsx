"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link, useRouter } from "@/i18n/navigation"
import { signIn } from "@/services/api"
import { PlateIcon } from "@/public/icons"
import { setCookie } from "cookies-next"
import React from "react"
import { toast } from "sonner"

const SignInPage = () => {
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      username: { value: string }
      password: { value: string }
    }
    const data = {
      username: target.username.value,
      password: target.password.value,
    }
    try {
      const res = await signIn(data)
      if (res) {
        setCookie("token", res.data.accessToken)
        setCookie("userId", String(res.data.user.id))
        setCookie("role", res.data.user.role)
        setCookie("userInfo", JSON.stringify({
          username: `${res.data.user.firstName} ${res.data.user.lastName}`
        }))
        toast.success("Successfully logged in", { position: "top-center" })
        if (res.data.user.role === "ADMIN") {
          router.push("/admin")
        } else {
          router.push("/")
        }
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Xatolik yuz berdi"
      toast.error(message, { position: "top-center" })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative px-4">
      <div className="relative w-[463px]">
        <div className="flex justify-center">
          <div className="bg-black px-7 py-6 rounded-full z-10 relative border-[6px] border-[#cccccc]">
            <PlateIcon />
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-[#cccccc] rounded-[31px] px-13 pt-12 pb-10 flex flex-col gap-8 -mt-8"
        >
          <h1 className="text-[32px] font-bold">Вход в аккаунт</h1>
          <Input name="username" placeholder="Ваше имя пользователя"
            className="border-transparent border-b-black rounded-none px-0 py-5 text-base! placeholder:text-[#585858]" />
          <div className="w-full">
            <Input name="password" type="password" placeholder="Пароль"
              className="border-transparent border-b-black rounded-none px-0 py-5 text-base! placeholder:text-[#585858]" />
            <p className="text-xs mt-2 font-semibold cursor-pointer">Забыли пароль?</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Button className="cursor-pointer py-7! px-9! rounded-[13px] text-base">
              Вход в аккаунт
            </Button>
            <Link href="/signup" className="text-[#06004C] text-xs font-bold cursor-pointer hover:underline">
              Еще нет учетной записи?
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignInPage