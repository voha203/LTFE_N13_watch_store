import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "./ProductItem";
import Pagination from "./Pagination";
import ProductSkeleton from "./ProductSkeleton";
import { fetchProducts } from "../store/slice/ProductListSlice";
import type { RootState, AppDispatch } from "../store/Store";
import "../styles/products.css";

const PRODUCTS_PER_PAGE = 8;

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
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const normalizedQuery = normalizeSearchText(query.trim());
    const filteredProducts = normalizedQuery
        ? products.filter((product) =>
            normalizeSearchText(product.name).includes(normalizedQuery) ||
            normalizeSearchText(product.brand).includes(normalizedQuery)
        )
        : products;
    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
    const safePage = Math.min(currentPage, Math.max(totalPages, 1));
    const visibleProducts = filteredProducts.slice(
        (safePage - 1) * PRODUCTS_PER_PAGE,
        safePage * PRODUCTS_PER_PAGE
    );

    return (
        <div className="product-catalog">
            <div className="product-search">
                <input
                    type="search"
                    value={query}
                    onChange={(event) => {
                        setQuery(event.target.value);
                        setCurrentPage(1);
                    }}
                    placeholder="Tìm kiếm sản phẩm theo tên và hãng"
                    aria-label="Tìm kiếm sản phẩm theo tên và hãng"
                />
            </div>

            {loading ? (
                <div className="product-state" aria-busy="true">
                    <p className="product-loading">Đang tải sản phẩm...</p>
                    <ProductSkeleton />
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
                <>
                    <div className="product-list">
                        {visibleProducts.map((product) => (
                            <ProductItem key={product.id} product={product} />
                        ))}
                    </div>
                    <Pagination
                        currentPage={safePage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </>
            )}
        </div>
    );
}
