import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  nextPageExist: true,
};

export const videogamesPageSlice = createSlice({
  name: "videogamesPage",
  initialState,
  reducers: {
    validateNextPage: (state, action: PayloadAction<boolean>) => {
      state.nextPageExist = action.payload;
    },
  },
});

export const { validateNextPage } = videogamesPageSlice.actions;

export default videogamesPageSlice.reducer;
