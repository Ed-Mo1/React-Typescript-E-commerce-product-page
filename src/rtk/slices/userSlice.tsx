import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import avatar from "../../assets/images/image-avatar.png";

type User = {
  avatar: string;
};

const initialState: User = {
  avatar: avatar,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.avatar = action.payload.avatar;
    },
  },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;