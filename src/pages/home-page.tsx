import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { getProduct, startingSize } from "@/data/catalog"
import { storeReviews } from "@/data/content"
import { Stars } from "@/components/stars"
import { discountPercent, formatPrice } from "@/lib/utils"

const categoryCards = [
  { title: "PROTEİN", image: "/categories/protein.png", bg: "#c5d6da", href: "/urunler?kategori=protein" },
  { title: "VİTA-\nMİNLER", image: "/categories/vitamin.png", bg: "#fde8d7", href: "/urunler?kategori=vitamin" },
  { title: "SAĞLIK", image: "/categories/saglik.png", bg: "#cecdc8", href: "/urunler?kategori=saglik" },
  { title: "SPOR\nGIDALARI", image: "/categories/spor.png", bg: "#e0dfda", href: "/urunler?kategori=spor-gidalari" },
  { title: "GIDA", image: "/categories/gida.png", bg: "#7ec4dc", href: "/urunler?kategori=gida" },
  { title: "TÜM\nÜRÜNLER", image: "/categories/tum.png", bg: "#d5eaf4", href: "/urunler" },
]

const bestsellerCards: { name: string; image: string; href: string; slug?: string; price?: number; oldPrice?: number; rating?: number; reviewCount?: number }[] = [
  { name: "WHEY PROTEIN", image: "/bestsellers/whey.png", href: "/urun/whey-protein", slug: "whey-protein" },
  { name: "FITNESS PAKETİ", image: "/bestsellers/fitness.png", href: "/urunler", price: 799, oldPrice: 1126, rating: 5, reviewCount: 7890 },
  { name: "GÜNLÜK VİTAMİN PAKETİ", image: "/bestsellers/vitamin.png", href: "/urun/multivitamin", slug: "multivitamin" },
  { name: "PRE-WORKOUT SUPREME", image: "/bestsellers/preworkout.png", href: "/urun/pre-workout", slug: "pre-workout" },
  { name: "CREAM OF RICE", image: "/bestsellers/rice.png", href: "/urun/cream-of-rice", slug: "cream-of-rice" },
  { name: "CREATINE", image: "/bestsellers/creatine.png", href: "/urun/creatine", slug: "creatine" },
]

