"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link, useRouter } from "@/i18n/navigation"
import { PlateIcon } from "@/public/icons"
import { signIn } from "@/services/api"
import { setCookie } from "cookies-next"
import { SubmitEvent } from "react"
import { toast } from "sonner"

const SignInPage = () => {
  const router = useRouter()

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
    }
    const res = await signIn(data)
    if (res) {
      setCookie("token", res.data.accessToken)
      setCookie("userInfo", JSON.stringify({
        username: `${res.data.user.firstName} ${res.data.user.lastName}`
      }))
      router.push("/")
      toast.success("Successfully logged in", { position: "top-center" })
    } else {
      toast.error("Error occured", { position: "top-center" })
    }
  }

  return (
    <div className="containers py-40 flex items-center justify-center relative">
      <form onSubmit={handleSubmit} className="w-[463px] bg-[#cccccc] rounded-[31px]">
        <div className="flex flex-col items-start gap-8 py-10 px-13 relative pt-20 z-2">
          <div className="bg-black px-7 py-6 rounded-full absolute -top-10 border-6 border-[#cccccc]">
            <PlateIcon />
          </div>
          <h2 className="text-[32px] font-bold">Вход в аккаунт</h2>
          <Input
            name="username"
            placeholder="Ваше имя пользователя"
            className="border-transparent border-b-black rounded-none px-0 py-5 text-base! placeholder:text-[#585858]"
          />
          <div className="w-full">
            <Input
              name="password"
              placeholder="Пароль"
              type="password"
              className="border-transparent border-b-black rounded-none px-0 py-5 text-base! placeholder:text-[#585858]"
            />
            <h2 className="cursor-pointer mt-3 text-xs font-semibold">Забыли пароль?</h2>
          </div>
          <div className="flex w-full justify-center items-center flex-col gap-3">
            <Button className="cursor-pointer py-7! px-9! rounded-[13px] text-base">
              Вход в аккаунт
            </Button>
            <Link href="/signup" className="text-[#06004C] text-xs cursor-pointer font-bold">
              Еще нет учетной записи?
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignInPage