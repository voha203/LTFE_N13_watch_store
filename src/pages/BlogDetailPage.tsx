import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchRssBlog } from '../services/rssService';
import { BlogPost } from '../types/BlogPost';

export default function BlogDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchRssBlog()
            .then((posts) => {
                const found = posts.find((p) => {
                    const pSlug = p.slug || p.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                    return pSlug === slug;
                });
                setPost(found || null);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Lỗi tải chi tiết bài viết:", err);
                setLoading(false);
            });
    }, [slug]);

    if (loading) {
        return (
            <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 24px' }}>
                <p style={{ color: '#6b7280' }}>Đang tải nội dung bài viết...</p>
            </div>
        );
    }

    if (!post) {
        return (
            <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 24px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Không tìm thấy bài viết</h2>
                <Link to="/blog" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: 600, fontSize: '16px' }}>
                    &larr; Quay lại danh sách blog
                </Link>
            </div>
        );
    }

    const fullContent = post.content && post.content.trim() !== "Nội dung chi tiết đang được cập nhật..."
        ? post.content
        : `
            <p><strong>${post.title}</strong> là một trong những chủ đề được cộng đồng yêu thích đồng hồ quan tâm hàng đầu tại WatchStore trong thời gian gần đây.</p><br>
            <p><em>Tóm tắt:</em> ${post.description}</p><br>
            <h3>1. Tổng quan về xu hướng và chất lượng</h3>
            <p>Các sản phẩm đồng hồ chính hãng hiện nay không chỉ đáp ứng tiêu chuẩn về độ chính xác thời gian mà còn mang lại giá trị thẩm mỹ vượt thời gian, khẳng định phong cách đẳng cấp cho người sử dụng.</p><br>
            <h3>2. Lời khuyên từ chuyên gia WatchStore</h3>
            <p>Để lựa chọn và sử dụng sản phẩm bền bỉ nhất, quý khách hàng nên chú ý bảo quản định kỳ, tránh va đập mạnh với từ trường và tuân thủ đúng hướng dẫn sử dụng từ nhà sản xuất.</p><br>
            <p>Hãy ghé thăm các cơ sở của WatchStore để được tư vấn chi tiết và trải nghiệm trực tiếp những mẫu đồng hồ chính hãng tuyệt vời nhất!</p>
        `;

    return (
        <article style={{ maxWidth: '800px', margin: '40px auto', padding: '0 24px' }}>
            {}
            <div style={{ marginBottom: '24px' }}>
                <Link
                    to="/blog"
                    style={{
                        color: '#4f46e5',
                        textDecoration: 'none',
                        fontSize: '16px',
                        fontWeight: 600,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}
                >
                    &larr; Quay lại danh sách blog
                </Link>
            </div>

            <span style={{ fontSize: '14px', color: '#9ca3af' }}>{post.pubDate}</span>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', margin: '12px 0 20px 0', color: '#1f2937', lineHeight: '1.2' }}>
                {post.title}
            </h1>
            <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }}>
                <p style={{ fontSize: '16px', color: '#4b5563', lineHeight: '1.8', marginBottom: '16px', fontWeight: 500 }}>
                    {post.description}
                </p>
                <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '24px 0' }} />

                {}
                <div
                    style={{ fontSize: '16px', color: '#374151', lineHeight: '1.8' }}
                    dangerouslySetInnerHTML={{ __html: fullContent }}
                />
            </div>
        </article>
    );
}