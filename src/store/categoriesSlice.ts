import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../types";
import { addCategory, deleteCategory, fetchCategories } from "./categoriesThunks";

interface categoryState {
    items: Category[];
    fetchLoading: boolean;
    deleteLoading: false | string;
}

const initialState: categoryState = {
    items: [],
    fetchLoading: false,
    deleteLoading: false,
}

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.fetchLoading = true;
            }).addCase(fetchCategories.fulfilled, (state, {payload: categories}) => {
                state.fetchLoading = false;
                state.items = categories;
            }).addCase(fetchCategories.rejected, (state) => {
                state.fetchLoading = false;
            }).addCase(addCategory.fulfilled, (state, action) => {
                state.items.push(action.payload);
            }).addCase(deleteCategory.fulfilled, (state, action) => {
                state.items = state.items.filter(category => category.id !== action.payload);
            });
    },
});

export const categoriesReducer = categorySlice.reducer;