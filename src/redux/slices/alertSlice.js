import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: {
    isVisible: false,
    message: false
  },
  reducers: {
    setIsVisible: (state, action) => {
      state.isVisible= action?.payload?.isVisible;
      state.message= action?.payload?.message
    },
    clearAlert:(state,action)=>{
        state.isVisible=false;
        state.message=null;
    }
  },
});

export const { setIsVisible } = alertSlice.actions;
export default alertSlice.reducer;