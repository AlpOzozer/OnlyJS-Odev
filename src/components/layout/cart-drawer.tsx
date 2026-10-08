import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { cartSubtotal, useCartStore } from "@/store/cart-store"
import { formatPrice } from "@/lib/utils"
import { ProductTub } from "@/components/product-tub"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

export function CartDrawer() {
  const items = useCartStore((state) => state.items)
  const isOpen = useCartStore((state) => state.isOpen)
  const setOpen = useCartStore((state) => state.setOpen)
  const close = useCartStore((state) => state.close)
  const setQuantity = useCartStore((state) => state.setQuantity)
  const remove = useCartStore((state) => state.remove)
  const total = cartSubtotal(items)

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="max-w-md">
        <SheetHeader>
          <SheetTitle>SEPETİM</SheetTitle>
        </SheetHeader>
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="mb-4 grid size-16 place-items-center rounded-full bg-neutral-100">
              <ShoppingCart className="size-8 text-neutral-400" />
            </div>
            <h3 className="text-lg font-medium">Sepetiniz Boş</h3>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">Sepetinizde henüz ürün bulunmuyor.</p>
            <Button asChild className="mt-6" onClick={close}>
              <Link to="/urunler">Alışverişe Başla</Link>
            </Button>
          </div>
        ) : (
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {items.map((item) => (
              <div key={item.key} className="flex gap-3 border-b border-border pb-4">
                <Link to={`/urun/${item.slug}`} onClick={close} className="w-16 shrink-0">
                  <ProductTub label={item.shortLabel} flavor={item.flavorName} color={item.flavorColor} />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link to={`/urun/${item.slug}`} onClick={close} className="font-semibold hover:underline">
                    {item.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    {item.flavorName} · {item.sizeLabel}
                  </p>
                  <p className="mt-1 text-sm font-bold">{formatPrice(item.price)}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      className="grid size-7 place-items-center rounded border"
                      onClick={() => setQuantity(item.key, item.quantity - 1)}
                      aria-label="Adedi azalt"
                    >
                      <Minus className="size-3" />
                    </button>
                    <span className="w-6 text-center text-sm">{item.quantity}</span>
                    <button
                      className="grid size-7 place-items-center rounded border"
                      onClick={() => setQuantity(item.key, item.quantity + 1)}
                      aria-label="Adedi artır"
                    >
                      <Plus className="size-3" />
                    </button>
                    <button className="ml-auto text-neutral-500" onClick={() => remove(item.key)} aria-label="Ürünü sil">
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-auto space-y-3 border-t p-4">
          <div className="flex items-center justify-between text-sm font-bold">
            <span>TOPLAM</span>
            <span>{formatPrice(total)}</span>
          </div>
          <Button asChild className="w-full" disabled={items.length === 0}>
            <Link to="/odeme" onClick={close} aria-disabled={items.length === 0} className={items.length === 0 ? "pointer-events-none opacity-50" : ""}>
              DEVAM ET ▶
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
