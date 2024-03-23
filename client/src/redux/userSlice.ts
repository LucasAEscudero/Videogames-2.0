import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { userType } from "@/lib/types";

const initialState = {
  id: "",
  username: "",
  email: "",
  library: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<userType>) => {
      const { id, username, email } = action.payload;

      state.id = id;
      state.username = username;
      state.email = email;
    },
    logOut: (state) => {
      state.id = "";
      state.username = "";
      state.email = "";
    },
  },
});

export const { logIn, logOut } = userSlice.actions;

export default userSlice.reducer;
