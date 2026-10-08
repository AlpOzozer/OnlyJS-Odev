import { z } from "zod"

export const loginSchema = z.object({
  email: z.email("Geçerli bir e-posta girin"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalı"),
})

export const registerSchema = z
  .object({
    name: z.string().trim().min(2, "Ad soyad en az 2 karakter olmalı"),
    email: z.email("Geçerli bir e-posta girin"),
    password: z.string().min(6, "Şifre en az 6 karakter olmalı"),
    confirm: z.string().min(6, "Şifre tekrarı gerekli"),
  })
  .refine((data) => data.password === data.confirm, {
    path: ["confirm"],
    message: "Şifreler eşleşmiyor",
  })

export const addressSchema = z.object({
  fullName: z.string().trim().min(3, "Ad soyad en az 3 karakter olmalı"),
  phone: z
    .string()
    .trim()
    .transform((value) => value.replace(/\D/g, ""))
    .refine((value) => /^05\d{9}$/.test(value), "Geçerli bir cep telefonu girin (05xx)"),
  city: z.string().trim().min(2, "İl gerekli"),
  district: z.string().trim().min(2, "İlçe gerekli"),
  line: z.string().trim().min(10, "Adres en az 10 karakter olmalı"),
  postalCode: z.string().trim().regex(/^\d{5}$/, "Posta kodu 5 haneli olmalı"),
})

export const paymentSchema = z.object({
  cardName: z.string().trim().min(3, "Kart üzerindeki isim gerekli"),
  cardNumber: z
    .string()
    .trim()
    .transform((value) => value.replace(/\s/g, ""))
    .refine((value) => /^\d{16}$/.test(value), "Kart numarası 16 haneli olmalı"),
  expiry: z.string().trim().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Son kullanma AA/YY formatında olmalı"),
  cvc: z.string().trim().regex(/^\d{3}$/, "CVC 3 haneli olmalı"),
  accepted: z.boolean().refine((value) => value, "Devam etmek için sözleşmeyi onaylayın"),
})

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Ad soyad gerekli"),
  email: z.email("Geçerli bir e-posta girin"),
  message: z.string().trim().min(10, "Mesaj en az 10 karakter olmalı"),
})

export function fieldErrors(error: z.ZodError) {
  const map: Record<string, string> = {}
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "")
    if (key && !map[key]) map[key] = issue.message
  }
  return map
}

export type LoginValues = z.infer<typeof loginSchema>
export type RegisterValues = z.infer<typeof registerSchema>
export type AddressValues = z.infer<typeof addressSchema>
export type PaymentValues = z.infer<typeof paymentSchema>
