import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddressDetailsPerson } from "../AddressDetails.types";

export interface AddressDetailsState {
  people: AddressDetailsPerson[];
  selectedPersonId: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AddressDetailsState = {
  people: [],
  selectedPersonId: null,
  status: "idle",
  error: null,
};

export const loadAddressDetailsPeople = createAsyncThunk<
  AddressDetailsPerson[],
  void,
  { state: { addressDetails: AddressDetailsState }; rejectValue: string }
>(
  "addressDetails/loadPeople",
  async (_, { rejectWithValue }) => {
    const response = await fetch("/addressDetails.json");
    if (!response.ok) {
      return rejectWithValue(
        `Unable to load address details (${response.status}).`,
      );
    }

    const data = (await response.json()) as { users: AddressDetailsPerson[] };
    return data.users;
  },
  {
    condition: (_, { getState }) => getState().addressDetails.status === "idle",
  },
);

const addressDetailsSlice = createSlice({
  name: "addressDetails",
  initialState,
  reducers: {
    selectAddressDetailsPerson(
      state,
      action: PayloadAction<string | null>,
    ) {
      state.selectedPersonId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAddressDetailsPeople.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadAddressDetailsPeople.fulfilled, (state, action) => {
        state.people = action.payload;
        state.status = "succeeded";
      })
      .addCase(loadAddressDetailsPeople.rejected, (state, action) => {
        if (action.meta.condition) return;
        state.status = "failed";
        state.error =
          action.payload ?? action.error.message ?? "Unable to load address details.";
      });
  },
});

export const { selectAddressDetailsPerson } = addressDetailsSlice.actions;
export default addressDetailsSlice.reducer;
