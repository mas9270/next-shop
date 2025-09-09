import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Search {
  text: string;
}

const initialState: Search = {
  text: "",
};

export const textSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<Search>) => {
      state.text = action.payload.text;
    },
  },
});

export const { setText } = textSlice.actions;
export default textSlice.reducer;
