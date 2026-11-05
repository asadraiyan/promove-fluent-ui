import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ShipmentContentApiResponse } from "../ShipmentContent.types";

interface ShipmentContentState {
  data: ShipmentContentApiResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: ShipmentContentState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchShipmentContents = createAsyncThunk(
  "shipmentContent/fetchContents",
  async (goodsId: string) => {
    const response = await fetch(`/api/shipments/${goodsId}/contents`);
    if (!response.ok) throw new Error("Failed to fetch shipment contents");
    return await response.json();
  }
);

const shipmentContentSlice = createSlice({
  name: "shipmentContent",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShipmentContents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchShipmentContents.fulfilled,
        (state, action: PayloadAction<ShipmentContentApiResponse>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchShipmentContents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      });
  },
});

export default shipmentContentSlice.reducer;