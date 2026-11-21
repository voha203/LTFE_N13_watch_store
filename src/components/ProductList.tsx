import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "./ProductItem";
import { fetchProducts } from "../store/slice/ProductListSlice";
import type { RootState, AppDispatch } from "../store/Store";
import "../styles/products.css";

function normalizeSearchText(value: string) {
    return value
        .toLocaleLowerCase("vi")
        .replace(/đ/g, "d")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

export default function ProductList() {
    const { products, loading, error } = useSelector(
        (state: RootState) => state.products
    );
    const dispatch = useDispatch<AppDispatch>();
    const [query, setQuery] = useState("");

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const normalizedQuery = normalizeSearchText(query.trim());
    const filteredProducts = normalizedQuery
        ? products.filter((product) =>
            normalizeSearchText(product.name).includes(normalizedQuery)
        )
        : products;

    return (
        <div className="product-catalog">
            <div className="product-search">
                <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Tìm kiếm sản phẩm theo tên"
                    aria-label="Tìm kiếm sản phẩm theo tên"
                />
            </div>

            {loading ? (
                <div className="product-state" aria-busy="true">
                    <p className="product-loading">Đang tải sản phẩm...</p>
                    <div className="product-skeleton-grid">
                        {[0, 1, 2, 3].map((item) => (
                            <div key={item} className="product-skeleton-card">
                                <div className="product-skeleton-media" />
                                <div className="product-skeleton-line" />
                                <div className="product-skeleton-line product-skeleton-line--short" />
                            </div>
                        ))}
                    </div>
                </div>
            ) : error ? (
                <div className="product-state product-state--error" role="alert">
                    <p className="product-error">{error}</p>
                    <button
                        type="button"
                        className="product-retry"
                        onClick={() => dispatch(fetchProducts())}
                    >
                        Thử lại
                    </button>
                </div>
            ) : filteredProducts.length === 0 ? (
                <p className="product-empty">
                    {products.length === 0
                        ? "Chưa có sản phẩm."
                        : "Không tìm thấy sản phẩm phù hợp."}
                </p>
            ) : (
                <div className="product-list">
                    {filteredProducts.map((product) => (
                        <ProductItem key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
