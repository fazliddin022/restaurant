import { Button } from "@/components/ui/button"
import { MailIcon, PhoneIcon, RussiaFlag, SignInIcon } from "@/public/icons"

const SiteHeader = () => {
  return (
    <section className="py-3">
      <div className="containers flex items-center justify-between">
        <div className="flex gap-6.75">
          <span className="flex items-center gap-3"><PhoneIcon /> <p>+998(90)758383833</p></span>
          <span className="flex items-center gap-3"><MailIcon /><p>info@bmgsoft.com</p></span>
        </div>
        <div className="flex gap-9">
          <div className="flex items-center">
            <RussiaFlag />
            <select className="px-3 outline-none cursor-pointer" suppressHydrationWarning>
              <option value="russian">Русский</option>
            </select>
          </div>
          <Button className="py-3! px-3.5! text-sm cursor-pointer"><SignInIcon /> Вход в аккаунт</Button>
        </div>
      </div>
    </section>
  )
}

export default SiteHeader