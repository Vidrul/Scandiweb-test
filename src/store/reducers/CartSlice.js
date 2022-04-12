import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  entities: [],
  totalAmount: 0,
  totalPrice: {
    USD: 0,
    GBP: 0,
    AUD: 0,
    JPY: 0,
    RUB: 0,
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const cartItem = state.entities.find(
        (item) => item.id === action.payload.id
      );

      if (cartItem) {
        cartItem.amount++;
      } else {
        state.entities.push(action.payload);
      }
    },

    decreaseStuffQuantity: (state, action) => {
      const cartItem = state.entities.find(
        (item) => item.id === action.payload.id
      );
      cartItem && cartItem.amount--;
    },

    removeItem(state, action) {
      state.entities = state.entities.filter(
        (item) => item.id !== action.payload.id
      );
    },

    getTotal(state) {
      const { cost, quantity } = state.entities.reduce(
        (total, item) => {
          const prices = item.price.map((p) => p.amount * item.amount);
          console.log(prices);

          total.cost.USD += prices[0];
          total.cost.GBP += prices[1];
          total.cost.AUD += prices[2];
          total.cost.JPY += prices[3];
          total.cost.RUB += prices[4];
          total.quantity += item.amount;

          return total;
        },
        {
          cost: {
            USD: 0,
            GBP: 0,
            AUD: 0,
            JPY: 0,
            RUB: 0,
          },
          quantity: 0,
        }
      );

      state.totalPrice.USD = +cost.USD;
      state.totalPrice.GBP = +cost.GBP;
      state.totalPrice.AUD = +cost.AUD;
      state.totalPrice.JPY = +cost.JPY;
      state.totalPrice.RUB = +cost.RUB;

      state.totalAmount = quantity;
    },
  },
});

const { reducer: cartReducer, actions } = cartSlice;

export const { addToCart, decreaseStuffQuantity, removeItem, getTotal } =
  actions;

export default cartReducer;
