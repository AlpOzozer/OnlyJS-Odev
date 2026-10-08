import { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { CartDrawer } from "@/components/layout/cart-drawer"
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"

export function SiteLayout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  )
}
