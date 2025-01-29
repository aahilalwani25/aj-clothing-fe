const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalCost: 0,
  },
  reducers: {
    addItemToCart: (state, action) => {
      state.items.push(action.payload?.item);
      state.totalCost += action.payload?.item?.price;
    },
    deleteItemFromCart: (state, action) => {
      const itemIndexFound = state.items?.findIndex(
        (item) => item?.product_id === action?.payload?.product_id
      );
      if (itemIndexFound) {
        state?.items?.slice(itemIndexFound, 1);
      }
    },
  },
});

export const { addItemToCart } = cartSlice.actions;
export default cartSlice.reducer;
