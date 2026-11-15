import type {BlogPost} from '../types/BlogPost';

export const fetchRssBlog = async (): Promise<BlogPost[]> => {
    try {
        const response = await fetch('/data/blog.xml');
        if (!response.ok) throw new Error('Không thể đọc file blog.xml');

        const strData = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(strData, 'application/xml');

        const items = xmlDoc.querySelectorAll('item');
        const posts: BlogPost[] = [];

        items.forEach((item) => {
            const title = item.querySelector('title')?.textContent || '';
            const link = item.querySelector('link')?.textContent || '';
            const description = item.querySelector('description')?.textContent || '';
            const pubDate = item.querySelector('pubDate')?.textContent || '';

            const contentNode =
                item.querySelector('content\\:encoded') ||
                item.querySelector('encoded') ||
                item.querySelector('content') ||
                item.querySelector('description');

            const content = contentNode?.textContent || '';
            const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

            posts.push({ title, link, description, pubDate, content, slug });
        });

        return posts;
    } catch (error) {
        console.error('Lỗi khi đọc file blog.xml:', error);
        return [];
    }
};