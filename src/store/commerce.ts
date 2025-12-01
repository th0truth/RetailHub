import { create } from 'zustand'
import type { Product } from '../data/catalog'

type CartItem = {
  productId: string
  qty: number
}

type CommerceState = {
  cart: CartItem[]
  favorites: Set<string>
  compare: Set<string>
  addToCart: (productId: string, qty?: number) => void
  toggleFavorite: (productId: string) => void
  toggleCompare: (productId: string) => void
  clearCart: () => void
}

export const useCommerceStore = create<CommerceState>((set) => ({
  cart: [],
  favorites: new Set(),
  compare: new Set(),
  addToCart: (productId, qty = 1) =>
    set((state) => {
      const existing = state.cart.find((item) => item.productId === productId)
      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.productId === productId ? { ...item, qty: item.qty + qty } : item
          ),
        }
      }

      return { cart: [...state.cart, { productId, qty }] }
    }),
  toggleFavorite: (productId) =>
    set((state) => {
      const next = new Set(state.favorites)
      next.has(productId) ? next.delete(productId) : next.add(productId)
      return { favorites: next }
    }),
  toggleCompare: (productId) =>
    set((state) => {
      const next = new Set(state.compare)
      if (next.has(productId)) {
        next.delete(productId)
      } else if (next.size < 4) {
        next.add(productId)
      }
      return { compare: next }
    }),
  clearCart: () => set({ cart: [] }),
}))

export const isFavorited = (productId: string, set: Set<string>) => set.has(productId)
export const isCompared = (productId: string, set: Set<string>) => set.has(productId)

export const enrichCart = (products: Product[], cart: CartItem[]) =>
  cart
    .map((item) => {
      const product = products.find((p) => p.id === item.productId)
      if (!product) return null
      return {
        ...item,
        product,
        lineTotal: product.price * item.qty,
      }
    })
    .filter(Boolean)

