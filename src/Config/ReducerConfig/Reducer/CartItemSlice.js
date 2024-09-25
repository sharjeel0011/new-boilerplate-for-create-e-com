

// import { createSlice, nanoid } from '@reduxjs/toolkit';

// // Function to load the state from local storage
// const loadState = () => {
//   try {
//     const serializedState = localStorage.getItem('cartItems');
//     return serializedState ? JSON.parse(serializedState) : [];
//   } catch (err) {
//     return [];
//   }
// };

// // Function to save the state to local storage
// const saveState = (state) => {
//   try {
//     const serializedState = JSON.stringify(state);
//     localStorage.setItem('cartItems', serializedState);
//   } catch (err) {
//     // Ignore write errors
//   }
// };

// // Define the cart slice
// export const CartItemSlice = createSlice({
//   name: 'cartItems',
//   initialState: {
//     items: loadState(),
//   },
//   reducers: {
//     additem: {
//       reducer: (state, action) => {
//         state.items.push(action.payload);
//         saveState(state.items);
//       },
//       prepare: (item) => {
//         const id = nanoid();
//         return { payload: { ...item, id } };
//       }
//     },
//     setCart: (state, action) => {
//       state.items = action.payload;
//       saveState(state.items);
//     },
//     removeItem: (state, action) => {
//       state.items = state.items.filter(item => item.id !== action.payload.id);
//       saveState(state.items);
//     },
//   },
// });

// // Export actions
// export const { additem, setCart, removeItem } = CartItemSlice.actions;

// // Export reducer
// export default CartItemSlice.reducer;








import { createSlice, nanoid } from '@reduxjs/toolkit';

// Define the cart slice
export const CartItemSlice = createSlice({
  name: 'cartItems',
  initialState: {
    items: [],  // Initialize state without loading from local storage
  },
  reducers: {
    additem: {
      reducer: (state, action) => {
        state.items.push(action.payload);
      },
      prepare: (item) => {
        const id = nanoid();
        return { payload: { ...item, id } };
      }
    },
    setCart: (state, action) => {
      state.items = action.payload;
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
  },
});

// Export actions
export const { additem, setCart, removeItem } = CartItemSlice.actions;

// Export reducer
export default CartItemSlice.reducer;



