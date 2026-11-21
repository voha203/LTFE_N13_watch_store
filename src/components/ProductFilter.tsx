export type FilterValues = {
    brand: string;
    price: string;
    sort: string;
};

type ProductFilterProps = {
    brands: string[];
    value: FilterValues;
    onChange: (value: FilterValues) => void;
};

export default function ProductFilter({ brands, value, onChange }: ProductFilterProps) {
    const update = (key: keyof FilterValues, nextValue: string) => {
        onChange({ ...value, [key]: nextValue });
    };

    return (
        <div className="product-filter">
            <label>
                <span>Hãng</span>
                <select
                    value={value.brand}
                    onChange={(event) => update("brand", event.target.value)}
                >
                    <option value="all">Tất cả hãng</option>
                    {brands.map((brand) => (
                        <option key={brand} value={brand}>
                            {brand}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                <span>Giá</span>
                <select
                    value={value.price}
                    onChange={(event) => update("price", event.target.value)}
                >
                    <option value="all">Mọi mức giá</option>
                    <option value="under5">Dưới 5 triệu</option>
                    <option value="5-10">5 - 10 triệu</option>
                    <option value="10-20">10 - 20 triệu</option>
                    <option value="over20">Trên 20 triệu</option>
                </select>
            </label>

            <label>
                <span>Sắp xếp</span>
                <select
                    value={value.sort}
                    onChange={(event) => update("sort", event.target.value)}
                >
                    <option value="default">Mặc định</option>
                    <option value="price-asc">Giá tăng dần</option>
                    <option value="price-desc">Giá giảm dần</option>
                    <option value="name-asc">Tên A - Z</option>
                    <option value="name-desc">Tên Z - A</option>
                </select>
            </label>
        </div>
    );
}
