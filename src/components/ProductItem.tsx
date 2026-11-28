import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleCompare, selectIsInCompare, selectCompareItems } from "../store/slice/CompareSlice";
import { useRequireAuth } from "../hooks/useRequireAuth";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import { addToCart } from "../store/slice/CartSlice";
import { selectIsInWishlist, toggleWishlist } from "../store/slice/WishlistSlice";
import type { AppDispatch } from "../store/Store";
import type { Product } from "../types/Product";

interface ProductItemProps {
    product: Product;
}

export default function ProductItem({ product }: ProductItemProps) {
    const dispatch = useDispatch<AppDispatch>();
    const appDispatch = useAppDispatch();
    const requireAuth = useRequireAuth();
    const isInCompare = useSelector(selectIsInCompare(product.id));
    const compareItems = useSelector(selectCompareItems);
    const isInWishlist = useAppSelector(selectIsInWishlist(product.id));

    const handleCompare = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isInCompare && compareItems.length >= 3) {
            alert("Chỉ được so sánh tối đa 3 sản phẩm. Vui lòng vào trang So sánh để xóa bớt sản phẩm.");
            return;
        }
        dispatch(toggleCompare(product));
    };

    const handleToggleWishlist = () => {
        appDispatch(toggleWishlist(product));
    };

    const handleAddToCart = () => {
        if (!requireAuth()) return;
        appDispatch(addToCart(product));
        alert("Đã thêm sản phẩm vào giỏ hàng!");
    };

    return (
        <div className="product-card">
            <button
                type="button"
                className={`product-wishlist-btn ${isInWishlist ? "product-wishlist-btn--active" : ""}`}
                onClick={handleToggleWishlist}
                title={isInWishlist ? "Bỏ khỏi yêu thích" : "Thêm vào yêu thích"}
                aria-label={isInWishlist ? "Bỏ khỏi yêu thích" : "Thêm vào yêu thích"}
                aria-pressed={isInWishlist}
            >
                {isInWishlist ? "❤️" : "🤍"}
            </button>

            <Link to={`/products/${product.id}`} className="product-image-link">
                <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                />
            </Link>

            <div className="product-card-body">
                <div className="product-card-top">
                    <span className="product-brand">{product.brand}</span>
                    <button
                        type="button"
                        className={`product-compare-btn ${isInCompare ? "product-compare-btn--active" : ""}`}
                        onClick={handleCompare}
                        title={isInCompare ? "Bỏ so sánh" : "Thêm vào so sánh (tối đa 3)"}
                        aria-label="So sánh sản phẩm"
                    >
                        ⚖️ {isInCompare ? "Đang so sánh" : "So sánh"}
                    </button>
                </div>

                <h3 className="product-name">
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                </h3>

                <p className="product-description">{product.description}</p>

                <div className="product-rating">
                    Đánh giá {product.rating}
                    <span> | Đã bán {product.sold}</span>
                </div>

                <div className="product-price">
                    {product.price.toLocaleString("vi-VN")} đ
                </div>

                <div className="product-old-price">
                    {product.originalPrice.toLocaleString("vi-VN")} đ
                </div>

                <div className="product-card-actions">
                    <Link to={`/products/${product.id}`} className="product-button">
                        Xem chi tiết
                    </Link>
                    <button
                        type="button"
                        className="product-button"
                        onClick={handleAddToCart}
                    >
                        Thêm vào giỏ
                    </button>
                </div>
            </div>
        </div>
    );
}
