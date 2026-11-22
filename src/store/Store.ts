import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slice/ProductListSlice";
import cartReducer from './slice/CartSlice';
import authReducer from './slice/AuthSlice';
import compareReducer from './slice/CompareSlice';

export const store = configureStore({
    reducer: {
        products: productSlice,
        cart: cartReducer,
        auth: authReducer,
        compare: compareReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
