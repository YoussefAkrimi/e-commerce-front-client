import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  favo: [], // Array of favorite products
};

const favouriteSlice = createSlice({
  name: "fav",
  initialState: {
    favo: [],
  },

  reducers: {
    addToFavourite: (state, action) => {
      const newFav = action.payload;
      // Check if the item is already in the favourites list
      const isAlreadyFav = state.favo.some(
        (item) => item.productId === newFav.productId
      );
      if (!isAlreadyFav) {
        // Instead of pushing, return a new state with the updated array
        state.favo = [...state.favo, newFav];
      }
    },
    // Action to remove a product from the favorites list
    removeFavourite: (state, action) => {
      state.favo = state.favo.filter(
        (item) => item.productId !== action.payload
      );
    },
    // Action to clear all favorites
    clearAllFavourites: (state) => {
      state.favo = [];
    },
  },
});

export const { addToFavourite, removeFavourite, clearAllFavourites } =
  favouriteSlice.actions;
export default favouriteSlice.reducer;
