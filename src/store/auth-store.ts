import { create } from "zustand"
import { persist } from "zustand/middleware"

export type SessionUser = {
  id: string
  name: string
  email: string
}

type StoredUser = SessionUser & { password: string }

type AuthState = {
  users: StoredUser[]
  user: SessionUser | null
  register: (input: { name: string; email: string; password: string }) => { ok: true } | { ok: false; message: string }
  login: (email: string, password: string) => { ok: true } | { ok: false; message: string }
  logout: () => void
}

const demoUser: StoredUser = {
  id: "demo-user",
  name: "Demo Kullanıcı",
  email: "demo@ojsnutrition.com",
  password: "demo1234",
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      users: [demoUser],
      user: null,
      register: ({ name, email, password }) => {
        const exists = get().users.some((item) => item.email.toLowerCase() === email.toLowerCase())
        if (exists) return { ok: false, message: "Bu e-posta ile kayıtlı bir hesap var." }
        const next: StoredUser = { id: crypto.randomUUID(), name, email, password }
        set({
          users: [...get().users, next],
          user: { id: next.id, name: next.name, email: next.email },
        })
        return { ok: true }
      },
      login: (email, password) => {
        const found = get().users.find(
          (item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password,
        )
        if (!found) return { ok: false, message: "E-posta veya şifre hatalı." }
        set({ user: { id: found.id, name: found.name, email: found.email } })
        return { ok: true }
      },
      logout: () => set({ user: null }),
    }),
    { name: "ojs-auth" },
  ),
)
