import { create } from "zustand"
import { persist } from "zustand/middleware"

export type CartItem = {
  key: string
  productId: string
  slug: string
  name: string
  shortLabel: string
  flavorId: string
  flavorName: string
  flavorColor: string
  sizeId: string
  sizeLabel: string
  price: number
  quantity: number
}

type AddInput = Omit<CartItem, "key" | "quantity"> & { quantity?: number }

type CartState = {
  items: CartItem[]
  isOpen: boolean
  open: () => void
  close: () => void
  setOpen: (open: boolean) => void
  add: (input: AddInput) => void
  setQuantity: (key: string, quantity: number) => void
  remove: (key: string) => void
  clear: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      setOpen: (isOpen) => set({ isOpen }),
      add: (input) => {
        const key = `${input.productId}:${input.flavorId}:${input.sizeId}`
        const quantity = input.quantity ?? 1
        const existing = get().items.find((item) => item.key === key)
        const items = existing
          ? get().items.map((item) =>
              item.key === key ? { ...item, quantity: Math.min(10, item.quantity + quantity) } : item,
            )
          : [...get().items, { ...input, key, quantity: Math.min(10, quantity) }]
        set({ items, isOpen: true })
      },
      setQuantity: (key, quantity) => {
        if (quantity < 1) {
          set({ items: get().items.filter((item) => item.key !== key) })
          return
        }
        set({
          items: get().items.map((item) => (item.key === key ? { ...item, quantity: Math.min(10, quantity) } : item)),
        })
      },
      remove: (key) => set({ items: get().items.filter((item) => item.key !== key) }),
      clear: () => set({ items: [] }),
    }),
    {
      name: "ojs-cart",
      partialize: (state) => ({ items: state.items }),
    },
  ),
)

export function cartCount(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}

export function cartSubtotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}
