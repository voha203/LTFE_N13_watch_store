type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) {
        return null;
    }

    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <nav className="pagination" aria-label="Phân trang sản phẩm">
            <button
                type="button"
                className="pagination__button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Trang trước"
            >
                ‹
            </button>
            {pages.map((page) => (
                <button
                    key={page}
                    type="button"
                    className={`pagination__page${
                        page === currentPage ? " pagination__page--active" : ""
                    }`}
                    onClick={() => onPageChange(page)}
                    aria-current={page === currentPage ? "page" : undefined}
                >
                    {page}
                </button>
            ))}
            <button
                type="button"
                className="pagination__button"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Trang sau"
            >
                ›
            </button>
        </nav>
    );
}
