import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import type { ReactNode } from "react";
import type { Product } from "../types/Product";

export interface CartItem {
    product: Product;
    quantity: number;
}

interface CartContextValue {
    items: CartItem[];
    totalQuantity: number;
    totalPrice: number;
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
}

const STORAGE_KEY = "watch-store-cart";

const CartContext = createContext<CartContextValue | undefined>(undefined);

function isValidItem(value: unknown): value is CartItem {
    if (!value || typeof value !== "object") {
        return false;
    }

    const item = value as Partial<CartItem>;

    return (
        Boolean(item.product) &&
        typeof item.product?.id === "number" &&
        typeof item.quantity === "number" &&
        item.quantity > 0
    );
}

function readInitialCart(): CartItem[] {
    try {
        const raw = globalThis.localStorage?.getItem(STORAGE_KEY);

        if (!raw) {
            return [];
        }

        const parsed: unknown = JSON.parse(raw);

        return Array.isArray(parsed) ? parsed.filter(isValidItem) : [];
    } catch {
        return [];
    }
}

function clampQuantity(quantity: number, stock: number): number {
    const max = stock > 0 ? stock : 1;
    return Math.min(Math.max(Math.trunc(quantity) || 1, 1), max);
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>(readInitialCart);

    useEffect(() => {
        try {
            globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch {
            return;
        }
    }, [items]);

    const addToCart = useCallback((product: Product, quantity = 1) => {
        setItems((current) => {
            const safeQuantity = clampQuantity(quantity, product.stock);
            const existing = current.find((item) => item.product.id === product.id);

            if (!existing) {
                return [...current, { product, quantity: safeQuantity }];
            }

            return current.map((item) =>
                item.product.id === product.id
                    ? {
                          ...item,
                          quantity: clampQuantity(
                              item.quantity + safeQuantity,
                              product.stock
                          ),
                      }
                    : item
            );
        });
    }, []);

    const removeFromCart = useCallback((productId: number) => {
        setItems((current) =>
            current.filter((item) => item.product.id !== productId)
        );
    }, []);

    const updateQuantity = useCallback((productId: number, quantity: number) => {
        setItems((current) =>
            current.map((item) =>
                item.product.id === productId
                    ? {
                          ...item,
                          quantity: clampQuantity(quantity, item.product.stock),
                      }
                    : item
            )
        );
    }, []);

    const clearCart = useCallback(() => setItems([]), []);

    const value = useMemo<CartContextValue>(() => {
        const totalQuantity = items.reduce(
            (total, item) => total + item.quantity,
            0
        );
        const totalPrice = items.reduce(
            (total, item) => total + item.product.price * item.quantity,
            0
        );

        return {
            items,
            totalQuantity,
            totalPrice,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
        };
    }, [items, addToCart, removeFromCart, updateQuantity, clearCart]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart phải được dùng bên trong CartProvider.");
    }

    return context;
}
