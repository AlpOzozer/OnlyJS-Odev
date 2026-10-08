import { Minus, Plus, ShieldCheck, Truck } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { toast } from "sonner"
import { getCategory, getProduct, relatedProducts } from "@/data/catalog"
import { storeReviews } from "@/data/content"
import { discountPercent, formatPrice } from "@/lib/utils"
import { useCartStore } from "@/store/cart-store"
import { ProductCard } from "@/components/product-card"
import { ProductTub } from "@/components/product-tub"
import { Stars } from "@/components/stars"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ProductDetailPage() {
  const { slug = "" } = useParams()
  const product = getProduct(slug)
  const add = useCartStore((state) => state.add)
  const [flavorId, setFlavorId] = useState(product?.flavors[0]?.id ?? "")
  const [sizeId, setSizeId] = useState(product?.sizes[1]?.id ?? product?.sizes[0]?.id ?? "")
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const next = getProduct(slug)
    if (!next) return
    setFlavorId(next.flavors[0]?.id ?? "")
    setSizeId(next.sizes[1]?.id ?? next.sizes[0]?.id ?? "")
    setQuantity(1)
  }, [slug])

  const flavor = useMemo(
    () => product?.flavors.find((item) => item.id === flavorId) ?? product?.flavors[0],
    [product, flavorId],
  )
  const size = useMemo(
    () => product?.sizes.find((item) => item.id === sizeId) ?? product?.sizes[0],
    [product, sizeId],
  )

  if (!product || !flavor || !size) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Ürün bulunamadı</h1>
        <Button asChild className="mt-6">
          <Link to="/urunler">Ürünlere dön</Link>
        </Button>
      </div>
    )
  }

  const category = getCategory(product.category)
  const discount = discountPercent(size.price, size.oldPrice)
  const related = relatedProducts(product)

  function addToCart() {
    add({
      productId: product!.id,
      slug: product!.slug,
      name: product!.name,
      shortLabel: product!.shortLabel,
      flavorId: flavor!.id,
      flavorName: flavor!.name,
      flavorColor: flavor!.color,
      sizeId: size!.id,
      sizeLabel: size!.label,
      price: size!.price,
      quantity,
    })
    toast.success("Ürün sepete eklendi", { description: `${flavor!.name} · ${size!.label} · ${quantity} adet` })
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <p className="text-sm text-muted-foreground">
        <Link to="/" className="hover:underline">Anasayfa</Link>
        <span> / </span>
        <Link to={`/urunler?kategori=${product.category}`} className="hover:underline">{category?.name}</Link>
        <span> / </span>
        <span className="text-foreground">{product.name}</span>
      </p>

      <div className="mt-6 grid items-start gap-10 lg:grid-cols-2">
        <div
          className="rounded-3xl px-8 py-10"
          style={{ background: `linear-gradient(180deg, ${flavor.color}22, #f3f4f6)` }}
        >
          <ProductTub
            label={product.shortLabel}
            flavor={flavor.name}
            detail={size.servings}
            color={flavor.color}
            className="mx-auto w-56 md:w-72"
          />
        </div>

        <div>
          <p className="text-xs font-bold tracking-[0.18em] text-muted-foreground">{category?.name.toUpperCase()}</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight">{product.name}</h1>
          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Stars value={product.rating} />
            <span>{product.rating}</span>
            <span>· {product.reviewCount} yorum</span>
          </div>
          <p className="mt-4 text-neutral-600">{product.shortDescription}</p>

          <div className="mt-6 flex items-end gap-3">
            <p className="text-3xl font-black">{formatPrice(size.price)}</p>
            {size.oldPrice ? <p className="pb-1 text-neutral-400 line-through">{formatPrice(size.oldPrice)}</p> : null}
            {discount ? <Badge>%{discount}</Badge> : null}
          </div>

          <div className="mt-6">
            <p className="text-sm font-semibold">Aroma</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.flavors.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setFlavorId(item.id)}
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm ${item.id === flavor.id ? "border-neutral-950 bg-neutral-950 text-white" : "border-border"}`}
                >
                  <span className="size-3 rounded-full border border-white/40" style={{ background: item.color }} />
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p className="text-sm font-semibold">Boyut</p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {product.sizes.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSizeId(item.id)}
                  className={`rounded-lg border px-2 py-3 text-sm ${item.id === size.id ? "border-neutral-950 bg-neutral-950 text-white" : "border-border"}`}
                >
                  <span className="block font-semibold">{item.label}</span>
                  <span className="block text-xs opacity-80">{formatPrice(item.price)}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-md border">
              <button className="grid size-11 place-items-center" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Azalt">
                <Minus className="size-4" />
              </button>
              <span className="w-8 text-center font-semibold">{quantity}</span>
              <button className="grid size-11 place-items-center" onClick={() => setQuantity((value) => Math.min(10, value + 1))} aria-label="Artır">
                <Plus className="size-4" />
              </button>
            </div>
            <Button size="lg" className="min-w-48 flex-1" onClick={addToCart}>
              Sepete Ekle
            </Button>
          </div>

          <ul className="mt-6 space-y-2 text-sm text-neutral-600">
            <li className="flex items-center gap-2"><Truck className="size-4" /> 100 TL üzeri ücretsiz kargo</li>
            <li className="flex items-center gap-2"><ShieldCheck className="size-4" /> 14 gün içinde iade</li>
          </ul>
        </div>
      </div>

      <Tabs defaultValue="aciklama" className="mt-12">
        <TabsList>
          <TabsTrigger value="aciklama">Açıklama</TabsTrigger>
          <TabsTrigger value="besin">Besin Değerleri</TabsTrigger>
          <TabsTrigger value="yorum">Yorumlar</TabsTrigger>
        </TabsList>
        <TabsContent value="aciklama" className="max-w-3xl space-y-4 text-sm leading-6 text-neutral-700">
          <p>{product.description}</p>
          <p>{product.usage}</p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {product.benefits.map((benefit) => (
              <li key={benefit} className="rounded-lg bg-neutral-50 px-3 py-2">{benefit}</li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="besin">
          <table className="w-full max-w-lg text-sm">
            <tbody>
              {product.nutrition.map((row) => (
                <tr key={row.label} className="border-b">
                  <th className="py-3 text-left font-medium">{row.label}</th>
                  <td className="py-3 text-right">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-xs text-muted-foreground">Değerler {size.label} paketindeki bir servis içindir.</p>
        </TabsContent>
        <TabsContent value="yorum" className="grid gap-4 md:grid-cols-2">
          {storeReviews.slice(0, 4).map((review) => (
            <article key={review.id} className="rounded-xl border p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{review.title}</h3>
                <Stars value={review.rating} />
              </div>
              <p className="mt-2 text-sm text-neutral-600">{review.body}</p>
              <p className="mt-3 text-xs text-muted-foreground">{review.author} · {review.date}</p>
            </article>
          ))}
        </TabsContent>
      </Tabs>

      {related.length > 0 ? (
        <section className="mt-14">
          <h2 className="text-xl font-black">Bunları da inceleyin</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
