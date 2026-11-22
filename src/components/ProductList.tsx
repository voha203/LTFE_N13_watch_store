import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "./ProductItem";
import ProductFilter from "./ProductFilter";
import type { FilterValues } from "./ProductFilter";
import Pagination from "./Pagination";
import ProductSkeleton from "./ProductSkeleton";
import { fetchProducts } from "../store/slice/ProductListSlice";
import type { RootState, AppDispatch } from "../store/Store";
import "../styles/products.css";

const PRODUCTS_PER_PAGE = 8;

const DEFAULT_FILTERS: FilterValues = {
    brand: "all",
    price: "all",
    sort: "default",
};

function normalizeSearchText(value: string) {
    return value
        .toLocaleLowerCase("vi")
        .replace(/đ/g, "d")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function matchesPriceRange(price: number, range: string) {
    if (range === "under5") return price < 5000000;
    if (range === "5-10") return price >= 5000000 && price < 10000000;
    if (range === "10-20") return price >= 10000000 && price < 20000000;
    if (range === "over20") return price >= 20000000;
    return true;
}

export default function ProductList() {
    const { products, loading, error } = useSelector(
        (state: RootState) => state.products
    );
    const dispatch = useDispatch<AppDispatch>();
    const [query, setQuery] = useState("");
    const [filters, setFilters] = useState<FilterValues>(DEFAULT_FILTERS);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const brands = Array.from(new Set(products.map((product) => product.brand))).sort();
    const normalizedQuery = normalizeSearchText(query.trim());
    const searchedProducts = normalizedQuery
        ? products.filter((product) =>
            normalizeSearchText(product.name).includes(normalizedQuery) ||
            normalizeSearchText(product.brand).includes(normalizedQuery)
        )
        : products;
    const brandFilteredProducts = filters.brand === "all"
        ? searchedProducts
        : searchedProducts.filter((product) => product.brand === filters.brand);
    const priceFilteredProducts = brandFilteredProducts.filter((product) =>
        matchesPriceRange(product.price, filters.price)
    );
    const sortedProducts = [...priceFilteredProducts].sort((a, b) => {
        if (filters.sort === "price-asc") return a.price - b.price;
        if (filters.sort === "price-desc") return b.price - a.price;
        if (filters.sort === "name-asc") return a.name.localeCompare(b.name, "vi");
        if (filters.sort === "name-desc") return b.name.localeCompare(a.name, "vi");
        return 0;
    });
    const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
    const safePage = Math.min(currentPage, Math.max(totalPages, 1));
    const visibleProducts = sortedProducts.slice(
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

            {!loading && !error && products.length > 0 && (
                <ProductFilter
                    brands={brands}
                    value={filters}
                    onChange={(nextFilters) => {
                        setFilters(nextFilters);
                        setCurrentPage(1);
                    }}
                />
            )}

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
            ) : sortedProducts.length === 0 ? (
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
