// CartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const calculateTotal = (items) => {
  return items.reduce((accumulator, item) => {
    return accumulator + item.price * item.quantity;
  }, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      state.total = calculateTotal(state.items);
    },
    removeFromCart: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index !== -1) {
        state.items.splice(index, 1);
        state.total = calculateTotal(state.items);
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.items.find((item) => item.id === id);

      if (product) {
        product.quantity = quantity;
        state.total = calculateTotal(state.items);
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
