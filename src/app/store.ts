import { configureStore } from "@reduxjs/toolkit";
import { transactionsReducer } from "../store/transactionSlice";
import { categoriesReducer } from "../store/categoriesSlice";

export const store = configureStore({
    reducer: {
        transaction: transactionsReducer,
        category: categoriesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;