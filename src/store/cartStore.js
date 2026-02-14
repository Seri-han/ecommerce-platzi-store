import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) => {
        const existing = get().cart.find(p => p.id === product.id);

        if (existing) {
          set({
            cart: get().cart.map(p =>
              p.id === product.id
                ? { ...p, quantity: p.quantity + 1 }
                : p
            )
          });
        } else {
          set({
            cart: [...get().cart, { ...product, quantity: 1 }]
          });
        }
      },

      updateQuantity: (id, quantity) => {
        set({
          cart: get().cart.map(p =>
            p.id === id ? { ...p, quantity } : p
          )
        });
      },

      removeFromCart: (id) => {
        set({
          cart: get().cart.filter(p => p.id !== id)
        });
      },

      clearCart: () => set({ cart: [] })
    }),
    {
      name: "cart-storage" //localstorage
    }
  )
);

export default useCartStore;
