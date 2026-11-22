import {Link} from "react-router-dom";
import type {Product} from "../types/Product";
import {useRequireAuth} from "../hooks/useRequireAuth";
import { useAppDispatch } from "../store/hooks";
import { addToCart } from "../store/slice/CartSlice";
interface ProductItemProps {
    product: Product;
}

export default function ProductItem({product}: ProductItemProps) {
    // vo them
    const requireAuth = useRequireAuth();
    const dispatch = useAppDispatch();

    function handleAddToCart() {
        if (!requireAuth()) return;

        dispatch(addToCart(product));
        alert("Đã thêm sản phẩm vào giỏ hàng!");
    }

    // vo them
    return (
        <div className="product-card">
            <Link to={`/products/${product.id}`} className="product-image-link">
                <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                />
            </Link>

            <div className="product-card-body">
                <span className="product-brand">{product.brand}</span>

                <h3 className="product-name">{product.name}</h3>

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

                <Link to={`/products/${product.id}`} className="product-button">
                    Xem sản phẩm
                </Link>

                <button type="button" className="product-button" onClick={handleAddToCart}>
                    Thêm vào giỏ hàng
                </button>
            </div>
        </div>
    );
}
