import { Link } from "react-router-dom"
import { categories, popularProducts } from "@/data/catalog"
import { Logo } from "@/components/logo"
import { Stars } from "@/components/stars"

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-2 md:px-6">
        <div>
          <Stars value={5} />
          <p className="mt-2 text-sm text-neutral-300">(140.000+)</p>
          <h2 className="mt-4 max-w-md text-2xl font-black tracking-tight">
            LABORATUVAR TESTLİ ÜRÜNLER · AYNI GÜN & ÜCRETSİZ KARGO · MEMNUNİYET GARANTİSİ
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-neutral-300">
          200.000'den fazla ürün yorumumuza dayanarak, ürünlerimizi seveceğinize eminiz. Herhangi bir sebeple memnun
          kalmazsanız bizimle iletişime geçtiğinizde çözüme kavuştururuz.
        </p>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-3 md:px-6">
          <div>
            <Logo light />
            <ul className="mt-4 space-y-2 text-sm text-neutral-300">
              <li><Link to="/iletisim" className="hover:text-white">İletişim</Link></li>
              <li><Link to="/hakkimizda" className="hover:text-white">Hakkımızda</Link></li>
              <li><Link to="/sss" className="hover:text-white">Sıkça Sorulan Sorular</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-wide">KATEGORİLER</h3>
            <ul className="mt-4 space-y-2 text-sm text-neutral-300">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link to={`/urunler?kategori=${category.id}`} className="hover:text-white">
                    {category.name}
                  </Link>
                </li>
              ))}
              <li><Link to="/urunler" className="hover:text-white">Tüm Ürünler</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-wide">POPÜLER ÜRÜNLER</h3>
            <ul className="mt-4 space-y-2 text-sm text-neutral-300">
              {popularProducts.map((product) => (
                <li key={product.id}>
                  <Link to={`/urun/${product.slug}`} className="hover:text-white">
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-sm text-neutral-400">
        Copyright © {new Date().getFullYear()} OJS Nutrition — Tüm Hakları Saklıdır
      </div>
    </footer>
  )
}
