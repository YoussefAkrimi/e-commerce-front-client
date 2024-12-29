import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import favouriteSlice from "./favouriteSlice"; // Correct import

const persistConfig = {
  key: "cart",
  storage,
};

const persistFavourite = {
  key: "fav",
  storage,
};

const persistCartReducer = persistReducer(persistConfig, cartReducer);
const persistFavouriteReducer = persistReducer(
  persistFavourite,
  favouriteSlice
);

const rootReducer = combineReducers({
  cart: persistCartReducer,
  fav: persistFavouriteReducer, // Corrected here
});

export const store = configureStore({ reducer: rootReducer });
export const persistor = persistStore(store);
