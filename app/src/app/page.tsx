import Image from "next/image";
import { ProductModel } from "@/models/product.model";
import { getProductsApi } from "@/services/get-products/get-products";
import Link from "next/link";

async function getHighlightsProducts() {
  const products = await getProductsApi();

  return products;
}

export default async function Home() {
  const products = await getHighlightsProducts();

  return (
    <main className="">
      <h1>Destaques</h1>

      <section>
        {products.map((product: ProductModel) => {
          return (
            <article key={product.id}>
              <Link href={`/produtos/${product.id}`}>
                <Image
                  src={product.url}
                  alt={product.name}
                  width={50}
                  height={50}
                />
                <h2>{product.name}</h2>
                <p>{product.value}</p>
              </Link>
            </article>
          );
        })}
      </section>
    </main>
  );
}
