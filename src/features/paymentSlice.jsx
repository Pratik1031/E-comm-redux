// slices/paymentSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  },
  reducers: {
    setCardNumber: (state, action) => {
      state.cardNumber = action.payload;
    },
    setExpiryDate: (state, action) => {
      state.expiryDate = action.payload;
    },
    setCvv: (state, action) => {
      state.cvv = action.payload;
    },
  },
});

export const { setCardNumber, setExpiryDate, setCvv } = paymentSlice.actions;
export const selectCardNumber = (state) => state.payment.cardNumber;
export const selectExpiryDate = (state) => state.payment.expiryDate;
export const selectCvv = (state) => state.payment.cvv;
export default paymentSlice.reducer;
