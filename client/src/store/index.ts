import { configureStore } from "@reduxjs/toolkit";
import chessReducer from "./slices/chessSlice";

const store = configureStore({
  reducer: {
    chess: chessReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
