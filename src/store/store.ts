import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import logger from "redux-logger";
import langSlice from "./slices/lang";
import userInfoSlice from "./slices/userInfo";
import cartSlice from "./slices/cart";

export const makeStore = () => {
  return configureStore({
    reducer: {
      lang: langSlice,
      userInfo: userInfoSlice,
      cart: cartSlice,
    },
    middleware: (getDefaultMiddleware) =>
      process.env.NODE_ENV === "development"
        ? getDefaultMiddleware() //.concat(logger)
        : getDefaultMiddleware(), // اضافه کردن redux-logger به middleware
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
