import { createAsyncThunk } from "@reduxjs/toolkit";
import apolloClient from "../../query/apolloClient";
import { GET_CATEGORY } from "../../query/category";

const CategoryActions = {
  ADD_CATEGORIES_TO_STORE: "category/addCategoriesToStore",
};

export const addCategoriesToStore = createAsyncThunk(
  CategoryActions.ADD_CATEGORIES_TO_STORE,
  async (_, { rejectWithValue }) => {
    try {
      const respones = await apolloClient.query({
        query: GET_CATEGORY,
      });

      return respones.data.categories;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
