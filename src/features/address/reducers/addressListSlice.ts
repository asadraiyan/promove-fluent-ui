import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface AddressListRow {
  addressId: number;
  addressTypeId: number;
  addressType: string;
  name: string;
  address: string;
  city: string;
  country: string;
}

export interface AddressListState {
  rows: AddressListRow[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  requestId: string | null;
}

const initialState: AddressListState = {
  rows: [],
  status: "idle",
  error: null,
  requestId: null,
};

export const loadAddressList = createAsyncThunk<
  AddressListRow[],
  number | undefined,
  { rejectValue: string }
>("addressList/load", async (salesFileId, { rejectWithValue }) => {
  const endpoint =
    salesFileId === undefined
      ? "/enquiryAddresses.json"
      : `/api/enquiries/${salesFileId}/addresses`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      return rejectWithValue(`Unable to load addresses (${response.status}).`);
    }

    return (await response.json()) as AddressListRow[];
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Unable to load addresses.",
    );
  }
});

const addressListSlice = createSlice({
  name: "addressList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAddressList.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
        state.requestId = action.meta.requestId;
      })
      .addCase(loadAddressList.fulfilled, (state, action) => {
        if (state.requestId !== action.meta.requestId) return;
        state.rows = action.payload;
        state.status = "succeeded";
        state.requestId = null;
      })
      .addCase(loadAddressList.rejected, (state, action) => {
        if (state.requestId !== action.meta.requestId) return;
        state.status = "failed";
        state.error =
          action.payload ?? action.error.message ?? "Unable to load addresses.";
        state.requestId = null;
      });
  },
});

export default addressListSlice.reducer;
