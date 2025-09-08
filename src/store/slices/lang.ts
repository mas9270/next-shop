import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import { AppThunk } from "../store";

type Locale = "fa" | "en";

interface lang {
  locale: Locale;
  dictionary: { [key: string]: string };
}

const initialState: lang = {
  locale: "fa",
  dictionary: {},
};

export const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    setLang: (state, action: PayloadAction<lang>) => {
      state.locale = action.payload.locale;
      state.dictionary = action.payload.dictionary;
    },
  },
});

// export const fetchUsers = (): AppThunk => async (dispatch) => {
// try {
//   dispatch(fetchUsersStart());
//   const response = await axios.get<User[]>(
//     "https://jsonplaceholder.typicode.com/users"
//   );
//   dispatch(fetchUsersSuccess(response.data));
// } catch (error: any) {
//   dispatch(fetchUsersFailure(error.message));
// }
// };

export const { setLang } = langSlice.actions;
export default langSlice.reducer;
