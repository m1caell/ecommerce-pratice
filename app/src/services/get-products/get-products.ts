import { ProductModel } from "@/models/product.model";
import { Request } from "../request";

const PAGE = 1;
const LIMIT = 4;

export async function getProductsApi(
  page: number = PAGE,
  limit: number = LIMIT
) {
  const { get } = new Request();

  return get<ProductModel[]>(`/product?page=${page}&limit=${limit}`);
}
