import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { genreType, platformType } from "@/lib/types";

const initialState = {
  videogamesExist: true,
  genres: [] as { label: string; value: string }[],
  platforms: [] as { label: string; value: string }[],
};

export const videogamesSlice = createSlice({
  name: "videogamesPage",
  initialState,
  reducers: {
    validateVideogamesExist: (state, action: PayloadAction<boolean>) => {
      state.videogamesExist = action.payload;
    },
    setGenres: (state, action: PayloadAction<genreType[]>) => {
      state.genres = action.payload;
    },
    setPlatforms: (state, action: PayloadAction<platformType[]>) => {
      state.platforms = action.payload;
    },
  },
});

export const { setGenres, setPlatforms, validateVideogamesExist } =
  videogamesSlice.actions;

export default videogamesSlice.reducer;
