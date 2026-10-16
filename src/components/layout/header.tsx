import { ChevronDown, Menu, Search, ShoppingCart, User } from "lucide-react"
import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getProduct, popularProducts, products } from "@/data/catalog"
import { cartCount, useCartStore } from "@/store/cart-store"
import { useAuthStore } from "@/store/auth-store"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

const desktopNav = [
  { id: "protein", label: "PROTEİN" },
  { id: "spor-gidalari", label: "SPOR GIDALARI" },
  { id: "saglik", label: "SAĞLIK" },
  { id: "gida", label: "GIDA" },
  { id: "vitamin", label: "VİTAMİN" },
]

const menuLinks: Record<string, string[]> = {
  protein: ["whey-protein"],
  vitamin: ["vitamin-d", "omega", "multivitamin"],
  saglik: ["collagen", "zma", "selenium", "ginseng"],
  "spor-gidalari": ["creatine", "bcaa", "pre-workout", "glutamine", "l-citrulline"],
  gida: ["cream-of-rice"],
}

export function Header() {
  const navigate = useNavigate()
  const [query, setQuery] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)
  const items = useCartStore((state) => state.items)
  const openCart = useCartStore((state) => state.open)
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const count = cartCount(items)

  function search(event: FormEvent) {
    event.preventDefault()
    const value = query.trim()
    navigate(value ? `/urunler?q=${encodeURIComponent(value)}` : "/urunler")
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-4 px-4 md:px-6">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMenuOpen(true)} aria-label="Menü">
          <Menu />
        </Button>
        <Link to="/" className="md:mr-2" aria-label="OJS Nutrition ana sayfa">
          <Logo />
        </Link>
        <form onSubmit={search} className="relative mx-auto hidden max-w-xl flex-1 md:block">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-neutral-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Aradığınız ürünü yazınız..."
            className="h-11 w-full rounded-full border border-neutral-200 pr-24 pl-11 text-sm outline-none focus:ring-2 focus:ring-neutral-900"
          />
          <button
            type="submit"
            className="absolute top-1/2 right-1 h-9 -translate-y-1/2 rounded-full bg-neutral-900 px-4 text-xs font-bold tracking-wide text-white"
          >
            ARA
          </button>
        </form>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="hidden sm:inline-flex">
                <User />
                {user ? user.name.split(" ")[0] : "HESAP"}
                <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {user ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/hesabim">Hesabım</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => {
                      logout()
                      navigate("/")
                    }}
                  >
                    Çıkış yap
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/giris">Üye girişi</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/kayit">Üye ol</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="relative" onClick={openCart} aria-label={`Sepet, ${count} ürün`}>
            <ShoppingCart />
            <span className="hidden sm:inline">SEPET</span>
            <span className="absolute -top-2 -right-2 grid size-5 place-items-center rounded-full bg-red-600 text-[11px] text-white">
              {count}
            </span>
          </Button>
        </div>
      </div>
      <form onSubmit={search} className="px-4 pb-3 md:hidden">
        <div className="relative">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Aradığınız ürünü yazınız..."
            className="h-11 w-full rounded-full border border-neutral-200 pr-20 pl-4 text-sm outline-none"
          />
          <button type="submit" className="absolute top-1 right-1 h-9 rounded-full bg-neutral-900 px-4 text-xs font-bold text-white">
            ARA
          </button>
        </div>
      </form>
      <nav className="hidden bg-neutral-950 text-white md:block">
        <ul className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4">
          {desktopNav.map((category) => (
            <li key={category.id} className="group relative">
              <Link
                to={`/urunler?kategori=${category.id}`}
                className="flex items-center px-4 py-3 text-xs font-semibold tracking-wide hover:text-neutral-300"
              >
                {category.label}
              </Link>
              <div className="invisible absolute top-full left-0 z-30 min-w-52 rounded-b-lg bg-white py-2 text-neutral-900 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
                {(menuLinks[category.id] ?? []).map((slug) => {
                  const product = getProduct(slug)
                  if (!product) return null
                  return (
                    <Link key={slug} to={`/urun/${slug}`} className="block px-4 py-2 text-sm hover:bg-neutral-100">
                      {product.name}
                    </Link>
                  )
                })}
                <Link
                  to={`/urunler?kategori=${category.id}`}
                  className="block px-4 py-2 text-sm font-semibold hover:bg-neutral-100"
                >
                  Tümünü gör
                </Link>
              </div>
            </li>
          ))}
          <li>
            <Link to="/urunler" className="flex items-center px-4 py-3 text-xs font-semibold tracking-wide hover:text-neutral-300">
              TÜM ÜRÜNLER
            </Link>
          </li>
        </ul>
      </nav>
      <div className="hidden border-b border-neutral-200 bg-neutral-50 text-[11px] font-semibold tracking-wide text-neutral-600 md:block">
        <div className="mx-auto grid max-w-7xl grid-cols-3 px-6 py-2.5">
          <p className="text-center">AYNI GÜN KARGO · 16:00'DAN ÖNCEKİ SİPARİŞLERDE</p>
          <p className="text-center">ÜCRETSİZ KARGO · 100 TL ÜZERİ ALIŞVERİŞLERDE</p>
          <p className="text-center">GÜVENLİ ALIŞVERİŞ · 1.000.000+ MUTLU MÜŞTERİ</p>
        </div>
      </div>
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" className="w-[min(100%,20rem)]">
          <SheetHeader>
            <SheetTitle>Menü</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-1 overflow-y-auto p-3">
            {user ? (
              <Link to="/hesabim" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2 font-medium hover:bg-muted">
                Hesabım
              </Link>
            ) : (
              <>
                <Link to="/giris" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2 font-medium hover:bg-muted">
                  Üye girişi
                </Link>
                <Link to="/kayit" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2 font-medium hover:bg-muted">
                  Üye ol
                </Link>
              </>
            )}
            {desktopNav.map((category) => (
              <Link
                key={category.id}
                to={`/urunler?kategori=${category.id}`}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-3 py-2 hover:bg-muted"
              >
                {category.label}
              </Link>
            ))}
            <Link to="/urunler" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2 font-semibold hover:bg-muted">
              Tüm Ürünler ({products.length})
            </Link>
            <p className="mt-4 px-3 text-xs font-bold tracking-wide text-muted-foreground">POPÜLER ÜRÜNLER</p>
            {popularProducts.map((product) => (
              <Link
                key={product.id}
                to={`/urun/${product.slug}`}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-3 py-2 text-sm hover:bg-muted"
              >
                {product.name}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
