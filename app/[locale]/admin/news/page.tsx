const BASE = process.env.NEXT_PUBLIC_API_URL || "https://anorkhulov.uz/api"
const BASE_IMG = process.env.NEXT_PUBLIC_IMAGE_URL || "https://anorkhulov.uz"

async function getNews() {
  const res = await fetch(`${BASE}/news`, { cache: "no-store" })
  const data = await res.json()
  return data?.data ?? []
}

export default async function AdminNewsPage() {
  const news = await getNews()

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Yangiliklar ({news.length})</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {news.map((item: any) => (
          <div key={item.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {item.image && (
              <img
                src={`${BASE_IMG}/${item.image}`}
                alt="news"
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4">
              <p className="text-sm text-gray-700 line-clamp-3">{item.description}</p>
              <p className="text-xs text-gray-400 mt-3">
                {item.author?.firstName} {item.author?.lastName}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}