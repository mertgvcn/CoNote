// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer, appReducer } from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof appReducer>;
export type AppDispatch = typeof store.dispatch;