export interface BlogPost {
    title: string;
    link: string;
    description: string;
    pubDate: string;
}

export const fetchRssBlog = async (): Promise<BlogPost[]> => {
    try {
        const response = await fetch('/data/blog.xml');
        const strData = await response.text();

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(strData, 'application/xml');

        const items = xmlDoc.querySelectorAll('item');
        const posts: BlogPost[] = [];

        items.forEach((item) => {
            posts.push({
                title: item.querySelector('title')?.textContent || '',
                link: item.querySelector('link')?.textContent || '',
                description: item.querySelector('description')?.textContent || '',
                pubDate: item.querySelector('pubDate')?.textContent || '',
            });
        });

        return posts;
    } catch (error) {
        console.error('Lỗi khi đọc file RSS/XML blog:', error);
        return [];
    }
};