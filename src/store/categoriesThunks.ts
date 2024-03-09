import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import { Category } from "../types";

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async () => {
        const response = await axiosApi.get<Category[]>('/category.json');
        return response.data;
    }
);

export const addCategory = createAsyncThunk(
    'categories/addCategory',
    async (category: Category) => {
        const response = await axiosApi.post<Category>('/category.json', category);
        return response.data;
    }
);

export const deleteCategory = createAsyncThunk(
    'categories/deleteCategory',
    async (categoryId: string) => {
        await axiosApi.delete(`category/${categoryId}`);
        return categoryId;
    }
);