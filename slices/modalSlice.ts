import { AppState } from "./../store/index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export interface ModalState {
  modalOpen: boolean;
}

const initialState: ModalState = {
  modalOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<boolean>) => {
      state.modalOpen = action.payload;
    },
    closeModal: (state, action: PayloadAction<boolean>) => {
      state.modalOpen = action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (!action.payload.modal) {
        return state;
      }
      state.modalOpen = action.payload.modal;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openModal, closeModal } = modalSlice.actions;

export const selectModalOpen = (state: AppState) => state.modalOpen;

export default modalSlice.reducer;
