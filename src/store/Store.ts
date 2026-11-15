import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slice/ProductListSlice";
import cartReducer from './slice/CartSlice'

export const store = configureStore({
    reducer: {
        products: productSlice,
        cart: cartReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
