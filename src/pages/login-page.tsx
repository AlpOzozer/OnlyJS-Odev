import { Eye, EyeOff } from "lucide-react"
import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { fieldErrors, loginSchema } from "@/schemas/forms"
import { useAuthStore } from "@/store/auth-store"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginPage() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState("")

  function submit(event: FormEvent) {
    event.preventDefault()
    const parsed = loginSchema.safeParse({ email, password })
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error))
      setFormError("")
      return
    }
    setErrors({})
    const result = login(parsed.data.email, parsed.data.password)
    if (!result.ok) {
      setFormError(result.message)
      return
    }
    navigate("/hesabim")
  }

  return (
    <div className="mx-auto grid min-h-[70vh] max-w-5xl items-center gap-10 px-4 py-12 md:grid-cols-2">
      <div className="hidden md:block">
        <Logo />
        <h1 className="mt-6 text-4xl font-black tracking-tight">Hesabına giriş yap, siparişlerini takip et.</h1>
        <p className="mt-3 text-neutral-600">
          Denemek için demo hesabı kullanabilir veya yeni bir üyelik oluşturabilirsin.
        </p>
        <p className="mt-6 rounded-xl bg-neutral-100 p-4 text-sm">
          Demo: demo@ojsnutrition.com
          <br />
          Şifre: demo1234
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Giriş Yap</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4" noValidate>
            <div className="space-y-1.5">
              <Label htmlFor="email">E-posta</Label>
              <Input id="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} />
              {errors.email ? <p className="text-sm text-red-600">{errors.email}</p> : null}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Şifre</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="pr-11"
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-2 grid size-8 -translate-y-1/2 place-items-center rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              {errors.password ? <p className="text-sm text-red-600">{errors.password}</p> : null}
            </div>
            {formError ? <p className="text-sm text-red-600">{formError}</p> : null}
            <Button type="submit" className="w-full" size="lg">Giriş Yap</Button>
            <p className="text-center text-sm text-muted-foreground">
              Hesabın yok mu? <Link to="/kayit" className="font-semibold text-foreground underline">Kayıt ol</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
