import { createSlice } from "@reduxjs/toolkit";
import { addCurrenciesToStore } from "../actions/currensyAction";

const initialState = {
  entities: [],
  symbol: "$",
  error: null,
  isLoading: true,
};

const currensySlice = createSlice({
  name: "currensy",
  initialState,
  reducers: {
    currensyChanged(state, action) {
      state.symbol = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCurrenciesToStore.fulfilled, (state, action) => {
      state.isLoading = false;
      state.entities = action.payload;
    });

    builder.addCase(addCurrenciesToStore.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

const { reducer: currensyReducer, actions } = currensySlice;

export const { currensyChanged } = actions;

export default currensyReducer;
