import { configureStore } from "@reduxjs/toolkit";
import chessReducer from "./slices/chessSlice";

const store = configureStore({
  reducer: {
    chess: chessReducer,
  },
});

export default store;
