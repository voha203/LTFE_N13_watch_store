import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slice/ProductListSlice";
import cartReducer from './slice/CartSlice'
import authReducer from './slice/AuthSlice'


export const store = configureStore({
    reducer: {
        products: productSlice,
        cart: cartReducer,
        auth: authReducer,

    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
