import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import { ApiCategories, ApiCategory, Category } from "../types";

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async (_arg) => {
        const {data: categories} = await axiosApi.get<ApiCategories | null>('/category.json');

        let newCategories: Category[] = [];

        if (categories) {
            newCategories = Object.keys(categories).map(key => ({
                id: key,
                ...categories[key],
            }));
        }

        return newCategories;
    }
);

export const addCategory = createAsyncThunk(
    'categories/addCategory',
    async (category: ApiCategory) => {
        const response = await axiosApi.post<Category>('/category.json', category);
        return response.data;
    }
);

export const deleteCategory = createAsyncThunk(
    'categories/deleteCategory',
    async (categoryId: string) => {
        await axiosApi.delete('/category/' + categoryId + '.json');
        return categoryId;
    }
);

export const editCategory = createAsyncThunk(
    'categories/editCategory',
    async (category: Category) => {
        const response = await axiosApi.put('/categories/' + category.id + '.json', category);
        return response.data;
    }
)