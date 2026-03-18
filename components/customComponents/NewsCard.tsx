import Image from "next/image"

interface NewsCardProps {
  img: string
  description: string
  userAvatar: string
  userName: string
}

const NewsCard = ({ img, description, userAvatar, userName }: NewsCardProps) => {
  return (
    <li className="bg-white/40 rounded-[30px] pb-4 flex flex-col items-start gap-3 pl-6 pr-2 hover:bg-white/60 transition-colors duration-300 cursor-pointer">
      <Image
        src={img}
        alt="news-image"
        width={213}
        height={157}
        className="w-auto h-auto -mt-20 rounded-[30px]"
      />
      <p className="mt-3 max-w-81.75">{description}</p>
      <div className="flex items-center gap-3">
        <Image
          src={userAvatar}
          alt="avatar"
          width={45}
          height={45}
          className="w-auto h-auto rounded-full"
        />
        <h2 className="text-lg font-semibold">{userName}</h2>
      </div>
    </li>
  )
}

export default NewsCard