import { AppState } from "./../store/index";
import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { User } from "../types/typings";

export interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state: UserState, action: AnyAction) => {
      if (!action.payload.user) {
        return state;
      }

      return action.payload.user;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export const selectUser = (state: AppState) => state.user.user;

export default userSlice.reducer;
