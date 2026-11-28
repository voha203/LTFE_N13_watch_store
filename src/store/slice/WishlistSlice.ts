import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types/Product';
import type { RootState } from '../Store';
import { loadFromStorage, saveToStorage } from '../../utils/storage';

const STORAGE_KEY = 'watch-store-wishlist';

function isProduct(value: unknown): value is Product {
    if (!value || typeof value !== 'object') {
        return false;
    }

    const item = value as Partial<Product>;

    return (
        typeof item.id === 'number' &&
        typeof item.name === 'string' &&
        typeof item.price === 'number'
    );
}

function loadInitialWishlist(): Product[] {
    const stored = loadFromStorage<unknown>(STORAGE_KEY, []);
    return Array.isArray(stored) ? stored.filter(isProduct) : [];
}

function persistWishlist(items: Product[]): void {
    saveToStorage(STORAGE_KEY, items);
}

interface WishlistState {
    items: Product[];
}

const initialState: WishlistState = {
    items: loadInitialWishlist(),
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist(state, action: PayloadAction<Product>) {
            const exists = state.items.some((item) => item.id === action.payload.id);
            if (exists) {
                return;
            }

            state.items.push(action.payload);
            persistWishlist(state.items);
        },
        removeFromWishlist(state, action: PayloadAction<number>) {
            const nextItems = state.items.filter((item) => item.id !== action.payload);
            if (nextItems.length === state.items.length) {
                return;
            }

            state.items = nextItems;
            persistWishlist(state.items);
        },
        toggleWishlist(state, action: PayloadAction<Product>) {
            const index = state.items.findIndex((item) => item.id === action.payload.id);

            if (index >= 0) {
                state.items.splice(index, 1);
            } else {
                state.items.push(action.payload);
            }

            persistWishlist(state.items);
        },
        clearWishlist(state) {
            if (state.items.length === 0) {
                return;
            }

            state.items = [];
            persistWishlist(state.items);
        },
    },
});

export const {
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;

export const selectWishlistItems = (state: RootState) => state.wishlist.items;
export const selectWishlistCount = (state: RootState) => state.wishlist.items.length;
export const selectIsInWishlist = (id: number) => (state: RootState) =>
    state.wishlist.items.some((item) => item.id === id);
