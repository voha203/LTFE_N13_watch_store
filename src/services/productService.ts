import type { Product } from "../types/Product";

export async function getProducts(
    url = `${import.meta.env?.BASE_URL ?? "/"}data/products.json`
): Promise<Product[]> {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Không tải được danh sách sản phẩm (HTTP " + response.status + ").");
    }

    return response.json();
}
