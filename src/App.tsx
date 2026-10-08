import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Toaster } from "sonner"
import { SiteLayout } from "@/components/layout/site-layout"
import { AccountPage } from "@/pages/account-page"
import { CheckoutPage } from "@/pages/checkout-page"
import { HomePage } from "@/pages/home-page"
import { AboutPage, ContactPage, FaqPage } from "@/pages/info-pages"
import { LoginPage } from "@/pages/login-page"
import { ProductDetailPage } from "@/pages/product-detail-page"
import { ProductsPage } from "@/pages/products-page"
import { RegisterPage } from "@/pages/register-page"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="urunler" element={<ProductsPage />} />
          <Route path="urun/:slug" element={<ProductDetailPage />} />
          <Route path="giris" element={<LoginPage />} />
          <Route path="kayit" element={<RegisterPage />} />
          <Route path="odeme" element={<CheckoutPage />} />
          <Route path="hesabim" element={<AccountPage />} />
          <Route path="hakkimizda" element={<AboutPage />} />
          <Route path="iletisim" element={<ContactPage />} />
          <Route path="sss" element={<FaqPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
      <Toaster position="top-center" richColors />
    </BrowserRouter>
  )
}
