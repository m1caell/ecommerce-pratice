export default function ProductPageById({
  params,
}: {
  params: { id: number };
}) {
  return (
    <main>
      <h1>Product {params.id}</h1>
    </main>
  );
}
