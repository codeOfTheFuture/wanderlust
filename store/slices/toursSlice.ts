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
  filter: "popular" | "deals" | "categories";
  category: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState = {
  tours: [],
  filter: "popular",
  category: null,
  status: "idle",
  error: null,
} as ToursState;

export const getPopularTours = createAsyncThunk("tours/popular", async () => {
  const response = await fetch("api/tours/popular");
  return await response.json();
});

export const getTourDeals = createAsyncThunk("tours/deals", async () => {
  const response = await fetch("api/tours/deals");
  return await response.json();
});

export const fetchTourCategory = createAsyncThunk(
  "tours/category",
  async (category: string) => {
    const response = await fetch(`api/tours/categories/${category}`);
    const data = await response.json();
    return { category, data };
  }
);

export const toursSlice = createSlice({
  name: "tours",
  initialState,
  reducers: {
    setTours(state: ToursState, action: PayloadAction<Tour[]>) {
      state.tours = action.payload;
    },
    categoriesClicked(state: ToursState) {
      state.filter = "categories";
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
        state.category = null;
        state.status = "succeeded";
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
        state.category = null;
        state.status = "succeeded";
      })
      .addCase(getTourDeals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      })
      .addCase(fetchTourCategory.pending, state => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTourCategory.fulfilled, (state, action) => {
        state.tours = action.payload.data;
        state.category = action.payload.category;
        state.status = "succeeded";
      })
      .addCase(fetchTourCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      });
  },
});

export const { setTours, categoriesClicked } = toursSlice.actions;

export const selectTours = (state: RootState) => state.tours.tours;
export const getToursFilter = (state: RootState) => state.tours.filter;
export const getToursCategory = (state: RootState) => state.tours.category;
export const getToursStatus = (state: RootState) => state.tours.status;
export const getToursError = (state: RootState) => state.tours.error;

export default toursSlice.reducer;
