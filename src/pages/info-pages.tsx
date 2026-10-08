import { useState, type FormEvent } from "react"
import { contactSchema, fieldErrors } from "@/schemas/forms"
import { faqs } from "@/data/content"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-black">Hakkımızda</h1>
      <p className="mt-4 leading-7 text-neutral-700">
        OJS Nutrition, spor beslenmesi ürünlerini sade ve güvenilir bir alışveriş deneyimiyle sunar. Protein, kreatin,
        amino asit, vitamin ve günlük gıda takviyelerini laboratuvar testli formüller olarak hazırlarız.
      </p>
      <p className="mt-4 leading-7 text-neutral-700">
        Saat 16:00'a kadar verilen siparişler aynı gün kargoya çıkar. 100 TL üzeri alışverişlerde standart kargo
        ücretsizdir. Memnun kalmazsan 14 gün içinde iade edebilirsin.
      </p>
    </article>
  )
}

export function ContactPage() {
  const [values, setValues] = useState({ name: "", email: "", message: "" })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)

  function submit(event: FormEvent) {
    event.preventDefault()
    const parsed = contactSchema.safeParse(values)
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error))
      setSent(false)
      return
    }
    setErrors({})
    setSent(true)
    setValues({ name: "", email: "", message: "" })
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <h1 className="text-3xl font-black">İletişim</h1>
      <p className="mt-2 text-sm text-muted-foreground">destek@ojsnutrition.com · 0850 000 00 00</p>
      <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="name">Ad soyad</Label>
          <Input id="name" value={values.name} onChange={(event) => setValues({ ...values, name: event.target.value })} />
          {errors.name ? <p className="text-sm text-red-600">{errors.name}</p> : null}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">E-posta</Label>
          <Input id="email" type="email" value={values.email} onChange={(event) => setValues({ ...values, email: event.target.value })} />
          {errors.email ? <p className="text-sm text-red-600">{errors.email}</p> : null}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="message">Mesaj</Label>
          <textarea
            id="message"
            value={values.message}
            onChange={(event) => setValues({ ...values, message: event.target.value })}
            className="min-h-32 w-full rounded-md border border-border px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          {errors.message ? <p className="text-sm text-red-600">{errors.message}</p> : null}
        </div>
        {sent ? <p className="text-sm text-emerald-700">Mesajın alındı. En kısa sürede döneceğiz.</p> : null}
        <Button type="submit">Gönder</Button>
      </form>
    </div>
  )
}

export function FaqPage() {
  const [open, setOpen] = useState(0)
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-black">Sıkça Sorulan Sorular</h1>
      <div className="mt-6 divide-y rounded-xl border">
        {faqs.map((item, index) => (
          <div key={item.question}>
            <button className="flex w-full items-center justify-between px-4 py-4 text-left font-semibold" onClick={() => setOpen(index)}>
              {item.question}
              <span>{open === index ? "−" : "+"}</span>
            </button>
            {open === index ? <p className="px-4 pb-4 text-sm leading-6 text-neutral-600">{item.answer}</p> : null}
          </div>
        ))}
      </div>
    </div>
  )
}
