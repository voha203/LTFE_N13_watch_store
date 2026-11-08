import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/cart.css';

function formatPrice(value: number) {
    return Number(value).toLocaleString('vi-VN') + ' đ';
}

export default function CartPage() {
    const {
        items,
        totalQuantity,
        totalPrice,
        updateQuantity,
        removeFromCart,
        clearCart,
    } = useCart();

    if (items.length === 0) {
        return (
            <div className="cart-page cart-page--empty">
                <h1>Giỏ hàng</h1>
                <p>Giỏ hàng của bạn đang trống.</p>
                <Link to="/products" className="cart-page__button cart-page__button--primary">
                    Khám phá sản phẩm
                </Link>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="cart-page__head">
                <h1>Giỏ hàng</h1>
                <button type="button" className="cart-page__clear" onClick={clearCart}>
                    Xoá tất cả
                </button>
            </div>

            <div className="cart-page__layout">
                <div className="cart-page__items">
                    {items.map(({ product, quantity }) => (
                        <article className="cart-item" key={product.id}>
                            <Link to={`/products/${product.id}`} className="cart-item__media">
                                <img src={product.image} alt={product.name} />
                            </Link>

                            <div className="cart-item__body">
                                <span className="cart-item__brand">{product.brand}</span>
                                <Link to={`/products/${product.id}`} className="cart-item__name">
                                    {product.name}
                                </Link>
                                <span className="cart-item__price">{formatPrice(product.price)}</span>
                            </div>

                            <div className="cart-item__quantity">
                                <button
                                    type="button"
                                    onClick={() => updateQuantity(product.id, quantity - 1)}
                                    disabled={quantity <= 1}
                                    aria-label="Giảm số lượng"
                                >
                                    −
                                </button>
                                <span>{quantity}</span>
                                <button
                                    type="button"
                                    onClick={() => updateQuantity(product.id, quantity + 1)}
                                    disabled={quantity >= product.stock}
                                    aria-label="Tăng số lượng"
                                >
                                    +
                                </button>
                            </div>

                            <strong className="cart-item__subtotal">
                                {formatPrice(product.price * quantity)}
                            </strong>

                            <button
                                type="button"
                                className="cart-item__remove"
                                onClick={() => removeFromCart(product.id)}
                                aria-label={`Xoá ${product.name}`}
                            >
                                ×
                            </button>
                        </article>
                    ))}
                </div>

                <aside className="cart-page__summary">
                    <h2>Tóm tắt đơn hàng</h2>
                    <div className="cart-page__row">
                        <span>Số lượng</span>
                        <strong>{totalQuantity}</strong>
                    </div>
                    <div className="cart-page__row">
                        <span>Tạm tính</span>
                        <strong>{formatPrice(totalPrice)}</strong>
                    </div>
                    <div className="cart-page__row">
                        <span>Phí vận chuyển</span>
                        <strong>{totalPrice >= 1000000 ? 'Miễn phí' : formatPrice(30000)}</strong>
                    </div>
                    <div className="cart-page__row cart-page__row--total">
                        <span>Tổng cộng</span>
                        <strong>
                            {formatPrice(totalPrice + (totalPrice >= 1000000 ? 0 : 30000))}
                        </strong>
                    </div>
                    <Link to="/checkout" className="cart-page__button cart-page__button--primary">
                        Tiến hành thanh toán
                    </Link>
                    <Link to="/products" className="cart-page__button cart-page__button--ghost">
                        Tiếp tục mua sắm
                    </Link>
                </aside>
            </div>
        </div>
    );
}
