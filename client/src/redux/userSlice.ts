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
    setUser: (state, action: PayloadAction<userType>) => {
      const { id, username, email } = action.payload;

      if (id && username && email) {
        state.id = id;
        state.username = username;
        state.email = email;
      }
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