export function HomePage() {

  return (
    <div>
      <section className="overflow-hidden bg-[#c5dff0]">
        <img
          src="/hero-banner.jpg"
          alt="OJS Nutrition L-Citrulline, Creatine ve Glutamine"
          className="h-auto w-full object-cover"
        />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categoryCards.map((card) => (
            <article key={card.title} className="flex min-h-[128px] items-center gap-2 rounded-2xl px-3 py-3" style={{ backgroundColor: card.bg }}>
              <img src={card.image} alt="" className="h-24 w-28 shrink-0 object-contain" />
              <div className="ml-auto flex flex-col items-end gap-3">
                <h3 className="text-right text-sm leading-tight font-black tracking-wide whitespace-pre-line text-neutral-950">{card.title}</h3>
                <Link to={card.href} className="rounded-full bg-neutral-950 px-4 py-1.5 text-[11px] font-bold tracking-wide text-white">
                  İNCELE
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white pb-10">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="mb-6 text-center text-sm font-bold tracking-[0.18em]">ÇOK SATANLAR</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {bestsellerCards.map((card) => {
              const product = card.slug ? getProduct(card.slug) : undefined
              const offer = product ? startingSize(product) : null
              const price = offer?.price ?? card.price
              const oldPrice = offer?.oldPrice ?? card.oldPrice
              const rating = product?.rating ?? card.rating
              const reviewCount = product?.reviewCount ?? card.reviewCount
              const discount = price ? discountPercent(price, oldPrice) : null
              return (
                <Link key={card.name} to={card.href} className="group text-center">
                  <div className="relative mx-auto flex h-36 items-center justify-center">
                    {discount ? (
                      <span className="absolute top-1 right-1 rounded-md bg-red-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                        %{discount}
                      </span>
                    ) : null}
                    <img src={card.image} alt={card.name} className="mx-auto h-32 w-32 object-contain object-center" />
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs font-bold tracking-wide uppercase group-hover:underline">{card.name}</p>
                  {rating && reviewCount && price ? (
                    <>
                      <div className="mt-1 flex justify-center">
                        <Stars value={rating} />
                      </div>
                      <p className="text-[11px] text-neutral-500">{reviewCount} Yorum</p>
                      <p className="mt-1 text-sm font-bold">
                        {formatPrice(price)}
                        {oldPrice ? <span className="ml-1 text-xs font-medium text-neutral-400 line-through">{formatPrice(oldPrice)}</span> : null}
                      </p>
                    </>
                  ) : null}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <PromoBanner />
      <Reviews />
    </div>
  )
}

function PromoBanner() {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      <div className="grid min-h-[250px] md:grid-cols-[0.9fr_1.2fr]">
        <div className="relative flex items-center justify-center overflow-hidden px-8 py-14">
          <div className="absolute top-5 left-6 flex text-[#c6ff00]" aria-hidden="true">
            <ChevronRight className="size-4" />
            <ChevronRight className="-ml-2 size-4" />
            <ChevronRight className="-ml-2 size-4" />
          </div>
          <svg className="absolute -right-6 bottom-0 h-[130%] w-[78%] text-neutral-700" viewBox="0 0 200 200" fill="none" aria-hidden="true">
            {Array.from({ length: 8 }, (_, index) => (
              <path
                key={index}
                d={`M ${20 + index * 8} 200 C ${40 + index * 10} ${150 - index * 6}, ${90 + index * 6} ${70 + index * 8}, 210 ${20 + index * 12}`}
                stroke="currentColor"
                strokeWidth="0.7"
              />
            ))}
          </svg>
          <p className="relative text-center text-4xl leading-none font-black tracking-tight italic md:text-5xl">
            OJS
            <span className="mt-1 block">NUTRITION</span>
          </p>
        </div>
        <div className="relative min-h-[220px] overflow-hidden bg-[#c6f000]">
          <div className="absolute -top-16 -right-10 h-64 w-64 rotate-12 bg-[#9fe000]" />
          <div className="absolute right-10 bottom-0 h-48 w-40 -rotate-6 bg-[#deff4a]" />
          <div className="absolute top-8 left-8 h-28 w-36 rotate-[-18deg] bg-[#b0ee00]" />
          <span className="absolute top-8 left-[18%] text-4xl font-thin text-white/90">✕</span>
          <span className="absolute right-[18%] bottom-10 text-5xl font-thin text-white/80">✕</span>
          <span className="absolute top-1/2 left-1/2 text-6xl font-thin text-white/70">✕</span>
        </div>
      </div>
    </section>
  )
}

function Reviews() {
  const [index, setIndex] = useState(0)
  const count = storeReviews.length
  const visible = [0, 1, 2, 3].map((offset) => storeReviews[(index + offset) % count])

  function step(direction: number) {
    setIndex((current) => (current + direction + count) % count)
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <div className="mb-8 flex items-center justify-between gap-4">
        <h2 className="text-xs font-bold tracking-[0.16em] md:text-sm">GERÇEK MÜŞTERİ YORUMLARI</h2>
        <div className="flex items-center gap-2">
          <Stars value={5} />
          <span className="text-xs font-semibold text-neutral-600">188.612 Yorum</span>
          <button type="button" aria-label="Önceki yorumlar" onClick={() => step(-1)} className="grid size-7 place-items-center text-neutral-500 hover:text-neutral-950">
            <ChevronLeft className="size-4" />
          </button>
          <button type="button" aria-label="Sonraki yorumlar" onClick={() => step(1)} className="grid size-7 place-items-center text-neutral-500 hover:text-neutral-950">
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {visible.map((review, position) => (
          <article key={`${review.id}-${position}`} className={position > 0 ? "hidden md:block" : ""}>
            <p className="text-[11px] text-neutral-400">{review.date.replaceAll("/", ".")}</p>
            <h3 className="mt-2 text-sm font-bold">{review.title}</h3>
            <p className="mt-2 text-xs leading-5 text-neutral-500">{review.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
