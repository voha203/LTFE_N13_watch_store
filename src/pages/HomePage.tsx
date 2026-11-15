import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductItem from "../components/ProductItem";
import { BlogCard } from "../components/BlogCard";
import { fetchProducts } from "../store/slice/ProductListSlice";
import { fetchRssBlog } from "../services/rssService";
import type { RootState, AppDispatch } from "../store/Store";
import type { BlogPost } from "../types/BlogPost";
import "../styles/products.css";
import "../styles/home.css";

export default function HomePage() {
    const { products, loading, error } = useSelector(
        (state: RootState) => state.products
    );
    const dispatch = useDispatch<AppDispatch>();

    const [recentBlogs, setRecentBlogs] = useState<BlogPost[]>([]);
    const [blogsLoading, setBlogsLoading] = useState<boolean>(true);
    const [newsletterEmail, setNewsletterEmail] = useState<string>("");
    const [subscribed, setSubscribed] = useState<boolean>(false);

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, products.length]);

    useEffect(() => {
        let isMounted = true;
        fetchRssBlog()
            .then((posts) => {
                if (isMounted) {
                    setRecentBlogs(posts.slice(0, 3));
                    setBlogsLoading(false);
                }
            })
            .catch(() => {
                if (isMounted) {
                    setBlogsLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

    const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
    const displayedProducts = featuredProducts.length > 0 ? featuredProducts : products.slice(0, 4);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (newsletterEmail.trim()) {
            setSubscribed(true);
            setNewsletterEmail("");
        }
    };

    return (
        <div className="home-page">
            <section className="home-hero">
                <div className="home-hero-content">
                    <p className="home-eyebrow">WATCH STORE / PHONG CÁCH MỖI NGÀY</p>
                    <h1 className="home-hero-title">
                        Đồng hồ chính hãng
                        <br />
                        Khẳng định phong cách riêng.
                    </h1>
                    <p className="home-hero-description">
                        Khám phá bộ sưu tập đồng hồ cao cấp từ các thương hiệu hàng đầu thế giới: Casio, Seiko, Citizen, Orient. Thiết kế tinh xảo, chất lượng bền bỉ vượt thời gian.
                    </p>
                    <div className="home-hero-actions">
                        <Link className="home-button home-button--primary" to="/products">
                            Khám phá bộ sưu tập &rarr;
                        </Link>
                        <Link className="home-button home-button--secondary" to="/blog">
                            Đọc tin tức đồng hồ
                        </Link>
                    </div>
                </div>
                <div className="home-hero-visual" aria-hidden="true">
                    <span className="home-hero-slogan">
                        YOUR NEXT
                        <br />
                        FAVORITE
                        <br />
                        WATCH.
                    </span>
                    <div className="home-hero-tag">2026 COLLECTION / WATCH STORE</div>
                </div>
            </section>

            <section className="home-features">
                <div className="home-feature-item">
                    <div className="home-feature-icon">🛡️</div>
                    <div className="home-feature-info">
                        <h3>100% Chính Hãng</h3>
                        <p>Cam kết hàng chính ngạch, hoàn 200% nếu phát hiện giả.</p>
                    </div>
                </div>
                <div className="home-feature-item">
                    <div className="home-feature-icon">🚚</div>
                    <div className="home-feature-info">
                        <h3>Giao Hàng Miễn Phí</h3>
                        <p>Freeship toàn quốc cho mọi đơn hàng từ 1.000.000đ.</p>
                    </div>
                </div>
                <div className="home-feature-item">
                    <div className="home-feature-icon">🔧</div>
                    <div className="home-feature-info">
                        <h3>Bảo Hành 5 Năm</h3>
                        <p>Bảo hành máy và miễn phí thay pin trọn đời sản phẩm.</p>
                    </div>
                </div>
                <div className="home-feature-item">
                    <div className="home-feature-icon">🔄</div>
                    <div className="home-feature-info">
                        <h3>Đổi Trả Trong 7 Ngày</h3>
                        <p>1 đổi 1 nhanh chóng nếu phát sinh lỗi từ nhà sản xuất.</p>
                    </div>
                </div>
            </section>

            <section className="home-products">
                <div className="home-section-heading">
                    <div>
                        <p className="home-eyebrow">ĐƯỢC LỰA CHỌN CHO BẠN</p>
                        <h2>Sản phẩm nổi bật</h2>
                    </div>
                    <Link to="/products" className="home-view-all">
                        Xem tất cả sản phẩm &rarr;
                    </Link>
                </div>

                {loading && (
                    <div className="home-loading">
                        <p>Đang tải danh sách sản phẩm...</p>
                    </div>
                )}

                {error && (
                    <div className="home-error">
                        <p className="product-error">{error}</p>
                        <button
                            type="button"
                            className="home-retry-btn"
                            onClick={() => dispatch(fetchProducts())}
                        >
                            Thử lại
                        </button>
                    </div>
                )}

                {!loading && !error && displayedProducts.length === 0 && (
                    <p className="home-empty">Chưa có sản phẩm nào được hiển thị.</p>
                )}

                {displayedProducts.length > 0 && (
                    <div className="product-list">
                        {displayedProducts.map((product) => (
                            <ProductItem key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>

            <section className="home-brands">
                <div className="home-section-heading">
                    <div>
                        <p className="home-eyebrow">THƯƠNG HIỆU HÀNG ĐẦU</p>
                        <h2>Đối tác uy tín</h2>
                    </div>
                </div>
                <div className="home-brands-grid">
                    <div className="home-brand-card">
                        <h3>Casio</h3>
                        <p>G-Shock, Edifice & Vintage trẻ trung, siêu bền</p>
                        <Link to="/products" className="home-brand-link">Khám phá &rarr;</Link>
                    </div>
                    <div className="home-brand-card">
                        <h3>Seiko</h3>
                        <p>Biểu tượng cơ khí Nhật Bản, chính xác và sang trọng</p>
                        <Link to="/products" className="home-brand-link">Khám phá &rarr;</Link>
                    </div>
                    <div className="home-brand-card">
                        <h3>Citizen</h3>
                        <p>Tiên phong công nghệ Eco-Drive chuyển hóa ánh sáng</p>
                        <Link to="/products" className="home-brand-link">Khám phá &rarr;</Link>
                    </div>
                    <div className="home-brand-card">
                        <h3>Orient</h3>
                        <p>Phong cách cổ điển kinh điển, lịch lãm cho phái mạnh</p>
                        <Link to="/products" className="home-brand-link">Khám phá &rarr;</Link>
                    </div>
                </div>
            </section>

            <section className="home-blog-section">
                <div className="home-section-heading">
                    <div>
                        <p className="home-eyebrow">KIẾN THỨC & TIN TỨC</p>
                        <h2>Bài viết mới nhất</h2>
                    </div>
                    <Link to="/blog" className="home-view-all">
                        Xem tất cả bài viết &rarr;
                    </Link>
                </div>

                {blogsLoading ? (
                    <p className="home-loading">Đang tải bài viết...</p>
                ) : recentBlogs.length > 0 ? (
                    <div className="home-blog-grid">
                        {recentBlogs.map((post, idx) => (
                            <BlogCard key={post.slug || idx} post={post} />
                        ))}
                    </div>
                ) : (
                    <p className="home-empty">Chưa có bài viết mới.</p>
                )}
            </section>

            <section className="home-newsletter">
                <div className="home-newsletter-content">
                    <h2>Đăng ký nhận ưu đãi độc quyền</h2>
                    <p>Nhận ngay mã giảm giá 10% cho đơn hàng đầu tiên cùng bản tin xu hướng đồng hồ mới nhất.</p>
                    {subscribed ? (
                        <p className="home-newsletter-success">
                            Cảm ơn bạn đã đăng ký! Mã giảm giá đã được gửi vào hòm thư.
                        </p>
                    ) : (
                        <form className="home-newsletter-form" onSubmit={handleSubscribe}>
                            <input
                                type="email"
                                placeholder="Nhập địa chỉ email của bạn..."
                                value={newsletterEmail}
                                onChange={(e) => setNewsletterEmail(e.target.value)}
                                required
                            />
                            <button type="submit">Đăng ký ngay</button>
                        </form>
                    )}
                </div>
            </section>
        </div>
    );
}
