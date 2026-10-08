import { Check } from "lucide-react"
import { useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import { z } from "zod"
import { addressSchema, fieldErrors, paymentSchema, type AddressValues } from "@/schemas/forms"
import { useAuthStore } from "@/store/auth-store"
import { cartSubtotal, useCartStore } from "@/store/cart-store"
import { shippingCost, useOrderStore, type ShippingMethod } from "@/store/order-store"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const steps = ["Adres", "Kargo", "Ödeme"]

export function CheckoutPage() {
  const items = useCartStore((state) => state.items)
  const clear = useCartStore((state) => state.clear)
  const user = useAuthStore((state) => state.user)
  const addOrder = useOrderStore((state) => state.add)
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [orderId, setOrderId] = useState("")
  const [shipping, setShipping] = useState<ShippingMethod>("standard")
  const [address, setAddress] = useState({
    fullName: user?.name ?? "",
    email: user?.email ?? "",
    phone: "",
    city: "",
    district: "",
    line: "",
    postalCode: "",
  })
  const [payment, setPayment] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    accepted: false,
  })
  const [savedAddress, setSavedAddress] = useState<AddressValues | null>(null)

  function updateAddress(key: keyof typeof address, value: string) {
    setAddress((current) => ({ ...current, [key]: value }))
  }

  function updatePayment(patch: Partial<typeof payment>) {
    setPayment((current) => ({ ...current, ...patch }))
  }

  const subtotal = cartSubtotal(items)
  const freight = shippingCost(subtotal, shipping)
  const total = subtotal + freight

  if (items.length === 0 && !orderId) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="text-2xl font-black">Sepetiniz boş</h1>
        <p className="mt-2 text-muted-foreground">Ödeme için önce sepete ürün ekleyin.</p>
        <Button asChild className="mt-6">
          <Link to="/urunler">Ürünlere git</Link>
        </Button>
      </div>
    )
  }

  function saveAddress(event: FormEvent) {
    event.preventDefault()
    const emailCheck = z.email("Geçerli bir e-posta girin").safeParse(address.email)
    const parsed = addressSchema.safeParse(address)
    const nextErrors = parsed.success ? {} : fieldErrors(parsed.error)
    if (!emailCheck.success) nextErrors.email = emailCheck.error.issues[0]?.message ?? "Geçerli bir e-posta girin"
    setErrors(nextErrors)
    if (!parsed.success || !emailCheck.success) return
    setSavedAddress(parsed.data)
    setAddress((current) => ({ ...current, email: emailCheck.data, phone: parsed.data.phone }))
    setStep(1)
  }

  function pay(event: FormEvent) {
    event.preventDefault()
    const parsed = paymentSchema.safeParse(payment)
    if (!parsed.success || !savedAddress) {
      setErrors(parsed.success ? {} : fieldErrors(parsed.error))
      return
    }
    const id = `OJS-${Math.floor(100000 + Math.random() * 900000)}`
    addOrder({
      id,
      createdAt: new Date().toISOString(),
      email: address.email,
      userId: user?.id,
      items,
      address: savedAddress,
      shippingMethod: shipping,
      shippingCost: freight,
      subtotal,
      total,
      cardLast4: parsed.data.cardNumber.slice(-4),
    })
    clear()
    setOrderId(id)
  }

  if (orderId) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-100 text-emerald-700">
          <Check />
        </div>
        <h1 className="mt-4 text-3xl font-black">Siparişiniz alındı</h1>
        <p className="mt-2 text-neutral-600">Sipariş numaranız {orderId}. Ödeme bilgisi bu tarayıcıda demo olarak kaydedildi.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Button asChild>
            <Link to="/urunler">Alışverişe devam et</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/hesabim">Hesabım</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[1fr_320px] md:px-6">
      <div>
        <h1 className="text-3xl font-black">Ödeme</h1>
        <ol className="mt-6 grid grid-cols-3 gap-2">
          {steps.map((label, index) => (
            <li key={label} className={`rounded-lg border px-3 py-2 text-sm ${index === step ? "border-neutral-950 bg-neutral-950 text-white" : index < step ? "border-emerald-600 text-emerald-700" : ""}`}>
              <span className="font-bold">{index + 1}.</span> {label}
            </li>
          ))}
        </ol>

        {step === 0 ? (
          <form onSubmit={saveAddress} className="mt-6 grid gap-4 sm:grid-cols-2" noValidate>
            <Field label="Ad soyad" value={address.fullName} error={errors.fullName} onChange={(value) => updateAddress("fullName", value)} />
            <Field label="E-posta" type="email" value={address.email} error={errors.email} onChange={(value) => updateAddress("email", value)} />
            <Field label="Telefon" value={address.phone} error={errors.phone} onChange={(value) => updateAddress("phone", value)} placeholder="05xx" />
            <Field label="İl" value={address.city} error={errors.city} onChange={(value) => updateAddress("city", value)} />
            <Field label="İlçe" value={address.district} error={errors.district} onChange={(value) => updateAddress("district", value)} />
            <Field label="Posta kodu" value={address.postalCode} error={errors.postalCode} onChange={(value) => updateAddress("postalCode", value)} />
            <div className="sm:col-span-2">
              <Field label="Adres" value={address.line} error={errors.line} onChange={(value) => updateAddress("line", value)} />
            </div>
            <Button type="submit" className="sm:col-span-2">Kargo adımına geç</Button>
          </form>
        ) : null}

        {step === 1 ? (
          <div className="mt-6 space-y-4">
            <RadioGroup value={shipping} onValueChange={(value) => setShipping(value as ShippingMethod)} className="space-y-3">
              <label className="flex items-center gap-3 rounded-lg border p-4">
                <RadioGroupItem value="standard" />
                <span className="flex-1">
                  <span className="block font-semibold">Standart kargo</span>
                  <span className="text-sm text-muted-foreground">100 TL üzeri ücretsiz</span>
                </span>
                <span className="font-bold">{formatPrice(shippingCost(subtotal, "standard"))}</span>
              </label>
              <label className="flex items-center gap-3 rounded-lg border p-4">
                <RadioGroupItem value="same-day" />
                <span className="flex-1">
                  <span className="block font-semibold">Aynı gün teslimat</span>
                  <span className="text-sm text-muted-foreground">16:00'a kadar verilen siparişlerde</span>
                </span>
                <span className="font-bold">{formatPrice(shippingCost(subtotal, "same-day"))}</span>
              </label>
            </RadioGroup>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(0)}>Geri</Button>
              <Button onClick={() => setStep(2)}>Ödemeye geç</Button>
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <form onSubmit={pay} className="mt-6 grid gap-4 sm:grid-cols-2" noValidate>
            <div className="sm:col-span-2">
              <Field label="Kart üzerindeki isim" value={payment.cardName} error={errors.cardName} onChange={(value) => updatePayment({ cardName: value })} />
            </div>
            <div className="sm:col-span-2">
              <Field
                label="Kart numarası"
                value={payment.cardNumber}
                error={errors.cardNumber}
                onChange={(value) => {
                  const digits = value.replace(/\D/g, "").slice(0, 16)
                  setPayment((current) => ({ ...current, cardNumber: digits.replace(/(\d{4})(?=\d)/g, "$1 ") }))
                }}
                placeholder="0000 0000 0000 0000"
              />
            </div>
            <Field
              label="Son kullanma"
              value={payment.expiry}
              error={errors.expiry}
              onChange={(value) => {
                const digits = value.replace(/\D/g, "").slice(0, 4)
                setPayment((current) => ({ ...current, expiry: digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits }))
              }}
              placeholder="AA/YY"
            />
            <Field label="CVC" value={payment.cvc} error={errors.cvc} onChange={(value) => updatePayment({ cvc: value.replace(/\D/g, "").slice(0, 3) })} />
            <label className="flex items-start gap-2 text-sm sm:col-span-2">
              <Checkbox checked={payment.accepted} onCheckedChange={(checked) => updatePayment({ accepted: checked === true })} />
              <span>Mesafeli satış sözleşmesini ve ön bilgilendirme formunu okudum, onaylıyorum.</span>
            </label>
            {errors.accepted ? <p className="text-sm text-red-600 sm:col-span-2">{errors.accepted}</p> : null}
            <div className="flex gap-3 sm:col-span-2">
              <Button variant="outline" onClick={() => setStep(1)}>Geri</Button>
              <Button type="submit">Siparişi tamamla · {formatPrice(total)}</Button>
            </div>
          </form>
        ) : null}
      </div>

      <aside className="h-fit rounded-xl border p-5">
        <h2 className="font-bold">Sipariş özeti</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {items.map((item) => (
            <li key={item.key} className="flex justify-between gap-3">
              <span>
                {item.name}
                <span className="block text-xs text-muted-foreground">{item.flavorName} · {item.sizeLabel} · {item.quantity} adet</span>
              </span>
              <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 space-y-1 border-t pt-4 text-sm">
          <Row label="Ara toplam" value={formatPrice(subtotal)} />
          <Row label="Kargo" value={freight === 0 ? "Ücretsiz" : formatPrice(freight)} />
          <Row label="Toplam" value={formatPrice(total)} bold />
        </div>
      </aside>
    </div>
  )
}

function Row({ label, value, bold = false }: { label: string; value: string; bold?: boolean }) {
  return (
    <p className={`flex justify-between ${bold ? "text-base font-black" : ""}`}>
      <span>{label}</span>
      <span>{value}</span>
    </p>
  )
}

function Field({
  label,
  value,
  error,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string
  value: string
  error?: string
  onChange: (value: string) => void
  type?: string
  placeholder?: string
}) {
  const id = label.toLocaleLowerCase("tr").replace(/\s+/g, "-")
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  )
}
