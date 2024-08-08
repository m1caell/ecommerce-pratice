import { ProductCartModel } from "@/models/product-cart.model";
import { ProductModel } from "@/models/product.model";
import { create } from "zustand";

type Store = {
  cartId?: number;
  products: ProductCartModel[];
  totalPrice: number;
  setCart: (id: number) => void;
  addProduct: (product: ProductModel) => void;
  removeProduct: (product: ProductModel) => void;
};

export const useCartStore = create<Store>()((set) => ({
  cartId: undefined,
  products: [],
  totalPrice: 0,
  setCart: (id) => set(() => ({ cartId: id })),
  addProduct: (product) => set((state) => ({})),
  removeProduct: (product) => set((state) => ({})),
}));
