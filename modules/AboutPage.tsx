import Navbar from "./Navbar"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "@/public/icons"
import Image from "next/image"

const team = [
  { id: 1, name: "Александр Петро",  role: "главный повар",   img: "/images/gallery-photo.png" },
  { id: 2, name: "Александр Петро",  role: "помощник повара", img: "/images/gallery-photo.png" },
  { id: 3, name: "Александр Петро",  role: "бургер кинг",     img: "/images/gallery-photo.png" },
  { id: 4, name: "Джулия Вильям",    role: "официантка",      img: "/images/gallery-photo.png" },
  { id: 5, name: "Джулия Вильям",    role: "официантка",      img: "/images/gallery-photo.png" },
  { id: 6, name: "Джулия Вильям",    role: "официантка",      img: "/images/gallery-photo.png" },
]

const AboutPage = () => {
  return (
    <section className="py-10">
      <div className="containers">
        <div className="bg-white/40 rounded-[50px] px-17 pb-16">
          <Navbar />

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:underline cursor-pointer">Главная</Link>
            <span>›</span>
            <span className="text-black font-medium">О нас</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl font-bold text-center mb-10">О нас</h1>

          {/* Intro text */}
          <p className="text-base leading-relaxed text-center max-w-4xl mx-auto mb-16 text-gray-700">
            С 1995 года наша миссия в ресторане — питать и вдохновлять каждого члена команды, гостя
            и сообщество, которому мы служим. Спустя все эти годы эти основные ценности остаются
            в основе всего, что мы делаем. От нашего меню до наших услуг и способов ведения бизнеса —
            наш свежий, неожиданный и человечный взгляд отличает нас. Мы называем это Необыкновенной Добротой.
            И это во всём, что мы делаем.
          </p>

          {/* Our Food */}
          <div className="flex items-center gap-16 mb-16">
            <div className="flex-1">
              <h2 className="text-4xl font-bold mb-6">Наша еда</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Наша страсть — создавать исключительные впечатления от еды по отличной цене. От традиционных
                и современных блюд до наших собственных кулинарных творений, таких как фаршированные тортеллини
                премиум-класса, наши свежеприготовленные рецепты отличаются индивидуальностью, креативностью
                и ярким вкусом кухонь всего мира.
              </p>
              <Button className="cursor-pointer py-6! px-5! rounded-br-none gap-2">
                Посмотреть меню <ArrowRightIcon />
              </Button>
            </div>
            <div className="w-105 shrink-0">
              <Image
                src="/images/gallery-photo.png"
                alt="our-food"
                width={420}
                height={340}
                className="w-full h-85 object-cover rounded-[24px]"
              />
            </div>
          </div>

          {/* Our Journey */}
          <div className="flex items-center gap-16 mb-16">
            <div className="w-105 shrink-0">
              <Image
                src="/images/gallery-photo.png"
                alt="our-journey"
                width={420}
                height={340}
                className="w-full h-85 object-cover rounded-[24px]"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-4xl font-bold mb-6">Наш путь</h2>
              <p className="text-gray-700 leading-relaxed">
                С самого начала мы взяли на себя обязательство предлагать свежие продукты, свежие ингредиенты
                и новый взгляд на заботу о наших гостях, членах нашей команды и сообществах. Мы искренне верим,
                что нет ничего, что могло бы объединить людей или сделать мир лучше, чем тарелка лапши.
              </p>
            </div>
          </div>

          {/* Team */}
          <h2 className="text-4xl font-bold text-center mb-12">Наша команда</h2>
          <div className="grid grid-cols-3 gap-10 mb-10">
            {team.map(member => (
              <div key={member.id} className="flex flex-col items-center gap-3">
                <Image
                  src={member.img}
                  alt={member.name}
                  width={140}
                  height={140}
                  className="w-35 h-35 object-cover rounded-full border-4 border-white/60"
                />
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutPage