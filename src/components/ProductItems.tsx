import { Link } from "react-router";
import type { Product } from "../store/slice/ProductListSlice";

interface ProductItemsProps {
    product: Product;
}

export default function ProductItems({
                                         product
                                     }: ProductItemsProps) {

    return (
        <div className="product-card">

            <Link
                to={`/products/${product.id}`}
                className="product-image-link"
            >
                <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                />
            </Link>

            <div className="product-card-body">

                <span className="product-brand">
                    {product.brand}
                </span>

                <h3 className="product-name">
                    {product.name}
                </h3>

                <p className="product-description">
                    {product.description}
                </p>

                <div className="product-rating">
                    ⭐ {product.rating}
                    <span> | Đã bán {product.sold}</span>
                </div>

                <div className="product-price">
                    {product.price.toLocaleString("vi-VN")} đ
                </div>

                <div className="product-old-price">
                    {product.originalPrice.toLocaleString("vi-VN")} đ
                </div>

                <Link
                    to={`/products/${product.id}`}
                    className="product-button"
                >
                    Xem sản phẩm
                </Link>

            </div>

        </div>
    );
}