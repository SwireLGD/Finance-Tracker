import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiTransaction, ApiTransactions, Transaction } from "../types";
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
);

export const addTransaction = createAsyncThunk(
    'transactions/addTransaction',
    async (data: ApiTransaction) => { 
        const response = await axiosApi.post('/transactions.json', data); 
        const newTransaction = {
            id: response.data.name,
            ...data,
        };
        return newTransaction;
    }
);


export const updateTransaction = createAsyncThunk(
    'transactions/updateTransaction',
    async ({ id, ...data }: Transaction) => {
        const response = await axiosApi.put('/transactions/' + id + '.json', data);
        return response.data;
    }
);

export const deleteTransaction = createAsyncThunk<string, string>(
    'transactions/deleteTransaction',
    async (transactionId) => {
        await axiosApi.delete('/transactions/' + transactionId + '.json');
        return transactionId;
    },
);