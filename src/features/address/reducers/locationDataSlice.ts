import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface LocationOption {
  id: string;
  label: string;
}

interface StateOption extends LocationOption {
  cities: LocationOption[];
}

interface CountryOption extends LocationOption {
  states: StateOption[];
}

export interface LocationData {
  countries: CountryOption[];
}

export interface LocationDataState {
  data: LocationData | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: LocationDataState = {
  data: null,
  status: "idle",
  error: null,
};

export const loadLocationData = createAsyncThunk<
  LocationData,
  void,
  { state: { locationData: LocationDataState }; rejectValue: string }
>(
  "locationData/load",
  async (_, { rejectWithValue }) => {
    const response = await fetch("/locationData.json");
    if (!response.ok) {
      return rejectWithValue(
        `Unable to load location data (${response.status}).`,
      );
    }

    return (await response.json()) as LocationData;
  },
  {
    condition: (_, { getState }) =>
      getState().locationData.status === "idle",
  },
);

const locationDataSlice = createSlice({
  name: "locationData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadLocationData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadLocationData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "succeeded";
      })
      .addCase(loadLocationData.rejected, (state, action) => {
        if (action.meta.condition) return;
        state.status = "failed";
        state.error =
          action.payload ?? action.error.message ?? "Unable to load location data.";
      });
  },
});

export default locationDataSlice.reducer;
