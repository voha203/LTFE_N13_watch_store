import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer style={{ backgroundColor: '#111827', color: '#ffffff', padding: '40px 0', marginTop: 'auto' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>WatchStore</h3>
                    <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.5' }}>Cửa hàng đồng hồ chính hãng uy tín hàng đầu, mang lại phong cách đẳng cấp cho bạn.</p>
                </div>
                <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>Liên hệ</h3>
                    <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '8px' }}>Địa chỉ: Khu phố 6, P. Linh Trung, TP. Thủ Đức, TP.HCM</p>
                    <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '8px' }}>Hotline: 0988 123 456</p>
                    <p style={{ fontSize: '14px', color: '#9ca3af' }}>Email: support@watchstore.com</p>
                </div>
            </div>
            <div style={{ maxWidth: '1200px', margin: '32px auto 0', padding: '16px 24px 0', borderTop: '1px solid #374151', textAlign: 'center', fontSize: '12px', color: '#9ca3af' }}>
                &copy; 2026 WatchStore. All rights reserved.
            </div>
        </footer>
    );
};