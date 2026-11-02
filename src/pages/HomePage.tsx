import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductItem from "../components/ProductItem";
import { fetchProducts } from "../store/slice/ProductListSlice";
import type { RootState, AppDispatch } from "../store/Store";
import "../styles/products.css";
import "../styles/home.css";

export default function HomePage() {
    const { products, loading, error } = useSelector(
        (state: RootState) => state.products
    );
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const featuredProducts = products.filter((product) => product.featured).slice(0, 4);
    const displayedProducts = featuredProducts.length
        ? featuredProducts
        : products.slice(0, 4);

    return (
        <div className="home-page">
            <section className="home-hero">
                <div>
                    <p className="home-eyebrow">WATCH STORE / EVERYDAY STYLE</p>
                    <h1>
                        Đồng hồ chính hãng
                        <br />
                        Phong cách của bạn.
                    </h1>
                    <p>
                        Chọn chiếc đồng hồ bạn yêu thích. Phong cách bạn lựa chọn.
                    </p>
                    <Link className="home-button" to="/products">
                        Khám phá sản phẩm
                    </Link>
                </div>
                <div className="home-hero-visual" aria-hidden="true">
                    <span>
                        YOUR NEXT
                        <br />
                        FAVORITE WATCH.
                    </span>
                    <div className="home-hero-number">01 / WATCH STORE</div>
                </div>
            </section>

            <section className="home-products">
                <div className="home-section-heading">
                    <div>
                        <p className="home-eyebrow">ĐƯỢC LỰA CHỌN CHO BẠN</p>
                        <h2>Sản phẩm nổi bật</h2>
                    </div>
                    <Link to="/products">Xem tất cả</Link>
                </div>

                {loading && <p>Đang tải sản phẩm...</p>}
                {error && <p className="product-error">{error}</p>}
                {!loading && !error && displayedProducts.length === 0 && (
                    <p>Chưa có sản phẩm.</p>
                )}

                {displayedProducts.length > 0 && (
                    <div className="product-list">
                        {displayedProducts.map((product) => (
                            <ProductItem key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
