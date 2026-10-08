import { Eye, EyeOff } from "lucide-react"
import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { fieldErrors, registerSchema } from "@/schemas/forms"
import { useAuthStore } from "@/store/auth-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RegisterPage() {
  const navigate = useNavigate()
  const register = useAuthStore((state) => state.register)
  const [values, setValues] = useState({ name: "", email: "", password: "", confirm: "" })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState("")

  function submit(event: FormEvent) {
    event.preventDefault()
    const parsed = registerSchema.safeParse(values)
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error))
      return
    }
    setErrors({})
    const result = register(parsed.data)
    if (!result.ok) {
      setFormError(result.message)
      return
    }
    navigate("/hesabim")
  }

  function setField(key: keyof typeof values, value: string) {
    setValues((current) => ({ ...current, [key]: value }))
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Kayıt Ol</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4" noValidate>
            <Field label="Ad soyad" id="name" value={values.name} error={errors.name} onChange={(value) => setField("name", value)} />
            <Field label="E-posta" id="email" type="email" value={values.email} error={errors.email} onChange={(value) => setField("email", value)} />
            <Field label="Şifre" id="password" type="password" canReveal value={values.password} error={errors.password} onChange={(value) => setField("password", value)} />
            <Field label="Şifre tekrar" id="confirm" type="password" canReveal value={values.confirm} error={errors.confirm} onChange={(value) => setField("confirm", value)} />
            {formError ? <p className="text-sm text-red-600">{formError}</p> : null}
            <Button type="submit" className="w-full" size="lg">Hesap Oluştur</Button>
            <p className="text-center text-sm text-muted-foreground">
              Zaten üye misin? <Link to="/giris" className="font-semibold text-foreground underline">Giriş yap</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

function Field({
  label,
  id,
  value,
  error,
  onChange,
  type = "text",
  canReveal = false,
}: {
  label: string
  id: string
  value: string
  error?: string
  onChange: (value: string) => void
  type?: string
  canReveal?: boolean
}) {
  const [visible, setVisible] = useState(false)
  const inputType = canReveal && visible ? "text" : type

  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={inputType}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={canReveal ? "pr-11" : undefined}
        />
        {canReveal ? (
          <button
            type="button"
            className="absolute top-1/2 right-2 grid size-8 -translate-y-1/2 place-items-center rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
            onClick={() => setVisible((current) => !current)}
            aria-label={visible ? `${label} alanını gizle` : `${label} alanını göster`}
            aria-pressed={visible}
          >
            {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        ) : null}
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  )
}
