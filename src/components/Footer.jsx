import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer className="store-footer">
      <div className="store-container store-footer-columns">
        <div className="store-footer-about">
          <h2 className="store-footer-brand">WATCH <span>STORE</span></h2>
          <p>Đồng hồ chính hãng từ những thương hiệu uy tín, giúp bạn hoàn thiện phong cách mỗi ngày.</p>
          <ul className="store-footer-badges">
            <li>Bảo hành 24 tháng</li>
            <li>Đổi trả 7 ngày</li>
            <li>Giao hàng toàn quốc</li>
          </ul>
        </div>

        <div>
          <h2>Khám phá</h2>
          <Link to="/">Trang chủ</Link>
          <Link to="/products">Tất cả sản phẩm</Link>
          <Link to="/blog">Tin tức &amp; xu hướng</Link>
        </div>

        <div>
          <h2>Hỗ trợ</h2>
          <Link to="/login">Tài khoản</Link>
          <Link to="/cart">Giỏ hàng</Link>
          <a href="tel:19001234">Hotline: 1900 1234</a>
        </div>

        <div>
          <h2>Liên hệ</h2>
          <p>123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</p>
          <p>
            <a href="mailto:hello@watchstore.vn">hello@watchstore.vn</a>
          </p>
          <p>Giờ mở cửa: 8:00 - 21:00 hằng ngày</p>
        </div>
      </div>

      <div className="store-footer-bottom">
        <div className="store-container store-footer-bottom-inner">
          <p>© {new Date().getFullYear()} Watch Store. Bảo lưu mọi quyền.</p>
          <p>Đồng hồ chính hãng · Bảo hành 24 tháng</p>
        </div>
      </div>
    </footer>
  );
}
