import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./slices/gameSlice";
import userReducer from './slices/userSlice'

const store = configureStore({
  reducer: {
    game: gameReducer,
    user: userReducer
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
