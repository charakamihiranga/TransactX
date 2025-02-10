import {configureStore} from "@reduxjs/toolkit";
import customerSlice from "@/redux/slice/CustomerSlice";

export const store = configureStore({
    reducer: {
        customer: customerSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export type RootState = ReturnType<typeof store.getState>;