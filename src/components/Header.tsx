import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
    cartCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ cartCount = 0 }) => {
    return (
        <header style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 50 }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4f46e5' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: '#4f46e5' }}>WatchStore</Link>
                </div>
                <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: '#4b5563', fontWeight: 500 }}>Trang chủ</Link>
                    <Link to="/products" style={{ textDecoration: 'none', color: '#4b5563', fontWeight: 500 }}>Sản phẩm</Link>
                    <Link to="/blog" style={{ textDecoration: 'none', color: '#4b5563', fontWeight: 500 }}>Blog</Link>
                    <Link to="/login" style={{ textDecoration: 'none', color: '#4b5563', fontWeight: 500 }}>Đăng nhập</Link>
                    <Link
                        to="/cart"
                        aria-label={`Giỏ hàng, ${cartCount} sản phẩm`}
                        style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', textDecoration: 'none', color: '#4b5563', fontWeight: 500 }}
                    >
                        Giỏ hàng
                        <span
                            aria-hidden="true"
                            style={{
                                minWidth: '20px',
                                height: '20px',
                                marginLeft: '6px',
                                padding: '0 6px',
                                borderRadius: '999px',
                                backgroundColor: cartCount > 0 ? '#17654e' : '#e5e7eb',
                                color: cartCount > 0 ? '#ffffff' : '#6b7280',
                                fontSize: '12px',
                                fontWeight: 700,
                                lineHeight: '20px',
                                textAlign: 'center',
                            }}
                        >
                            {cartCount}
                        </span>
                    </Link>
                </nav>
            </div>
        </header>
    );
};
