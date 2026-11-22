import type { BlogPost } from '../types/BlogPost';

function extractOrGenerateSlug(title: string, link: string): string {
    if (link) {
        try {
            const url = new URL(link);
            const pathname = url.pathname.replace(/\/+$/, '');
            const segment = pathname.split('/').pop();
            if (segment && segment !== 'blog') {
                return segment;
            }
        } catch {
            const clean = link.replace(/\/+$/, '');
            const segment = clean.split('/').pop();
            if (segment && segment !== 'blog') {
                return segment;
            }
        }
    }
    return title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[đĐ]/g, 'd')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

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
            const title = item.querySelector('title')?.textContent?.trim() || '';
            const link = item.querySelector('link')?.textContent?.trim() || '';
            const description = item.querySelector('description')?.textContent?.trim() || '';
            const pubDate = item.querySelector('pubDate')?.textContent?.trim() || '';

            const contentNode =
                item.querySelector('content\\:encoded') ||
                item.querySelector('encoded') ||
                item.querySelector('content') ||
                item.querySelector('description');

            const content = contentNode?.textContent?.trim() || '';
            const slug = extractOrGenerateSlug(title, link);

            posts.push({ title, link, description, pubDate, content, slug });
        });

        return posts;
    } catch {
        return [];
    }
};
