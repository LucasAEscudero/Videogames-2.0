import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import videogamesPageSlice from "./videogamesPageSlice";

const store = configureStore({
  reducer: {
    videogamesPage: videogamesPageSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types

export default store;
