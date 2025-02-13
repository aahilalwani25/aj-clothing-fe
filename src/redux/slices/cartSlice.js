import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalCost: 0,
  },
  reducers: {
    addItemToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.product_id === action.payload.item.product_id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload.item, quantity: 1 });
      }
      state.totalCost += action.payload.item.price;
    },
    removeItem: (state, action) => { //when a user presses on "delete" icon
      const itemIndexFound = state.items.findIndex(
        (item) => item.product_id === action.payload
      );
      if (itemIndexFound !== -1) {
        const [removedItem] = state.items.splice(itemIndexFound, 1);
        state.totalCost -= removedItem.price * removedItem.quantity;
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.product_id === id);
      if (itemToUpdate) {
        state.totalCost -= itemToUpdate.price * itemToUpdate.quantity;
        itemToUpdate.quantity = quantity;
        state.totalCost += itemToUpdate.price * quantity;
      }
    },
    clearCart: (state,action)=>{
      state.items=[];
      state.totalCost=0; 
    }
  },
});

export const { addItemToCart, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;