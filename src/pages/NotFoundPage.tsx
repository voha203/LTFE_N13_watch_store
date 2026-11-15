import { Link } from "react-router-dom";
import "../styles/not-found.css";

export default function NotFoundPage() {
    return (
        <div className="not-found-page">
            <div className="not-found-card">
                <div className="not-found-icon-wrap" aria-hidden="true">
                    ⏱️
                </div>
                <h1 className="not-found-code">404</h1>
                <h2 className="not-found-title">Không tìm thấy trang yêu cầu</h2>
                <p className="not-found-desc">
                    Thời gian vẫn không ngừng trôi, nhưng trang bạn tìm kiếm dường như không tồn tại, đã bị gỡ bỏ hoặc đường dẫn đã thay đổi.
                </p>

                <div className="not-found-actions">
                    <Link to="/" className="not-found-btn not-found-btn--primary">
                        &larr; Về trang chủ
                    </Link>
                    <Link to="/products" className="not-found-btn not-found-btn--secondary">
                        Xem sản phẩm
                    </Link>
                    <Link to="/blog" className="not-found-btn not-found-btn--outline">
                        Đọc tin tức blog
                    </Link>
                </div>

                <div className="not-found-quicklinks">
                    <p>Liên kết nhanh hữu ích</p>
                    <div className="not-found-links-list">
                        <Link to="/">Trang chủ</Link>
                        <Link to="/products">Cửa hàng đồng hồ</Link>
                        <Link to="/cart">Giỏ hàng</Link>
                        <Link to="/login">Tài khoản</Link>
                    </div>
                </div>

                <div className="not-found-support">
                    Cần hỗ trợ? Gọi hotline: <strong>0988 123 456</strong> hoặc email: <strong>support@watchstore.com</strong>
                </div>
            </div>
        </div>
    );
}
