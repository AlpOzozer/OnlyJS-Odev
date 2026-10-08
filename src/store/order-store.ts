import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { AddressValues } from "@/schemas/forms"
import type { CartItem } from "@/store/cart-store"

export type ShippingMethod = "standard" | "same-day"

export type Order = {
  id: string
  createdAt: string
  email: string
  userId?: string
  items: CartItem[]
  address: AddressValues
  shippingMethod: ShippingMethod
  shippingCost: number
  subtotal: number
  total: number
  cardLast4: string
}

type OrderState = {
  orders: Order[]
  add: (order: Order) => void
}

export const FREE_SHIPPING_LIMIT = 100

export function shippingCost(subtotal: number, method: ShippingMethod) {
  if (method === "same-day") return 79.9
  return subtotal >= FREE_SHIPPING_LIMIT ? 0 : 49.9
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      add: (order) => set({ orders: [order, ...get().orders] }),
    }),
    { name: "ojs-orders" },
  ),
)
