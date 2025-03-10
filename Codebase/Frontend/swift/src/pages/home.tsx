import { ProductCard } from "@/components/product/product-card";

const featuredProducts = [
  {
    id: "1",
    name: "Minimalist Leather Watch",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&q=80"
  },
  {
    id: "2",
    name: "Wireless Earbuds",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&q=80"
  },
  {
    id: "9",
    name: "Premium Backpack",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80"
  },
  {
    id: "10",
    name: "Smart Water Bottle",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80"
  }
];

export function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <section className="mb-12">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80"
            alt="Hero"
            className="h-[500px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white sm:text-6xl">
                Summer Collection
              </h1>
              <p className="mt-4 text-xl text-white">
                Discover our latest arrivals
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
    </div>
  );
}