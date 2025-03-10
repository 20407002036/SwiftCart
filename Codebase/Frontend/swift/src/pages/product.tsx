import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, Share2, Star, Truck, Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data";
import { useCart } from "@/lib/cart";

export function ProductPage() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useCart();

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link to="/products">
            <Button>Return to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { product, quantity }
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/products"
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-8"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Products
      </Link>

      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Product Images */}
        <div className="aspect-square relative">
          <img
            src={product.images?.[selectedImage] || product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
          {product.images && product.images.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? "border-gray-900" : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="mt-8 lg:mt-0">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <div className="mt-3 flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 text-yellow-400"
                  fill="currentColor"
                />
              ))}
            </div>
            <span className="ml-3 text-sm text-gray-600">128 reviews</span>
          </div>

          <p className="mt-6 text-xl font-medium text-gray-900">
            Ksh. {product.price.toFixed(2)}
          </p>

          <div className="mt-6">
            <h2 className="text-sm font-medium text-gray-900">Description</h2>
            <p className="mt-2 text-sm text-gray-600">{product.description}</p>
          </div>

          {product.specs && (
            <div className="mt-8">
              <h2 className="text-sm font-medium text-gray-900">Specifications</h2>
              <dl className="mt-4 space-y-4">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex items-baseline">
                    <dt className="w-1/3 text-sm font-medium text-gray-600">{key}</dt>
                    <dd className="text-sm text-gray-900">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="mt-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-gray-600 hover:text-gray-900"
                >
                  -
                </button>
                <span className="px-4 py-2 text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-gray-600 hover:text-gray-900"
                >
                  +
                </button>
              </div>
              <Button className="flex-1" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Button variant="ghost">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Truck className="h-5 w-5" />
              <span>Free shipping on orders over Ksh. 10,000</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Shield className="h-5 w-5" />
              <span>2 year extended warranty</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}