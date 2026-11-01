import { Link, NavLink } from 'react-router';

export default function Header() {
  return (
    <header className="store-header">
      <div className="store-topbar">
        <div className="store-container store-topbar-inner">
          <p className="store-topbar-note">Miễn phí giao hàng toàn quốc cho đơn từ 2.000.000₫</p>
          <div className="store-topbar-links">
            <a href="tel:19001234">Hotline: 1900 1234</a>
            <span className="store-topbar-divider" aria-hidden="true"></span>
            <Link to="/login">Đăng nhập</Link>
          </div>
        </div>
      </div>

      <div className="store-container store-header-row">
        <Link className="store-brand" to="/" aria-label="Watch Store - Trang chủ">
          <span className="store-brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="12" cy="12" r="7.5" />
              <path d="M9 4.5 9.5 1h5l.5 3.5M9 19.5 9.5 23h5l.5-3.5" />
              <path d="M12 8v4l2.5 1.5" />
            </svg>
          </span>
          <span className="store-brand-text">
            WATCH <span>STORE</span>
            <small>ĐỒNG HỒ CHÍNH HÃNG</small>
          </span>
        </Link>

        <div className="store-header-search" role="search">
          <svg className="store-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m16 16 4.5 4.5" />
          </svg>
          <input
            type="search"
            placeholder="Tìm kiếm đồng hồ..."
            aria-label="Tìm kiếm đồng hồ"
            title="Tìm kiếm theo tên sản phẩm hoặc thương hiệu."
          />
        </div>

        <div className="store-header-links">
          <Link className="store-account-link" to="/login">
            <svg className="store-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <circle cx="12" cy="7" r="4" />
              <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
            </svg>
            <span>Tài khoản</span>
          </Link>
          <Link className="store-cart-link" to="/cart">
            <svg className="store-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M2 3h3l3 12h11l3-9H6M8 15l-1 3h13" />
              <circle cx="9" cy="21" r="1" />
              <circle cx="18" cy="21" r="1" />
            </svg>
            <span>Giỏ hàng</span>
          </Link>
        </div>
      </div>

      <div className="store-nav-bar">
        <div className="store-container store-nav-inner">
          <nav className="store-nav" aria-label="Điều hướng chính">
            <NavLink to="/" end>Trang chủ</NavLink>
            <NavLink to="/products">Đồng hồ</NavLink>
            <NavLink to="/blog">Tin tức</NavLink>
          </nav>
          <span className="store-nav-note">Bảo hành chính hãng 24 tháng</span>
        </div>
      </div>
    </header>
  );
}
