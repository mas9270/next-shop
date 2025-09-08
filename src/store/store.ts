import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import langSlice from "./slices/lang";
import logger from "redux-logger";

export const makeStore = () => {
  return configureStore({
    reducer: {
      lang: langSlice,
    },
    middleware: (getDefaultMiddleware) =>
      process.env.NODE_ENV === "development"
        ? getDefaultMiddleware().concat(logger)
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
