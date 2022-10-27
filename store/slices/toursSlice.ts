import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { Tour } from "../../types/typings";
import { RootState } from "../index";

interface ToursState {
  tours: Tour[];
  filter: "popular" | "deals";
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState = {
  tours: [],
  filter: "popular",
  status: "idle",
  error: null,
} as ToursState;

export const getPopularTours = createAsyncThunk("tours/popular", async () => {
  const response = await fetch("api/tours/popular");
  return await response.json();
});

export const getTourDeals = createAsyncThunk("tours/deals", async () => {
  console.log("tour deals");
  const response = await fetch("api/tours/deals");
  return await response.json();
});

export const toursSlice = createSlice({
  name: "tours",
  initialState,
  reducers: {
    setTours(state: ToursState, action: PayloadAction<Tour[]>) {
      state.tours = action.payload;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(HYDRATE, (state: ToursState, action: AnyAction) => {
        if (action.payload.tours.tours == null) {
          return state;
        }

        state.tours = action.payload.tours.tours;
      })
      .addCase(getPopularTours.pending, state => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getPopularTours.fulfilled, (state, action) => {
        state.tours = action.payload;
        state.filter = "popular";
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(getPopularTours.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      })
      .addCase(getTourDeals.pending, state => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getTourDeals.fulfilled, (state, action) => {
        state.tours = action.payload;
        state.filter = "deals";
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(getTourDeals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      });
  },
});

export const { setTours } = toursSlice.actions;

export const selectTours = (state: RootState) => state.tours.tours;
export const getToursFilter = (state: RootState) => state.tours.filter;
export const getToursStatus = (state: RootState) => state.tours.status;
export const getToursError = (state: RootState) => state.tours.error;

export default toursSlice.reducer;
