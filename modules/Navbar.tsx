import { Button } from "@/components/ui/button"
import { CartIcon, LikedIcon } from "@/public/icons"
import Image from "next/image"

const navLinks = [
  { id: 1, label: "Меню" },
  { id: 2, label: "Новости" },
  { id: 3, label: "Бронирование" },
  { id: 4, label: "О нас" },
  { id: 5, label: "Контакты" },
]

const Navbar = () => {
  return (
    <div className="flex items-center justify-between py-10">
      <Image
        className="w-auto h-auto"
        src={"/images/bonappetit-logo.svg"}
        alt="website-logo"
        width={136}
        height={71}
      />
      <ul className="flex items-center gap-11">
        {navLinks.map((link) => (
          <li
            key={link.id}
            className="text-lg cursor-pointer relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-black hover:after:w-full after:transition-all after:duration-300"
          >
            {link.label}
          </li>
        ))}
      </ul>
      <div className="flex gap-5">
        <Button
          size={"icon"}
          className="cursor-pointer rounded-full bg-transparent border-2 border-black pt-0.5 hover:bg-black hover:text-white transition-colors duration-300"
        >
          <LikedIcon />
        </Button>
        <Button
          size={"icon"}
          className="cursor-pointer relative rounded-full bg-transparent border-2 border-black pt-0.5 hover:bg-black hover:text-white transition-colors duration-300"
        >
          <CartIcon />
          <div className="absolute -top-1 -right-1.5 bg-[#FF0000] w-3.5 h-3.5 rounded-full text-[10px] flex items-center justify-center">
            <p>1</p>
          </div>
        </Button>
      </div>
    </div>
  )
}

export default Navbar
