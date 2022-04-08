import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/CartSlice";
import categoryReducer from "./reducers/CategorySlice";
import currensyReducer from "./reducers/CurrensySlice";

const rootReducer = combineReducers({
  category: categoryReducer,
  currensy: currensyReducer,
  cart: cartReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
