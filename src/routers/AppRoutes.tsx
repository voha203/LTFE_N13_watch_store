import {Routes, Route, Router} from "react-router-dom";
import HomePage from "../pages/HomePage.tsx";
import ProductsPage from "../pages/ProductsPage.tsx";
import ProductDetailPage from "../pages/ProductDetailPage.tsx";
import BlogPage from "../pages/BlogPage.tsx";
import BlogDetailPage from "../pages/BlogDetailPage.tsx";
import CartPage from "../pages/CartPage.tsx";
import LoginPage from "../pages/LoginPage.tsx";
import CheckoutPage from "../pages/CheckoutPage.tsx";
import NotFoundPage from "../pages/NotFoundPage.tsx";
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