import { createAsyncThunk } from "@reduxjs/toolkit";
import apolloClient from "../../query/apolloClient";
import { GET_CURRENCIES } from "../../query/currencies";

const CategoryActions = {
  ADD_CURRENCIES_TO_STORE: "currensy/addCurrenciesToStore",
};

export const addCurrenciesToStore = createAsyncThunk(
  CategoryActions.ADD_CURRENCIES_TO_STORE,
  async (_, { rejectWithValue }) => {
    try {
      const respones = await apolloClient.query({
        query: GET_CURRENCIES,
      });

      return respones.data.currencies;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
