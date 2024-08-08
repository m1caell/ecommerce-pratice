import { Request } from "../request";
import { GenerateCartResponse } from "./dtos/generate-response";

export async function generateCart() {
  const { post } = new Request();

  return post<GenerateCartResponse, null>("/cart/generate");
}
