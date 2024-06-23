import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: { showMoadl: boolean } = {
  showMoadl: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setShowModal: (state, action:PayloadAction<boolean>) => {
      state.showMoadl =  action.payload;
    },
  },
});

export default modalSlice.reducer;
export const { setShowModal } = modalSlice.actions;
