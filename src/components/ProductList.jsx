import ProductCart from "./ProductCart";

export default function ProductList({ products = [] }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCart key={product.id} product={product} />
      ))}
    </section>
  );
}