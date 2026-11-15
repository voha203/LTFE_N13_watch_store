import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
    cartCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ cartCount = 0 }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <header className="store-header">
            <div className="store-header-inner">
                <div className="store-logo">
                    <Link to="/" className="store-logo-link">
                        <span className="store-logo-icon" aria-hidden="true">⏱️</span>
                        <span className="store-logo-text">WatchStore</span>
                    </Link>
                </div>

                <nav className="store-nav store-nav--desktop" aria-label="Menu chính">
                    <Link
                        to="/"
                        className={`store-nav-link ${location.pathname === '/' ? 'active' : ''}`}
                    >
                        Trang chủ
                    </Link>
                    <Link
                        to="/products"
                        className={`store-nav-link ${location.pathname.startsWith('/products') ? 'active' : ''}`}
                    >
                        Sản phẩm
                    </Link>
                    <Link
                        to="/blog"
                        className={`store-nav-link ${location.pathname.startsWith('/blog') ? 'active' : ''}`}
                    >
                        Blog
                    </Link>
                    <Link
                        to="/login"
                        className={`store-nav-link ${location.pathname === '/login' ? 'active' : ''}`}
                    >
                        Đăng nhập
                    </Link>
                    <Link
                        to="/cart"
                        aria-label={`Giỏ hàng, ${cartCount} sản phẩm`}
                        className="store-nav-cart"
                    >
                        <span>Giỏ hàng</span>
                        <span
                            aria-hidden="true"
                            className={`store-cart-badge ${cartCount > 0 ? 'store-cart-badge--active' : ''}`}
                        >
                            {cartCount}
                        </span>
                    </Link>
                </nav>

                <div className="store-header-mobile-controls">
                    <Link
                        to="/cart"
                        aria-label={`Giỏ hàng, ${cartCount} sản phẩm`}
                        className="store-nav-cart store-nav-cart--mobile"
                    >
                        <span className="store-cart-icon" aria-hidden="true">🛒</span>
                        <span
                            aria-hidden="true"
                            className={`store-cart-badge ${cartCount > 0 ? 'store-cart-badge--active' : ''}`}
                        >
                            {cartCount}
                        </span>
                    </Link>

                    <button
                        type="button"
                        className="store-hamburger-btn"
                        onClick={toggleMenu}
                        aria-expanded={isMenuOpen}
                        aria-label={isMenuOpen ? "Đóng menu điều hướng" : "Mở menu điều hướng"}
                    >
                        <span className="store-hamburger-icon">
                            {isMenuOpen ? "✕" : "☰"}
                        </span>
                    </button>
                </div>
            </div>

            <div className={`store-mobile-menu ${isMenuOpen ? 'store-mobile-menu--open' : ''}`}>
                <nav className="store-mobile-nav" aria-label="Menu di động">
                    <Link
                        to="/"
                        className={`store-mobile-nav-link ${location.pathname === '/' ? 'active' : ''}`}
                    >
                        Trang chủ
                    </Link>
                    <Link
                        to="/products"
                        className={`store-mobile-nav-link ${location.pathname.startsWith('/products') ? 'active' : ''}`}
                    >
                        Sản phẩm
                    </Link>
                    <Link
                        to="/blog"
                        className={`store-mobile-nav-link ${location.pathname.startsWith('/blog') ? 'active' : ''}`}
                    >
                        Blog tin tức
                    </Link>
                    <Link
                        to="/cart"
                        className={`store-mobile-nav-link ${location.pathname === '/cart' ? 'active' : ''}`}
                    >
                        Giỏ hàng ({cartCount})
                    </Link>
                    <Link
                        to="/login"
                        className={`store-mobile-nav-link ${location.pathname === '/login' ? 'active' : ''}`}
                    >
                        Đăng nhập
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
