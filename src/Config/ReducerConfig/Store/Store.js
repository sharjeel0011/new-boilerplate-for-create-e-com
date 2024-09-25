// // Store.js
// import { configureStore } from '@reduxjs/toolkit';
// import cartItemsReducer from '../Reducer/CartItemSlice';

// export const store = configureStore({
//   reducer: {
//     cartItems: cartItemsReducer,
//   },
// });






import { configureStore } from '@reduxjs/toolkit';
import cartItemsReducer from '../Reducer/CartItemSlice';

export const store = configureStore({
  reducer: {
    cartItems: cartItemsReducer,
  },
});

export default store;
