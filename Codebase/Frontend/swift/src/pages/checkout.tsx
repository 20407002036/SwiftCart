import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface PaymentInfo {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

const initialShippingInfo: ShippingInfo = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  country: "United States",
};

const initialPaymentInfo: PaymentInfo = {
  cardNumber: "",
  cardHolder: "",
  expiryDate: "",
  cvv: "",
};

export function CheckoutPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useCart();
  const [step, setStep] = useState<"shipping" | "payment">("shipping");
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>(initialShippingInfo);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>(initialPaymentInfo);
  const [isProcessing, setIsProcessing] = useState(false);

  if (state.items.length === 0) {
    navigate("/cart");
    return null;
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Clear cart and redirect to success page send Email for order confirmation  
    dispatch({ type: "CLEAR_CART" });
    navigate("/checkout/success");
  };

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    const groups = numbers.match(/.{1,4}/g) || [];
    return groups.join(" ").substr(0, 19);
  };

  const formatExpiryDate = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length >= 2) {
      return numbers.substr(0, 2) + "/" + numbers.substr(2, 2);
    }
    return numbers;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
          {/* Order summary */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
              <div className="flow-root">
                <ul className="-my-4 divide-y divide-gray-200">
                  {state.items.map((item) => (
                    <li key={item.id} className="flex items-center py-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 flex-none rounded-md border border-gray-200 object-cover"
                      />
                      <div className="ml-4 flex-auto">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">Qty {item.quantity}</p>
                      </div>
                      <p className="ml-4 font-medium text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <dl className="mt-6 space-y-4 border-t border-gray-200 pt-4 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-gray-600">Subtotal</dt>
                  <dd className="font-medium text-gray-900">${state.total.toFixed(2)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-gray-600">Shipping</dt>
                  <dd className="font-medium text-gray-900">Free</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-gray-900">Order total</dt>
                  <dd className="text-base font-medium text-gray-900">
                    ${state.total.toFixed(2)}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Checkout forms */}
          <div className="mt-12 lg:mt-0 lg:col-span-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              {step === "shipping" ? (
                <form onSubmit={handleShippingSubmit} className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900">Shipping Information</h2>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        First name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        required
                        value={shippingInfo.firstName}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, firstName: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Last name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        required
                        value={shippingInfo.lastName}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, lastName: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={shippingInfo.email}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, email: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Street address
                      </label>
                      <input
                        type="text"
                        id="address"
                        required
                        value={shippingInfo.address}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, address: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        required
                        value={shippingInfo.city}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, city: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                        State
                      </label>
                      <input
                        type="text"
                        id="state"
                        required
                        value={shippingInfo.state}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, state: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                        ZIP / Postal code
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        required
                        value={shippingInfo.zipCode}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, zipCode: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Country
                      </label>
                      <select
                        id="country"
                        required
                        value={shippingInfo.country}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, country: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm"
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="Mexico">Mexico</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button type="submit" className="w-full">
                      Continue to Payment
                    </Button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">Payment Information</h2>
                    <div className="flex items-center text-sm text-gray-600">
                      <Lock className="h-4 w-4 mr-1" />
                      Secure payment
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                        Card number
                      </label>
                      <div className="mt-1 relative">
                        <input
                          type="text"
                          id="cardNumber"
                          required
                          maxLength={19}
                          placeholder="1234 5678 9012 3456"
                          value={paymentInfo.cardNumber}
                          onChange={(e) =>
                            setPaymentInfo({
                              ...paymentInfo,
                              cardNumber: formatCardNumber(e.target.value),
                            })
                          }
                          className="block w-full rounded-md border-gray-300 pl-10 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm"
                        />
                        <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700">
                        Cardholder name
                      </label>
                      <input
                        type="text"
                        id="cardHolder"
                        required
                        placeholder="John Doe"
                        value={paymentInfo.cardHolder}
                        onChange={(e) =>
                          setPaymentInfo({ ...paymentInfo, cardHolder: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                          Expiry date
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          required
                          placeholder="MM/YY"
                          maxLength={5}
                          value={paymentInfo.expiryDate}
                          onChange={(e) =>
                            setPaymentInfo({
                              ...paymentInfo,
                              expiryDate: formatExpiryDate(e.target.value),
                            })
                          }
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          required
                          placeholder="123"
                          maxLength={3}
                          value={paymentInfo.cvv}
                          onChange={(e) =>
                            setPaymentInfo({
                              ...paymentInfo,
                              cvv: e.target.value.replace(/\D/g, ""),
                            })
                          }
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : `Pay $${state.total.toFixed(2)}`}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full"
                      onClick={() => setStep("shipping")}
                      disabled={isProcessing}
                    >
                      Back to Shipping
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}