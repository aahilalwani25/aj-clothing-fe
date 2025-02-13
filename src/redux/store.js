import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit";
import cartSlice from "@/redux/slices/cartSlice";
import alertSlice from "@/redux/slices/alertSlice"
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ['cart'],
};

const rootReducer = combineReducers({
  cart: cartSlice,
  alert: alertSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);

const persistor = persistStore(store);

export { store, persistor };
