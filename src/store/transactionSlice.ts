import { createSlice } from "@reduxjs/toolkit";
import { Transaction } from "../types";
import { fetchTransactions } from "./transactionThunks";

interface TransactionsState {
    items: Transaction[];
    fetchLoading: boolean;
    deleteLoading: false | string;
}

const initialState: TransactionsState = {
    items: [],
    fetchLoading: false,
    deleteLoading: false,
};

export const transactionsSlice = createSlice ({
    name: 'transactions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.fetchLoading = true;
            }).addCase(fetchTransactions.fulfilled, (state, {payload: transactions}) => {
                state.fetchLoading = false;
                state.items = transactions;
            }).addCase(fetchTransactions.rejected, (state) => {
                state.fetchLoading = false;
            });
    }
});

export const transactionsReducer = transactionsSlice.reducer;