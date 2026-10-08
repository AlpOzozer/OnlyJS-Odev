import { Link } from "react-router-dom"
import { toast } from "sonner"
import type { Product } from "@/data/catalog"
import { startingSize } from "@/data/catalog"
import { discountPercent, formatPrice } from "@/lib/utils"
import { useCartStore } from "@/store/cart-store"
import { ProductTub } from "@/components/product-tub"
import { Stars } from "@/components/stars"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function ProductCard({ product }: { product: Product }) {
  const add = useCartStore((state) => state.add)
  const offer = startingSize(product)
  const flavor = product.flavors[0]
  const discount = discountPercent(offer.price, offer.oldPrice)

  return (
    <article className="flex h-full flex-col rounded-xl border border-border bg-white p-3 shadow-sm">
      <Link to={`/urun/${product.slug}`} className="relative block rounded-lg bg-neutral-100 px-6 py-4">
        {discount ? <Badge className="absolute top-3 left-3">%{discount}</Badge> : null}
        <ProductTub label={product.shortLabel} flavor={flavor.name} detail={offer.label} color={flavor.color} />
      </Link>
      <div className="mt-3 flex flex-1 flex-col gap-2">
        <Link to={`/urun/${product.slug}`} className="line-clamp-2 font-semibold hover:underline">
          {product.name}
        </Link>
        <p className="line-clamp-2 text-sm text-muted-foreground">{product.shortDescription}</p>
        <div className="mt-auto space-y-3 pt-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Stars value={product.rating} />
            <span>{product.reviewCount} Yorum</span>
          </div>
          <div>
            <p className="text-lg font-bold">{formatPrice(offer.price)}</p>
            {offer.oldPrice ? (
              <p className="text-sm text-neutral-400 line-through">{formatPrice(offer.oldPrice)}</p>
            ) : (
              <p className="text-xs text-muted-foreground">Başlangıç fiyatı</p>
            )}
          </div>
          <Button
            className="w-full"
            onClick={() => {
              add({
                productId: product.id,
                slug: product.slug,
                name: product.name,
                shortLabel: product.shortLabel,
                flavorId: flavor.id,
                flavorName: flavor.name,
                flavorColor: flavor.color,
                sizeId: offer.id,
                sizeLabel: offer.label,
                price: offer.price,
              })
              toast.success(`${product.name} sepete eklendi`, {
                description: `${flavor.name} · ${offer.label}`,
              })
            }}
          >
            Sepete Ekle
          </Button>
        </div>
      </div>
    </article>
  )
}
