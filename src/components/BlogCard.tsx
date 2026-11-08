import React from 'react';
import type {BlogPost} from '../types/BlogPost';
import { Link } from 'react-router-dom';

interface BlogCardProps {
    post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
    const slug = post.slug || post.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    return (
        <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
                <span style={{ fontSize: '12px', color: '#9ca3af' }}>{post.pubDate}</span>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '8px 0 12px 0', color: '#1f2937' }}>{post.title}</h2>
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.5' }}>{post.description}</p>
            </div>
            <div style={{ marginTop: '16px' }}>
                <Link to={`/blog/${slug}`} style={{ color: '#4f46e5', fontWeight: 500, textDecoration: 'none' }}>
                    Đọc tiếp &rarr;
                </Link>
            </div>
        </div>
    );
};