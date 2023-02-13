import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../shared/baseUrl";

export const fetchBeachsites = createAsyncThunk(
  "beachsites/fetchBeachsites",
  async () => {
    const response = await fetch(baseUrl + "beachsites");
    if (!response.ok) {
      return Promise.reject("Unable to fetch, status: " + response.status);
    }
    const data = await response.json();
    return data;
  }
);

const beachsitesSlice = createSlice({
  name: "beachsites",
  initialState: { isLoading: true, errMess: null, beachsitesArray: [] },
  reducers: {},
  extraReducers: {
    [fetchBeachsites.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchBeachsites.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.errMess = null;
      state.beachsitesArray = action.payload;
    },
    [fetchBeachsites.rejected]: (state, action) => {
      state.isLoading = false;
      state.errMess = action.error ? action.error.message : "Fetch failed";
    },
  },
});

export const beachsitesReducer = beachsitesSlice.reducer;
