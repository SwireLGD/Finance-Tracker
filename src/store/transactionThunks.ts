import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiTransactions, Transaction } from "../types";
import { AppDispatch } from "../app/store";
import axiosApi from "../axiosApi";

export const fetchTransactions = createAsyncThunk<Transaction[], void, {dispatch: AppDispatch}>(
    'transactions/fetchAll',
    async (_arg) => {
        const {data: transactions} = await axiosApi.get<ApiTransactions | null>('/transactions.json');

        let newTransactions: Transaction[] = [];

        if (transactions) {
            newTransactions = Object.keys(transactions).map(key => ({
              id: key,
              ...transactions[key],
            }));
        }
        return newTransactions;
    }
)