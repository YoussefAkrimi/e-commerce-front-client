import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    Products: [],
    totalPrice: 0,
    totalQuantity: 0,
  },


  reducers: {
    addToCart: (state, action) => {
      const productIndex = state.Products.find(
        (item) => item.productId === action.payload.productId
      );
      if (productIndex ) {
        productIndex.productQuantity += action.payload.productQuantity;
      } else {
        const prod = { ...action.payload };
        state.Products.push(prod);
      }
      state.totalPrice = state.Products.reduce(
        (sum, item) => sum + item.productQuantity * item.productPrice,
        0
      );
      state.totalQuantity += 1;
    },
    clearCart: (state) =>{
      state.totalPrice = 0
      state.totalQuantity = 0
      state.Products = []
    
    }
  },
  
});

export const { addToCart, clearCart } = CartSlice.actions;
export default CartSlice.reducer;