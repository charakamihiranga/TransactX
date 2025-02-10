import {configureStore} from "@reduxjs/toolkit";
import customerSlice from "@/redux/slice/CustomerSlice";
import itemSlice from "@/redux/slice/ItemSlice";

export const store = configureStore({
    reducer: {
        customer: customerSlice,
        item: itemSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export type RootState = ReturnType<typeof store.getState>;