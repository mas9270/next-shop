import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Locale = "fa" | "en";

interface lang {
  lang: Locale;
  dictionary: { [key: string]: string };
}

const initialState: lang = {
  lang: "fa",
  dictionary: {},
};

export const longSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    setLang: (state, action: PayloadAction<lang>) => {
      state.lang = action.payload.lang;
      state.dictionary = action.payload.dictionary;
    },
  },
});

export const { setLang } = longSlice.actions;
export default longSlice.reducer;
