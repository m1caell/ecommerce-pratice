"use client";
import { ProductModel } from "@/models/product.model";
import { searchProductsApi } from "@/services/search-products/search-products";
import { useState } from "react";
import Image from "next/image";

async function searchProducts(term: string) {
  const products = await searchProductsApi(term, 1, 5);

  return products;
}

export default function SearchProductPage() {
  const [products, setProducts] = useState<ProductModel[]>([]);

  async function handleSearch() {
    const products = await searchProducts("a");

    setProducts(products);
  }

  return (
    <main>
      <h1>Lista produtos</h1>
      <button onClick={handleSearch} type="submit">
        Buscar
      </button>

      {products.map((product: ProductModel) => {
        return (
          <article key={product.id}>
            <Image
              src={product.url}
              alt={product.name}
              width={50}
              height={50}
            />
            <h2>{product.name}</h2>
            <p>{product.value}</p>

            <button>Adicionar</button>
          </article>
        );
      })}
    </main>
  );
}
