import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
    return (
        <header style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 50 }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4f46e5' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: '#4f46e5' }}>WatchStore</Link>
                </div>
                <nav style={{ display: 'flex', gap: '24px' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: '#4b5563', fontWeight: 500 }}>Trang chủ</Link>
                    <Link to="/products" style={{ textDecoration: 'none', color: '#4b5563', fontWeight: 500 }}>Sản phẩm</Link>
                    <Link to="/blog" style={{ textDecoration: 'none', color: '#4b5563', fontWeight: 500 }}>Blog</Link>
                    <Link to="/login" style={{ textDecoration: 'none', color: '#4b5563', fontWeight: 500 }}>Đăng nhập</Link>
                </nav>
            </div>
        </header>
    );
};