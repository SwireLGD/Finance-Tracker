import { createSlice } from "@reduxjs/toolkit";
import { Transaction } from "../types";
import { addTransaction, deleteTransaction, fetchTransactions, updateTransaction } from "./transactionThunks";

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
            }).addCase(addTransaction.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
            }).addCase(updateTransaction.fulfilled, (state, action) => {
                const index = state.items.findIndex(t => t.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            }).addCase(deleteTransaction.fulfilled, (state, action) => {
                state.items = state.items.filter(transaction => transaction.id !== action.payload);
            });
    }
});

export const transactionsReducer = transactionsSlice.reducer;