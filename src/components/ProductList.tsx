import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "./ProductItem";
import { fetchProducts } from "../store/slice/ProductListSlice";
import type { RootState, AppDispatch } from "../store/Store";
import "../styles/products.css";

export default function ProductList() {
    const { products, loading, error } = useSelector(
        (state: RootState) => state.products
    );
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (loading) {
        return <p>Đang tải sản phẩm...</p>;
    }

    if (error) {
        return <p className="product-error">{error}</p>;
    }

    if (products.length === 0) {
        return <p>Chưa có sản phẩm.</p>;
    }

    return (
        <div className="product-list">
            {products.map((product) => (
                <ProductItem key={product.id} product={product} />
            ))}
        </div>
    );
}
