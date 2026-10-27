import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddressDetailsResponse } from "../AddressDetails.types";

export interface AddressDetailsState {
  data: AddressDetailsResponse | null;
  selectedAddressId: number | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  requestId: string | null;
}

interface CreateAddressPayload {
  salesField: number;
  address: Omit<AddressDetailsResponse, "addressId">;
}

const initialState: AddressDetailsState = {
  data: null,
  selectedAddressId: null,
  status: "idle",
  error: null,
  requestId: null,
};

export const loadAddressDetails = createAsyncThunk<
  AddressDetailsResponse,
  number,
  { rejectValue: string }
>("addressDetails/load", async (addressId, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `/addressDetails.json?addressId=${encodeURIComponent(addressId)}`,
    );
    if (!response.ok) {
      return rejectWithValue(
        `Unable to load address details (${response.status}).`,
      );
    }

    const responseData = (await response.json()) as
      | AddressDetailsResponse
      | AddressDetailsResponse[];
    const details = Array.isArray(responseData)
      ? responseData.find((item) => item.addressId === addressId)
      : responseData;

    if (!details || details.addressId !== addressId) {
      return rejectWithValue(`No address details found for address ${addressId}.`);
    }

    return details;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error
        ? error.message
        : "Unable to load address details.",
    );
  }
});

export const createAddressDetails = createAsyncThunk<
  AddressDetailsResponse,
  CreateAddressPayload,
  { rejectValue: string }
>(
  "addressDetails/create",
  async ({ salesField, address }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/enquiries/${encodeURIComponent(salesField)}/addresses`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(address),
        },
      );

      if (!response.ok) {
        return rejectWithValue(
          `Unable to create address details (${response.status}).`,
        );
      }

      const responseData =
        (await response.json()) as AddressDetailsResponse;

      return responseData;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Unable to create address details.",
      );
    }
  },
);

const addressDetailsSlice = createSlice({
  name: "addressDetails",
  initialState,
  reducers: {
    clearSelectedAddressDetails: (state) => {
      state.data = null;
      state.selectedAddressId = null;
      state.status = "idle";
      state.error = null;
      state.requestId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAddressDetails.pending, (state, action) => {
        state.data = null;
        state.selectedAddressId = null;
        state.status = "loading";
        state.error = null;
        state.requestId = action.meta.requestId;
      })
      .addCase(loadAddressDetails.fulfilled, (state, action) => {
        if (state.requestId !== action.meta.requestId) return;
        state.data = action.payload;
        state.selectedAddressId = action.payload.addressId;
        state.status = "succeeded";
        state.requestId = null;
      })
      .addCase(loadAddressDetails.rejected, (state, action) => {
        if (state.requestId !== action.meta.requestId) return;
        state.data = null;
        state.selectedAddressId = null;
        state.status = "failed";
        state.error =
          action.payload ??
          action.error.message ??
          "Unable to load address details.";
        state.requestId = null;
      });
  },
});

export const { clearSelectedAddressDetails } = addressDetailsSlice.actions;
export default addressDetailsSlice.reducer;
