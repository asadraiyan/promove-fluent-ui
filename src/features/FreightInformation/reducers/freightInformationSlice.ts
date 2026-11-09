import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchFreightInformation,
  fetchFreightInformationDropdowns,
  FreightDropdownQuery,
  FreightInformationDropdowns,
  FreightInformationPayload,
  FreightInformationResponse,
  saveFreightInformation,
} from "../api/freightInformationApi";

type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

export interface FreightInformationState {
  data: FreightInformationResponse | null;
  dropdowns: FreightInformationDropdowns | null;
  status: RequestStatus;
  error: string | null;
  dropdownStatus: RequestStatus;
  dropdownError: string | null;
  saveStatus: RequestStatus;
  saveError: string | null;
  saveSuccess: boolean;
}

const initialState: FreightInformationState = {
  data: null,
  dropdowns: null,
  status: "idle",
  error: null,
  dropdownStatus: "idle",
  dropdownError: null,
  saveStatus: "idle",
  saveError: null,
  saveSuccess: false,
};

const errorMessage = (error: unknown, fallback: string): string =>
  error instanceof Error ? error.message : fallback;

export const loadFreightInformation = createAsyncThunk<
  FreightInformationResponse,
  number,
  { rejectValue: string }
>("freightInformation/load", async (goodsId, { rejectWithValue }) => {
  try {
    return await fetchFreightInformation(goodsId);
  } catch (error) {
    return rejectWithValue(
      errorMessage(error, "Unable to load freight information."),
    );
  }
});

export const loadFreightInformationDropdowns = createAsyncThunk<
  FreightInformationDropdowns,
  FreightDropdownQuery,
  { rejectValue: string }
>("freightInformation/loadDropdowns", async (query, { rejectWithValue }) => {
  try {
    return await fetchFreightInformationDropdowns(query);
  } catch (error) {
    return rejectWithValue(errorMessage(error, "Unable to load freight dropdowns."));
  }
});

export const saveFreightInformationThunk = createAsyncThunk<
  FreightInformationResponse,
  { goodsId: number; payload: FreightInformationPayload },
  { rejectValue: string }
>(
  "freightInformation/save",
  async ({ goodsId, payload }, { rejectWithValue }) => {
    try {
      return await saveFreightInformation(goodsId, payload);
    } catch (error) {
      return rejectWithValue(
        errorMessage(error, "Unable to save freight information."),
      );
    }
  },
);

const freightInformationSlice = createSlice({
  name: "freightInformation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadFreightInformation.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadFreightInformation.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "succeeded";
      })
      .addCase(loadFreightInformation.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload ??
          action.error.message ??
          "Unable to load freight information.";
      })
      .addCase(loadFreightInformationDropdowns.pending, (state) => {
        state.dropdownStatus = "loading";
        state.dropdownError = null;
      })
      .addCase(loadFreightInformationDropdowns.fulfilled, (state, action) => {
        state.dropdowns = action.payload;
        state.dropdownStatus = "succeeded";
      })
      .addCase(loadFreightInformationDropdowns.rejected, (state, action) => {
        state.dropdownStatus = "failed";
        state.dropdownError =
          action.payload ??
          action.error.message ??
          "Unable to load freight dropdowns.";
      })
      .addCase(saveFreightInformationThunk.pending, (state) => {
        state.saveStatus = "loading";
        state.saveError = null;
        state.saveSuccess = false;
      })
      .addCase(saveFreightInformationThunk.fulfilled, (state, action) => {
        state.data = action.payload;
        state.saveStatus = "succeeded";
        state.saveSuccess = true;
      })
      .addCase(saveFreightInformationThunk.rejected, (state, action) => {
        state.saveStatus = "failed";
        state.saveError =
          action.payload ??
          action.error.message ??
          "Unable to save freight information.";
      });
  },
});

export default freightInformationSlice.reducer;
