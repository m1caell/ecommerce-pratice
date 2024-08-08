import { ProductCartModel } from "@/models/product-cart.model";

export interface GenerateCartResponse {
  id: number;
  products: ProductCartModel[];
  valueTotal: number;
}
