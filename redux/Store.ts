import {configureStore} from "@reduxjs/toolkit";
import customerSlice from "@/redux/slice/CustomerSlice";
import itemSlice from "@/redux/slice/ItemSlice";
import placeOrderSlice from "@/redux/slice/PlaceOrderSlice";
import cartSlice from "@/redux/slice/CartSlice";
export const store = configureStore({
    reducer: {
        customer: customerSlice,
        item: itemSlice,
        order: placeOrderSlice,
        cart: cartSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export type RootState = ReturnType<typeof store.getState>;