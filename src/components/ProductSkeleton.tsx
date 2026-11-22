export default function ProductSkeleton({ count = 8 }: { count?: number }) {
    return (
        <div className="product-skeleton-grid">
            {Array.from({ length: count }, (_, index) => (
                <div key={index} className="product-skeleton-card">
                    <div className="product-skeleton-media" />
                    <div className="product-skeleton-line" />
                    <div className="product-skeleton-line product-skeleton-line--short" />
                </div>
            ))}
        </div>
    );
}
