import { createSlice } from "@reduxjs/toolkit";
import { addCategoriesToStore } from "../actions/categoryActions";

const initialState = {
  entities: [],
  error: null,
  isLoading: true,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    receivedCategory(state, action) {
      state.categories = action.payload;
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCategoriesToStore.fulfilled, (state, action) => {
      state.isLoading = false;
      state.entities = action.payload;
    });

    builder.addCase(addCategoriesToStore.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

const { reducer: categoryReducer } = categorySlice;

export default categoryReducer;
