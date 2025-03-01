import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/data";

interface ProductCardProps extends Product {}

export function ProductCard({ id, name, price, image }: ProductCardProps) {
  return (
    <div className="group relative">
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        <Button
          variant="ghost"
          className="absolute right-2 top-2 rounded-full p-2 opacity-0 transition-opacity group-hover:opacity-100"
        >
          <Heart className="h-5 w-5" />
        </Button>
      </div>
      <div className="mt-4">
        <Link to={`/product/${id}`}>
          <h3 className="text-sm font-medium text-gray-900">{name}</h3>
        </Link>
        <p className="mt-1 text-sm font-medium text-gray-900">${price}</p>
      </div>
    </div>
  );
}