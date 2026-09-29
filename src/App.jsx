import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import CheckOutPage from "./pages/CheckOutPage";
import LoginPage from "./pages/LoginPage";
import ProtectedPage from "./pages/ProtectedPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ToastProvider>
            <Routes>
              <Route path="/" element={<ProductsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/products/:id" element={<ProductDetailsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <CheckOutPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/protected"
                element={
                  <ProtectedRoute>
                    <ProtectedPage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </ToastProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;