import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Product } from '../../types/Product'
import type { CartItem } from '../../types/CartItem'
import type { RootState } from '../Store'
import { loadFromStorage } from '../../utils/storage'

interface CartState {
    items: CartItem[]
}

const initialState: CartState = {
    items: loadFromStorage<CartItem[]>('cart', []),
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<Product>) {
            const existing = state.items.find((i) => i.id === action.payload.id)
            if (existing) {
                existing.quantity += 1
            } else {
                state.items.push({ ...action.payload, quantity: 1 })
            }
        },
        removeFromCart(state, action: PayloadAction<number>) {
            state.items = state.items.filter((i) => i.id !== action.payload)
        },
        updateQuantity(
            state,
            action: PayloadAction<{ id: number; quantity: number }>
        ) {
            const item = state.items.find((i) => i.id === action.payload.id)
            if (!item) return
            if (action.payload.quantity <= 0) {
                state.items = state.items.filter((i) => i.id !== action.payload.id)
            } else {
                item.quantity = action.payload.quantity
            }
        },
        clearCart(state) {
            state.items = []
        },
    },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
    cartSlice.actions
export default cartSlice.reducer
export const selectCartItems = (state: RootState) => state.cart.items

export const selectCartCount = (state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)

export const selectCartTotal = (state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)