"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link, useRouter } from "@/i18n/navigation"
import { signUp } from "@/services/api"
import { SubmitEvent } from "react"
import { toast } from "sonner"

const SignUpPage = () => {
  const router = useRouter()

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = {
      firstName: e.target.firstName.value,
      lastName:  e.target.lastName.value,
      email:     e.target.email.value,
      username:  e.target.username.value,
      password:  e.target.password.value,
    }
    const res = await signUp(data)
    if (res?.data?.accessToken) {
      toast.success("Account successfully created")
      setTimeout(() => {
        router.push("/signin")
      }, 1000)
    } else {
      toast.error("Error occured")
    }
  }

  return (
    <div className="containers flex py-15 justify-center relative">
      <form onSubmit={handleSubmit} className="w-[463px] bg-[#cccccc] rounded-[31px]">
        <div className="flex flex-col items-center gap-8 py-10 px-13 relative pt-20 z-2">
          <h2 className="text-[32px] font-bold">Зарегистрироваться</h2>
          <Input name="firstName" placeholder="Ваше имя"              className="border-transparent border-b-black rounded-none px-0 py-5 text-base! placeholder:text-[#585858]" />
          <Input name="lastName"  placeholder="Фамилия"               className="border-transparent border-b-black rounded-none px-0 py-5 text-base! placeholder:text-[#585858]" />
          <Input name="email"     placeholder="Ваш номер телефона"    className="border-transparent border-b-black rounded-none px-0 py-5 text-base! placeholder:text-[#585858]" />
          <Input name="username"  placeholder="Ваше имя пользователя" className="border-transparent border-b-black rounded-none px-0 py-5 text-base! placeholder:text-[#585858]" />
          <Input name="password"  placeholder="Пароль" type="password" className="border-transparent border-b-black rounded-none px-0 py-5 text-base! placeholder:text-[#585858]" />
          <Input                  placeholder="Подтвердите пароль" type="password" className="border-transparent border-b-black rounded-none px-0 py-5 text-base! placeholder:text-[#585858]" />
          <div className="flex items-start justify-center w-full gap-2">
            <Input type="checkbox" className="w-[16px] -mt-2" />
            <p className="text-xs">Я прочитал и принял Политику конфиденциальности и Условия*</p>
          </div>
          <div className="flex w-full justify-center items-center flex-col gap-3">
            <Button className="cursor-pointer py-8! px-6! rounded-[13px] text-base">
              Создать аккаунт
            </Button>
            <Link href="/signin" className="text-[#06004C] text-xs cursor-pointer font-bold">
              Уже есть аккаунт?
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignUpPage