import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface LocationOption {
  id: string;
  description: string;
  countryCode: string;
  stateCode: string | null;
}

export interface CitySearchParams {
  countryCode?: string;
  stateCode?: string;
  search?: string;
}

type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

export interface LocationDataState {
  countries: LocationOption[];
  states: LocationOption[];
  cities: LocationOption[];
  countriesStatus: RequestStatus;
  statesStatus: RequestStatus;
  citiesStatus: RequestStatus;
  statesCountryCode: string | null;
  citiesQueryKey: string;
  error: string | null;
}

const initialState: LocationDataState = {
  countries: [],
  states: [],
  cities: [],
  countriesStatus: "idle",
  statesStatus: "idle",
  citiesStatus: "idle",
  statesCountryCode: null,
  citiesQueryKey: "",
  error: null,
};

const getCityQueryKey = (params: CitySearchParams) =>
  JSON.stringify([
    params.countryCode ?? "",
    params.stateCode ?? "",
    params.search?.trim() ?? "",
  ]);

export const loadCountries = createAsyncThunk<
  LocationOption[],
  void,
  { state: { locationData: LocationDataState }; rejectValue: string }
>("locationData/loadCountries", async (_, { rejectWithValue }) => {
  const response = await fetch("/countries.json");
  if (!response.ok) {
    return rejectWithValue(`Unable to load countries (${response.status}).`);
  }
  return (await response.json()) as LocationOption[];
}, {
  condition: (_, { getState }) =>
    getState().locationData.countriesStatus === "idle",
});

export const loadStates = createAsyncThunk<
  LocationOption[],
  string,
  { rejectValue: string }
>("locationData/loadStates", async (countryCode, { rejectWithValue }) => {
  const response = await fetch(
    `/states.json?countryCode=${encodeURIComponent(countryCode)}`,
  );
  if (!response.ok) {
    return rejectWithValue(`Unable to load states (${response.status}).`);
  }
  const states = (await response.json()) as LocationOption[];
  return states.filter((state) => state.countryCode === countryCode);
});

export const loadCities = createAsyncThunk<
  LocationOption[],
  CitySearchParams,
  { rejectValue: string }
>("locationData/loadCities", async (params, { rejectWithValue }) => {
  const query = new URLSearchParams();
  if (params.countryCode) query.set("countryCode", params.countryCode);
  if (params.stateCode) query.set("stateCode", params.stateCode);
  if (params.search?.trim()) query.set("search", params.search.trim());

  const response = await fetch(`/cities.json?${query.toString()}`);
  if (!response.ok) {
    return rejectWithValue(`Unable to load cities (${response.status}).`);
  }

  const search = params.search?.trim().toLowerCase();
  const cities = (await response.json()) as LocationOption[];
  return cities
    .filter(
      (city) =>
        (!params.countryCode || city.countryCode === params.countryCode) &&
        (!params.stateCode || city.stateCode === params.stateCode) &&
        (!search || city.description.toLowerCase().startsWith(search)),
    )
    .sort((left, right) => left.description.localeCompare(right.description));
});

const locationDataSlice = createSlice({
  name: "locationData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCountries.pending, (state) => {
        state.countriesStatus = "loading";
        state.error = null;
      })
      .addCase(loadCountries.fulfilled, (state, action) => {
        state.countries = action.payload;
        state.countriesStatus = "succeeded";
      })
      .addCase(loadCountries.rejected, (state, action) => {
        if (action.meta.condition) return;
        state.countriesStatus = "failed";
        state.error =
          action.payload ?? action.error.message ?? "Unable to load countries.";
      })
      .addCase(loadStates.pending, (state, action) => {
        state.statesCountryCode = action.meta.arg;
        state.states = [];
        state.statesStatus = "loading";
        state.error = null;
      })
      .addCase(loadStates.fulfilled, (state, action) => {
        if (state.statesCountryCode !== action.meta.arg) return;
        state.states = action.payload;
        state.statesStatus = "succeeded";
      })
      .addCase(loadStates.rejected, (state, action) => {
        if (state.statesCountryCode !== action.meta.arg) return;
        state.statesStatus = "failed";
        state.error =
          action.payload ?? action.error.message ?? "Unable to load states.";
      })
      .addCase(loadCities.pending, (state, action) => {
        state.citiesQueryKey = getCityQueryKey(action.meta.arg);
        state.cities = [];
        state.citiesStatus = "loading";
        state.error = null;
      })
      .addCase(loadCities.fulfilled, (state, action) => {
        if (state.citiesQueryKey !== getCityQueryKey(action.meta.arg)) return;
        state.cities = action.payload;
        state.citiesStatus = "succeeded";
      })
      .addCase(loadCities.rejected, (state, action) => {
        if (state.citiesQueryKey !== getCityQueryKey(action.meta.arg)) return;
        state.citiesStatus = "failed";
        state.error =
          action.payload ?? action.error.message ?? "Unable to load cities.";
      });
  },
});

export default locationDataSlice.reducer;
