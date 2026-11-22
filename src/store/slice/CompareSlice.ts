import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types/Product';
import type { RootState } from '../Store';

const STORAGE_KEY = 'watch-store-compare';

function loadInitialCompare(): Product[] {
    try {
        const raw = globalThis.localStorage?.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed.slice(0, 3) : [];
    } catch {
        return [];
    }
}

function persistCompare(items: Product[]) {
    try {
        globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
        return;
    }
}

interface CompareState {
    items: Product[];
    message: string | null;
}

const initialState: CompareState = {
    items: loadInitialCompare(),
    message: null,
};

const compareSlice = createSlice({
    name: 'compare',
    initialState,
    reducers: {
        addToCompare(state, action: PayloadAction<Product>) {
            const exists = state.items.some((item) => item.id === action.payload.id);
            if (exists) {
                state.message = 'Sản phẩm đã có trong danh sách so sánh.';
                return;
            }
            if (state.items.length >= 3) {
                state.message = 'Chỉ được so sánh tối đa 3 sản phẩm.';
                return;
            }
            state.items.push(action.payload);
            state.message = null;
            persistCompare(state.items);
        },
        removeFromCompare(state, action: PayloadAction<number>) {
            state.items = state.items.filter((item) => item.id !== action.payload);
            state.message = null;
            persistCompare(state.items);
        },
        toggleCompare(state, action: PayloadAction<Product>) {
            const index = state.items.findIndex((item) => item.id === action.payload.id);
            if (index >= 0) {
                state.items.splice(index, 1);
                state.message = null;
                persistCompare(state.items);
            } else {
                if (state.items.length >= 3) {
                    state.message = 'Chỉ được so sánh tối đa 3 sản phẩm.';
                    return;
                }
                state.items.push(action.payload);
                state.message = null;
                persistCompare(state.items);
            }
        },
        clearCompare(state) {
            state.items = [];
            state.message = null;
            persistCompare(state.items);
        },
        clearCompareMessage(state) {
            state.message = null;
        },
    },
});

export const {
    addToCompare,
    removeFromCompare,
    toggleCompare,
    clearCompare,
    clearCompareMessage,
} = compareSlice.actions;

export default compareSlice.reducer;

export const selectCompareItems = (state: RootState) => state.compare.items;
export const selectCompareCount = (state: RootState) => state.compare.items.length;
export const selectCompareMessage = (state: RootState) => state.compare.message;
export const selectIsInCompare = (id: number) => (state: RootState) =>
    state.compare.items.some((item) => item.id === id);
