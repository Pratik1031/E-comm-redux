import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/productSlice';
import cartReducer from '../features/CartSlice';
import userReducer from '../features/userSlice';
import paymentReducer from '../features/paymentSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    user: userReducer,
    payment: paymentReducer,
  },
});

export default store;
