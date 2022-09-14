import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import userReducer from "../slices/userSlice";
import modalReducer from "../slices/modalSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      user: userReducer,
      modalOpen: modalReducer,
    },
  });

export const wrapper = createWrapper(makeStore, { debug: true });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;
