import { Link } from "react-router-dom"
import { categories, getProduct, products } from "@/data/catalog"
import { storeReviews } from "@/data/content"
import { ProductCard } from "@/components/product-card"
import { ProductTub } from "@/components/product-tub"
import { Stars } from "@/components/stars"
import { Button } from "@/components/ui/button"

const cardProducts = ["whey-protein", "vitamin-d", "selenium", "creatine", "cream-of-rice"]

export function HomePage() {
  const bestsellers = products.filter((product) => product.bestseller)

  return (
    <div>
      <section className="relative isolate h-[420px] overflow-hidden bg-[#7eb6d9] md:h-[540px] lg:h-[620px]">
        <div className="absolute -top-10 -left-16 h-72 w-80 rounded-full bg-orange-400 blur-2xl" />
        <div className="absolute top-16 left-1/4 h-40 w-72 rotate-12 rounded-full bg-amber-300/80 blur-2xl" />
        <div className="absolute right-0 bottom-0 h-80 w-[28rem] rounded-full bg-orange-500 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 h-24 w-64 -rotate-6 rounded-full bg-orange-200/70 blur-xl" />
        <div className="relative mx-auto flex h-full max-w-4xl items-end justify-center gap-3 px-4 pb-8 md:gap-8">
          <ProductTub label="L-CITRULLINE" flavor="MONOHYDRATE" detail="60 SERVİS" color="#16324f" className="w-28 translate-y-4 md:w-44" />
          <ProductTub label="CREATINE" flavor="MONOHYDRATE" detail="120 SERVİS" color="#10243d" className="w-36 md:w-56" />
          <ProductTub label="GLUTAMINE" flavor="MONOHYDRATE" detail="100 SERVİS" color="#1a3358" className="w-28 translate-y-4 md:w-44" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cardProducts.map((slug, index) => {
            const product = getProduct(slug)
            const category = categories[index]
            if (!product || !category) return null
            const flavor = product.flavors[0]
            return (
              <article key={category.id} className="flex items-center gap-4 rounded-2xl bg-[#6b7280] p-4 text-white">
                <div className="w-24 shrink-0 md:w-28">
                  <ProductTub label={product.shortLabel} flavor={flavor.name} color={flavor.color} />
                </div>
                <div className="flex flex-1 flex-col items-end gap-4">
                  <h3 className="text-lg font-bold tracking-wide">{category.card}</h3>
                  <Button asChild size="sm" className="rounded-full px-5">
                    <Link to={`/urunler?kategori=${category.id}`}>İNCELE</Link>
                  </Button>
                </div>
              </article>
            )
          })}
          <article className="flex items-center gap-4 rounded-2xl bg-[#4b5563] p-4 text-white">
            <div className="w-24 shrink-0 md:w-28">
              <ProductTub label="OJS" flavor="TÜMÜ" color="#111827" />
            </div>
            <div className="flex flex-1 flex-col items-end gap-4">
              <h3 className="text-lg font-bold tracking-wide">TÜM ÜRÜNLER</h3>
              <Button asChild size="sm" className="rounded-full px-5">
                <Link to="/urunler">İNCELE</Link>
              </Button>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-black tracking-tight">ÇOK SATANLAR</h2>
            <Link to="/urunler" className="text-sm font-semibold underline">
              Tümünü gör
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {bestsellers.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-neutral-950 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 md:grid-cols-2 md:px-6">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-orange-300">YENİ SEZON</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">Antrenmanını bir üst seviyeye taşı</h2>
            <p className="mt-3 max-w-md text-neutral-300">
              Protein, kreatin ve vitaminleri laboratuvar testli formüllerle aynı gün kargoya hazırlıyoruz.
            </p>
            <Button asChild className="mt-6 bg-white text-neutral-950 hover:bg-neutral-200">
              <Link to="/urunler">Alışverişe Başla</Link>
            </Button>
          </div>
          <div className="flex items-end justify-center gap-4">
            <ProductTub label="WHEY" flavor="Çikolata" color="#4a2c1a" className="w-28 md:w-36" />
            <ProductTub label="BCAA+" flavor="Mango" color="#b45309" className="w-32 md:w-40" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-black tracking-tight">MÜŞTERİ YORUMLARI</h2>
            <p className="text-sm text-muted-foreground">{storeReviews.length} Yorum</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {storeReviews.slice(0, 3).map((review) => (
            <article key={review.id} className="rounded-xl border border-border p-5">
              <p className="text-xs text-muted-foreground">{review.date}</p>
              <h3 className="mt-2 font-bold">{review.title}</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">{review.body}</p>
              <div className="mt-4 flex items-center justify-between">
                <Stars value={review.rating} />
                <span className="text-xs text-muted-foreground">{review.author}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
