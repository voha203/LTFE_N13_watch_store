import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
    removeFromCart,
    updateQuantity,
    clearCart,
    selectCartItems,
    selectCartCount,
    selectCartTotal,
} from '../store/slice/CartSlice'
import '../styles/cart.css'

const formatPrice = (value: number) => value.toLocaleString('vi-VN') + 'đ'

export default function CartPage() {
    const dispatch = useAppDispatch()
    const items = useAppSelector(selectCartItems)
    const count = useAppSelector(selectCartCount)
    const total = useAppSelector(selectCartTotal)

    if (items.length === 0) {
        return (
            <div className="cart-page cart-empty">
                <h1>Giỏ hàng</h1>
                <p>Giỏ hàng của bạn đang trống.</p>
                <Link to="/products" className="cart-btn cart-btn-primary">
                    Mua sắm ngay
                </Link>
            </div>
        )
    }

    return (
        <div className="cart-page">
            <h1>Giỏ hàng ({count} sản phẩm)</h1>

            <div className="cart-layout">
                <ul className="cart-list">
                    {items.map((item) => (
                        <li key={item.id} className="cart-item">
                            {item.image && (
                                <img src={item.image} alt={item.name} className="cart-item-img" />
                            )}

                            <div className="cart-item-info">
                                <h3>{item.name}</h3>
                                <p className="cart-item-brand">{item.brand}</p>
                                <p className="cart-item-price">{formatPrice(item.price)}</p>
                            </div>

                            <div className="cart-qty">
                                <button
                                    onClick={() =>
                                        dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
                                    }
                                    disabled={item.quantity <= 1}
                                    aria-label="Giảm số lượng"
                                >
                                    −
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                    onClick={() =>
                                        dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
                                    }
                                    aria-label="Tăng số lượng"
                                >
                                    +
                                </button>
                            </div>

                            <p className="cart-item-total">
                                {formatPrice(item.price * item.quantity)}
                            </p>

                            <button
                                className="cart-remove"
                                onClick={() => dispatch(removeFromCart(item.id))}
                            >
                                Xóa
                            </button>
                        </li>
                    ))}
                </ul>

                <aside className="cart-summary">
                    <h2>Tóm tắt đơn hàng</h2>
                    <div className="cart-summary-row">
                        <span>Tạm tính ({count} sản phẩm)</span>
                        <span>{formatPrice(total)}</span>
                    </div>
                    <div className="cart-summary-row cart-summary-total">
                        <span>Tổng cộng</span>
                        <span>{formatPrice(total)}</span>
                    </div>

                    <Link to="/checkout" className="cart-btn cart-btn-primary">
                        Thanh toán
                    </Link>
                    <Link to="/products" className="cart-btn cart-btn-outline">
                        Tiếp tục mua sắm
                    </Link>
                    <button
                        className="cart-btn cart-btn-danger"
                        onClick={() => dispatch(clearCart())}
                    >
                        Xóa giỏ hàng
                    </button>
                </aside>
            </div>
        </div>
    )
}