import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { categories, getCategory, products } from "@/data/catalog"
import { startingSize } from "@/data/catalog"
import { ProductCard } from "@/components/product-card"

const sorts = [
  { id: "onerilen", label: "Önerilen sıralama" },
  { id: "fiyat-artan", label: "En düşük fiyat" },
  { id: "fiyat-azalan", label: "En yüksek fiyat" },
  { id: "yorum", label: "Çok değerlendirilenler" },
  { id: "puan", label: "Yüksek puanlılar" },
]

export function ProductsPage() {
  const [params, setParams] = useSearchParams()
  const kategori = params.get("kategori") ?? ""
  const q = (params.get("q") ?? "").trim().toLocaleLowerCase("tr")
  const siralama = params.get("siralama") ?? "onerilen"
  const page = Number(params.get("sayfa") ?? "1")
  const category = getCategory(kategori)

  const filtered = useMemo(() => {
    const list = products.filter((product) => {
      const matchesCategory = !kategori || product.category === kategori
      const haystack = `${product.name} ${product.shortDescription}`.toLocaleLowerCase("tr")
      const matchesQuery = !q || haystack.includes(q)
      return matchesCategory && matchesQuery
    })
    const sorted = [...list]
    if (siralama === "fiyat-artan") sorted.sort((a, b) => startingSize(a).price - startingSize(b).price)
    if (siralama === "fiyat-azalan") sorted.sort((a, b) => startingSize(b).price - startingSize(a).price)
    if (siralama === "yorum") sorted.sort((a, b) => b.reviewCount - a.reviewCount)
    if (siralama === "puan") sorted.sort((a, b) => b.rating - a.rating)
    return sorted
  }, [kategori, q, siralama])

  const pageSize = 8
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const current = Math.min(page, pageCount)
  const visible = filtered.slice((current - 1) * pageSize, current * pageSize)

  function update(next: Record<string, string | null>) {
    const paramsNext = new URLSearchParams(params)
    for (const [key, value] of Object.entries(next)) {
      if (!value) paramsNext.delete(key)
      else paramsNext.set(key, value)
    }
    if (!("sayfa" in next)) paramsNext.delete("sayfa")
    setParams(paramsNext)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight">{category ? category.card : "TÜM ÜRÜNLER"}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {q ? `"${params.get("q")}" için ${filtered.length} sonuç` : `${filtered.length} ürün`}
          </p>
        </div>
        <label className="text-sm">
          <span className="mr-2 text-muted-foreground">Sırala</span>
          <select
            value={siralama}
            onChange={(event) => update({ siralama: event.target.value })}
            className="h-10 rounded-md border border-border bg-white px-3"
          >
            {sorts.map((sort) => (
              <option key={sort.id} value={sort.id}>
                {sort.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          onClick={() => update({ kategori: null })}
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${!kategori ? "bg-neutral-950 text-white" : "bg-neutral-100"}`}
        >
          Tümü
        </button>
        {categories.map((item) => (
          <button
            key={item.id}
            onClick={() => update({ kategori: item.id })}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${kategori === item.id ? "bg-neutral-950 text-white" : "bg-neutral-100"}`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="py-20 text-center text-muted-foreground">
          {q ? "Aramanızla eşleşen ürün bulunamadı." : "Bu kategoride henüz ürün bulunmamaktadır."}
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {pageCount > 1 ? (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
            <button
              key={number}
              onClick={() => update({ sayfa: String(number) })}
              className={`size-10 rounded-md text-sm font-semibold ${number === current ? "bg-neutral-950 text-white" : "border"}`}
            >
              {number}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
