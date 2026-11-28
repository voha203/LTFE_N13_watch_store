import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addToCart } from '../store/slice/CartSlice';
import {
    clearWishlist,
    removeFromWishlist,
    selectWishlistCount,
    selectWishlistItems,
} from '../store/slice/WishlistSlice';
import { useRequireAuth } from '../hooks/useRequireAuth';
import type { Product } from '../types/Product';
import '../styles/wishlist.css';

const formatPrice = (value: number) => value.toLocaleString('vi-VN') + 'đ';

export default function WishlistPage() {
    const dispatch = useAppDispatch();
    const items = useAppSelector(selectWishlistItems);
    const count = useAppSelector(selectWishlistCount);
    const requireAuth = useRequireAuth();

    const handleAddToCart = (product: Product) => {
        if (!requireAuth()) return;

        dispatch(addToCart(product));
        alert('Đã thêm sản phẩm vào giỏ hàng!');
    };

    if (items.length === 0) {
        return (
            <div className="wishlist-page wishlist-empty">
                <div className="wishlist-empty-icon" aria-hidden="true">❤️</div>
                <h1>Chưa có sản phẩm yêu thích</h1>
                <p>
                    Nhấn vào biểu tượng trái tim trên sản phẩm bạn thích để lưu lại ở đây.
                </p>
                <Link to="/products" className="wishlist-btn wishlist-btn--primary">
                    Khám phá sản phẩm
                </Link>
            </div>
        );
    }

    return (
        <div className="wishlist-page">
            <div className="wishlist-header">
                <div>
                    <h1>Sản phẩm yêu thích ({count})</h1>
                    <p>Những mẫu đồng hồ bạn đã lưu lại để xem lại sau.</p>
                </div>
                <div className="wishlist-header-actions">
                    <Link to="/products" className="wishlist-btn wishlist-btn--outline">
                        Tiếp tục mua sắm
                    </Link>
                    <button
                        type="button"
                        className="wishlist-btn wishlist-btn--danger"
                        onClick={() => dispatch(clearWishlist())}
                    >
                        Xóa tất cả
                    </button>
                </div>
            </div>

            <ul className="wishlist-list">
                {items.map((product) => (
                    <li key={product.id} className="wishlist-item">
                        <Link to={`/products/${product.id}`} className="wishlist-item-image">
                            <img src={product.image} alt={product.name} />
                        </Link>

                        <div className="wishlist-item-info">
                            <p className="wishlist-item-brand">{product.brand}</p>
                            <h2>
                                <Link to={`/products/${product.id}`}>{product.name}</Link>
                            </h2>
                            <p className="wishlist-item-price">{formatPrice(product.price)}</p>
                        </div>

                        <div className="wishlist-item-actions">
                            <button
                                type="button"
                                className="wishlist-btn wishlist-btn--primary"
                                onClick={() => handleAddToCart(product)}
                            >
                                Thêm vào giỏ
                            </button>
                            <button
                                type="button"
                                className="wishlist-btn wishlist-btn--ghost"
                                onClick={() => dispatch(removeFromWishlist(product.id))}
                            >
                                Xóa
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
