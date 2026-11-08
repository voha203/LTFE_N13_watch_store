import React, { useEffect, useState } from 'react';
import { fetchRssBlog } from '../services/rssService';
import { BlogPost } from '../types/BlogPost';
import { BlogCard } from '../components/BlogCard';

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchRssBlog()
            .then((data) => {
                setPosts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Lỗi tải danh sách blog:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>Tin tức & Blog WatchStore</h1>

            {loading ? (
                <p style={{ color: '#6b7280' }}>Đang tải danh sách bài viết...</p>
            ) : posts.length === 0 ? (
                <p style={{ color: '#6b7280' }}>Chưa có bài viết nào.</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                    {posts.map((post, index) => (
                        <BlogCard key={index} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
}