import { create } from 'zustand';
import type { CartItem as CI, Product as P } from '@mfe/contracts';

export type CartItem = CI;
export type Product = P;

type CartState = {
  items: CartItem[];
  add: (product: Product) => void;
  remove: (id: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  add: (product) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === product.id);
      if (existing) {
        return { items: state.items.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i) };
      }
      return { items: [...state.items, { ...product, qty: 1 }] };
    }),
  remove: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  clear: () => set({ items: [] }),
}));
