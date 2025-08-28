// store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage for web

import userReducer from "./authSclice";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";
import recentReducer from "./recentSclice";
// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  products: productReducer,
  recentProducts: recentReducer,
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // only persist user slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store setup
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist action warnings
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Persistor
export const persistor = persistStore(store);

// Types for TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
