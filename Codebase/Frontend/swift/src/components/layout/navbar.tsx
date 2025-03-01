import { ShoppingCart, User, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";

export function Navbar() {
  const { state } = useCart();
  const { user, logout } = useAuth();
  const cartItemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-bold text-gray-900">
              SwiftCart
            </Link>
            <div className="hidden md:flex items-center gap-4">
              <Link to="/products" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                All Products
              </Link>
              <Link to="/products?category=electronics" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                Electronics
              </Link>
              <Link to="/products?category=clothing" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                Clothing
              </Link>
            </div>
          </div>

          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder="Search products..."
                className="w-full rounded-md border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-500 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/cart">
              <Button variant="ghost" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gray-900 text-[10px] text-white">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/account">
                  <Button variant="ghost">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="ghost" onClick={logout}>
                  Sign out
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button>Sign in</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}