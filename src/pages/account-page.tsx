import { Link } from "react-router-dom"
import { useAuthStore } from "@/store/auth-store"
import { useOrderStore } from "@/store/order-store"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function AccountPage() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const orders = useOrderStore((state) => state.orders).filter(
    (order) => order.userId === user?.id || order.email.toLowerCase() === user?.email.toLowerCase(),
  )

  if (!user) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="text-2xl font-black">Hesabım</h1>
        <p className="mt-2 text-muted-foreground">Siparişlerini görmek için giriş yap.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Button asChild><Link to="/giris">Giriş yap</Link></Button>
          <Button asChild variant="outline"><Link to="/kayit">Kayıt ol</Link></Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black">Merhaba, {user.name}</h1>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
        <Button variant="outline" onClick={logout}>Çıkış yap</Button>
      </div>
      <h2 className="mt-10 text-xl font-bold">Siparişlerim</h2>
      {orders.length === 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">Henüz siparişin yok.</p>
      ) : (
        <ul className="mt-4 space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="rounded-xl border p-4">
              <div className="flex justify-between gap-3">
                <div>
                  <p className="font-bold">{order.id}</p>
                  <p className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleString("tr-TR")}</p>
                </div>
                <p className="font-bold">{formatPrice(order.total)}</p>
              </div>
              <ul className="mt-3 space-y-1 text-sm text-neutral-600">
                {order.items.map((item) => (
                  <li key={item.key}>{item.quantity} × {item.name} ({item.flavorName}, {item.sizeLabel})</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
