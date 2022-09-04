import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    toggleModal: state => {
      state.modalOpen = !state.modalOpen;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openModal, closeModal, toggleModal } = modalSlice.actions;

export default modalSlice.reducer;
