import {Routes, Route} from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import ProductsPage from "../pages/ProductsPage.jsx";
import ProductDetailPage from "../pages/ProductDetailPage.jsx";
import BlogPage from "../pages/BlogPage.jsx";
import BlogDetailPage from "../pages/BlogDetailPage.jsx";
import CartPage from "../pages/CartPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import CheckoutPage from "../pages/CheckoutPage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}