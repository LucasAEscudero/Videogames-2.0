import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import videogamesSlice from "./videogamesSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    videogames: videogamesSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types

export default store;
