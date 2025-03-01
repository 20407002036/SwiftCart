import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CheckoutSuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home if accessed directly
    const timeout = setTimeout(() => {
      navigate("/");
    }, 10000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Order Confirmed!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Thank you for your purchase. We'll send you an email with your order details shortly.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <Link to="/">
            <Button className="w-full">
              Continue Shopping
            </Button>
          </Link>
          <p className="text-sm text-gray-500">
            You'll be redirected to the home page in a few seconds...
          </p>
        </div>
      </div>
    </div>
  );
}