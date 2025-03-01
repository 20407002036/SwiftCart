import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/layout/navbar';
import { HomePage } from '@/pages/home';
import { ProductsPage } from '@/pages/products';
import { ProductPage } from '@/pages/product';
import { CartPage } from '@/pages/cart';
import { CheckoutPage } from '@/pages/checkout';
import { CheckoutSuccessPage } from '@/pages/checkout-success';
import { LoginPage } from '@/pages/login';
import { SignupPage } from '@/pages/signup';
import { AccountPage } from '@/pages/account';
import { CartProvider } from '@/lib/cart';
import { AuthProvider } from '@/lib/auth';
import { ProtectedRoute } from '@/components/auth/protected-route';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-white">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute>
                      <CheckoutPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/checkout/success"
                  element={
                    <ProtectedRoute>
                      <CheckoutSuccessPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route
                  path="/account"
                  element={
                    <ProtectedRoute>
                      <AccountPage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App