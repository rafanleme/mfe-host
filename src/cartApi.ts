// host/src/cartApi.ts
import { useCartStore } from './CartStore';
import type { CartApi, CartSnapshot, Product } from '@mfe/contracts';

function toSnapshot(items: ReturnType<typeof useCartStore.getState>['items']): CartSnapshot {
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = items.reduce((n, i) => n + i.qty, 0);
  return { items, total, count };
}

export const cartApi: CartApi = {
  addToCart(p: Product) {
    useCartStore.getState().add(p);
  },
  removeFromCart(id: string) {
    useCartStore.getState().remove(id);
  },
  clear() {
    useCartStore.getState().clear();
  },
  getSnapshot(): CartSnapshot {
    return toSnapshot(useCartStore.getState().items);
  },
  subscribe(listener) {
    const unsub = useCartStore.subscribe((state) => {
      console.log('[cartApi] state change → count:', toSnapshot(state.items).count);
      listener(toSnapshot(state.items));
    });
    return unsub;
  },
};

export default cartApi;
