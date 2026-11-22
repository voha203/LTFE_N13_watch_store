import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    selectCompareItems,
    selectCompareMessage,
    removeFromCompare,
    clearCompare,
    clearCompareMessage,
} from "../store/slice/CompareSlice";
import { useAppDispatch } from "../store/hooks";
import { addToCart } from "../store/slice/CartSlice";
import type { AppDispatch } from "../store/Store";
import type { Product } from "../types/Product";
import "../styles/compare.css";

export default function ComparePage() {
    const dispatch = useDispatch<AppDispatch>();
    const appDispatch = useAppDispatch();
    const compareItems = useSelector(selectCompareItems);
    const message = useSelector(selectCompareMessage);

    const handleAddToCart = (product: Product) => {
        appDispatch(addToCart(product));
        alert("Đã thêm sản phẩm vào giỏ hàng!");
    };

    if (compareItems.length === 0) {
        return (
            <div className="compare-page">
                <div className="compare-empty-state">
                    <div className="compare-empty-icon" aria-hidden="true">
                        ⚖️
                    </div>
                    <h2>Chưa có sản phẩm nào để so sánh</h2>
                    <p>
                        Hãy chọn tối đa 3 mẫu đồng hồ từ danh sách sản phẩm để so sánh thông số kỹ thuật, thiết kế và giá cả chi tiết.
                    </p>
                    <Link to="/products" className="compare-explore-btn">
                        Khám phá sản phẩm ngay &rarr;
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="compare-page">
            <div className="compare-header">
                <div className="compare-title-wrap">
                    <h1>So sánh sản phẩm ({compareItems.length}/3)</h1>
                    <p>So sánh chi tiết thông số kỹ thuật và giá trị của các mẫu đồng hồ đã chọn</p>
                </div>
                <div className="compare-header-actions">
                    {compareItems.length < 3 && (
                        <Link to="/products" className="compare-add-more-link">
                            + Thêm sản phẩm
                        </Link>
                    )}
                    <button
                        type="button"
                        className="compare-clear-btn"
                        onClick={() => dispatch(clearCompare())}
                    >
                        Xóa tất cả
                    </button>
                </div>
            </div>

            {message && (
                <div className="compare-alert" role="alert">
                    <span>{message}</span>
                    <button
                        type="button"
                        className="compare-alert-close"
                        onClick={() => dispatch(clearCompareMessage())}
                        aria-label="Đóng thông báo"
                    >
                        ✕
                    </button>
                </div>
            )}

            <div className="compare-table-container">
                <table className="compare-table">
                    <tbody>
                        <tr>
                            <th className="compare-spec-name">Sản phẩm</th>
                            {compareItems.map((product) => (
                                <td key={product.id} className="compare-product-col">
                                    <div className="compare-card-head">
                                        <button
                                            type="button"
                                            className="compare-remove-btn"
                                            onClick={() => dispatch(removeFromCompare(product.id))}
                                            title="Xóa khỏi danh sách so sánh"
                                            aria-label={`Xóa ${product.name} khỏi so sánh`}
                                        >
                                            ✕
                                        </button>
                                        <div className="compare-img-wrap">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="compare-img"
                                            />
                                        </div>
                                        <h3 className="compare-item-name">
                                            <Link to={`/products/${product.id}`}>{product.name}</Link>
                                        </h3>
                                        <div className="compare-item-price">
                                            {product.price.toLocaleString("vi-VN")} đ
                                        </div>
                                        {product.originalPrice > product.price && (
                                            <div className="compare-item-old-price">
                                                {product.originalPrice.toLocaleString("vi-VN")} đ
                                            </div>
                                        )}
                                        <button
                                            type="button"
                                            className="compare-cart-btn"
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            Thêm vào giỏ
                                        </button>
                                    </div>
                                </td>
                            ))}
                            {compareItems.length < 3 && (
                                <td className="compare-product-col">
                                    <Link to="/products" className="compare-empty-slot">
                                        <div className="compare-empty-slot-icon">+</div>
                                        <span>Thêm sản phẩm</span>
                                    </Link>
                                </td>
                            )}
                        </tr>

                        <tr>
                            <th className="compare-spec-name">Thương hiệu</th>
                            {compareItems.map((product) => (
                                <td key={product.id}>
                                    <span className="compare-tag compare-tag--brand">{product.brand}</span>
                                </td>
                            ))}
                            {compareItems.length < 3 && <td>-</td>}
                        </tr>

                        <tr>
                            <th className="compare-spec-name">Danh mục</th>
                            {compareItems.map((product) => (
                                <td key={product.id}>{product.category}</td>
                            ))}
                            {compareItems.length < 3 && <td>-</td>}
                        </tr>

                        <tr>
                            <th className="compare-spec-name">Giới tính</th>
                            {compareItems.map((product) => (
                                <td key={product.id}>{product.gender}</td>
                            ))}
                            {compareItems.length < 3 && <td>-</td>}
                        </tr>

                        <tr>
                            <th className="compare-spec-name">Bộ máy (Movement)</th>
                            {compareItems.map((product) => (
                                <td key={product.id}>{product.movement || "Quartz"}</td>
                            ))}
                            {compareItems.length < 3 && <td>-</td>}
                        </tr>

                        <tr>
                            <th className="compare-spec-name">Chất liệu vỏ</th>
                            {compareItems.map((product) => (
                                <td key={product.id}>{product.caseMaterial || "Thép không gỉ"}</td>
                            ))}
                            {compareItems.length < 3 && <td>-</td>}
                        </tr>

                        <tr>
                            <th className="compare-spec-name">Chống nước</th>
                            {compareItems.map((product) => (
                                <td key={product.id}>{product.waterResistance || "50 m"}</td>
                            ))}
                            {compareItems.length < 3 && <td>-</td>}
                        </tr>

                        <tr>
                            <th className="compare-spec-name">Chất liệu dây</th>
                            {compareItems.map((product) => (
                                <td key={product.id}>{product.strap || "Thép không gỉ"}</td>
                            ))}
                            {compareItems.length < 3 && <td>-</td>}
                        </tr>

                        <tr>
                            <th className="compare-spec-name">Màu sắc</th>
                            {compareItems.map((product) => (
                                <td key={product.id}>
                                    {Array.isArray(product.colors) ? product.colors.join(", ") : "Tiêu chuẩn"}
                                </td>
                            ))}
                            {compareItems.length < 3 && <td>-</td>}
                        </tr>

                        <tr>
                            <th className="compare-spec-name">Tình trạng kho</th>
                            {compareItems.map((product) => (
                                <td key={product.id}>
                                    <span className="compare-tag compare-tag--stock">
                                        Còn {product.stock} sản phẩm
                                    </span>
                                </td>
                            ))}
                            {compareItems.length < 3 && <td>-</td>}
                        </tr>

                        <tr>
                            <th className="compare-spec-name">Đánh giá</th>
                            {compareItems.map((product) => (
                                <td key={product.id}>
                                    ⭐ {product.rating} / 5 ({product.sold} đã bán)
                                </td>
                            ))}
                            {compareItems.length < 3 && <td>-</td>}
                        </tr>

                        <tr>
                            <th className="compare-spec-name">Mô tả</th>
                            {compareItems.map((product) => (
                                <td key={product.id} style={{ fontSize: "13px", color: "#6b7280" }}>
                                    {product.description}
                                </td>
                            ))}
                            {compareItems.length < 3 && <td>-</td>}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
