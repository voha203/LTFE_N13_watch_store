import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/account.css";

type TabType = "profile" | "orders" | "security";

export default function AccountPage() {
    const { user, logout, updateProfile } = useAuth();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState<TabType>("profile");
    const [name, setName] = useState(user?.name || "");
    const [phone, setPhone] = useState(user?.phone || "");
    const [address, setAddress] = useState(user?.address || "");
    const [successMsg, setSuccessMsg] = useState("");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMsg, setPasswordMsg] = useState("");

    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        updateProfile({ name, phone, address });
        setSuccessMsg("Cập nhật thông tin tài khoản thành công!");
        setTimeout(() => setSuccessMsg(""), 3000);
    };

    const handleChangePassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword.length < 6) {
            setPasswordMsg("Mật khẩu mới phải có tối thiểu 6 ký tự.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setPasswordMsg("Xác nhận mật khẩu mới không khớp.");
            return;
        }
        setPasswordMsg("Đổi mật khẩu thành công!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => setPasswordMsg(""), 3000);
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

    return (
        <div className="account-page">
            <div className="account-header">
                <h1>Tài khoản của tôi</h1>
                <p>Quản lý thông tin hồ sơ, lịch sử mua sắm và bảo mật tài khoản</p>
            </div>

            <div className="account-layout">
                <aside className="account-sidebar">
                    <div className="account-user-card">
                        <div className="account-avatar">{userInitial}</div>
                        <h2 className="account-name">{user?.name || "Người dùng"}</h2>
                        <span className="account-email">{user?.email}</span>
                        <span className="account-tier-badge">
                            {user?.membershipTier || "Thành viên Thân Thiết"}
                        </span>
                    </div>

                    <nav className="account-nav" aria-label="Menu tài khoản">
                        <button
                            type="button"
                            className={`account-nav-btn ${activeTab === "profile" ? "account-nav-btn--active" : ""}`}
                            onClick={() => setActiveTab("profile")}
                        >
                            👤 Thông tin cá nhân
                        </button>
                        <button
                            type="button"
                            className={`account-nav-btn ${activeTab === "orders" ? "account-nav-btn--active" : ""}`}
                            onClick={() => setActiveTab("orders")}
                        >
                            📦 Đơn hàng của tôi
                        </button>
                        <button
                            type="button"
                            className={`account-nav-btn ${activeTab === "security" ? "account-nav-btn--active" : ""}`}
                            onClick={() => setActiveTab("security")}
                        >
                            🔒 Đổi mật khẩu
                        </button>

                        <button
                            type="button"
                            className="account-logout-btn"
                            onClick={handleLogout}
                        >
                            🚪 Đăng xuất
                        </button>
                    </nav>
                </aside>

                <main className="account-content">
                    {activeTab === "profile" && (
                        <div>
                            <h2 className="account-section-title">Thông tin cá nhân</h2>
                            <p className="account-section-desc">Cập nhật thông tin chi tiết để giao nhận hàng chính xác</p>

                            {successMsg && <div className="account-success-msg">{successMsg}</div>}

                            <form className="account-form" onSubmit={handleSaveProfile}>
                                <div className="account-form-row">
                                    <div className="account-form-group">
                                        <label htmlFor="account-name">Họ và tên</label>
                                        <input
                                            id="account-name"
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="account-form-group">
                                        <label htmlFor="account-phone">Số điện thoại</label>
                                        <input
                                            id="account-phone"
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="account-form-group">
                                    <label htmlFor="account-email">Địa chỉ Email</label>
                                    <input
                                        id="account-email"
                                        type="email"
                                        value={user?.email || ""}
                                        disabled
                                    />
                                </div>

                                <div className="account-form-group">
                                    <label htmlFor="account-address">Địa chỉ nhận hàng mặc định</label>
                                    <input
                                        id="account-address"
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                                    />
                                </div>

                                <button type="submit" className="account-save-btn">
                                    Lưu thay đổi
                                </button>
                            </form>
                        </div>
                    )}

                    {activeTab === "orders" && (
                        <div>
                            <h2 className="account-section-title">Lịch sử đơn hàng</h2>
                            <p className="account-section-desc">Theo dõi tiến độ giao hàng và các đơn đã mua</p>

                            <table className="account-orders-table">
                                <thead>
                                    <tr>
                                        <th>Mã đơn</th>
                                        <th>Ngày đặt</th>
                                        <th>Sản phẩm</th>
                                        <th>Tổng tiền</th>
                                        <th>Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>#WS-2026-908</strong></td>
                                        <td>15/11/2026</td>
                                        <td>Casio G-Shock DW-5600E (x1)</td>
                                        <td>2.350.000 đ</td>
                                        <td>
                                            <span className="account-order-badge account-order-badge--delivered">
                                                Đã giao thành công
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><strong>#WS-2026-871</strong></td>
                                        <td>02/11/2026</td>
                                        <td>Seiko 5 Sports SRPD55K1 (x1)</td>
                                        <td>6.850.000 đ</td>
                                        <td>
                                            <span className="account-order-badge account-order-badge--delivered">
                                                Đã giao thành công
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === "security" && (
                        <div>
                            <h2 className="account-section-title">Bảo mật & Đổi mật khẩu</h2>
                            <p className="account-section-desc">Để bảo mật tài khoản, không chia sẻ mật khẩu cho người khác</p>

                            {passwordMsg && <div className="account-success-msg">{passwordMsg}</div>}

                            <form className="account-form" onSubmit={handleChangePassword}>
                                <div className="account-form-group">
                                    <label htmlFor="current-pwd">Mật khẩu hiện tại</label>
                                    <input
                                        id="current-pwd"
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="account-form-group">
                                    <label htmlFor="new-pwd">Mật khẩu mới (tối thiểu 6 ký tự)</label>
                                    <input
                                        id="new-pwd"
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="account-form-group">
                                    <label htmlFor="confirm-pwd">Xác nhận mật khẩu mới</label>
                                    <input
                                        id="confirm-pwd"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <button type="submit" className="account-save-btn">
                                    Cập nhật mật khẩu
                                </button>
                            </form>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
