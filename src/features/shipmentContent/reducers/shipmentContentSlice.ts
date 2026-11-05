import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ShipmentContentApiResponse } from "../ShipmentContent.types";

interface ShipmentContentState {
  data: ShipmentContentApiResponse | null;
  loading: boolean;
  error: string | null;
  isUpdating: boolean;
  updateError: string | null;
}

const initialState: ShipmentContentState = {
  data: null,
  loading: false,
  error: null,
  isUpdating: false,
  updateError: null,
};

export const fetchShipmentContents = createAsyncThunk(
  "shipmentContent/fetchContents",
  async (goodsId: string) => {
    const response = await fetch(`/api/shipments/${goodsId}/contents`);
    if (!response.ok) throw new Error("Failed to fetch shipment contents");
    return await response.json();
  },
);

export const updateShipmentContents = createAsyncThunk(
  "shipmentContent/updateContents",
  async ({ goodsId, payload }: { goodsId: string; payload: any }) => {
    const response = await fetch(`/api/shipments/${goodsId}/contents`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error("Failed to update shipment contents");
    return await response.json();
  },
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
        },
      )
      .addCase(fetchShipmentContents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      })
      .addCase(updateShipmentContents.pending, (state) => {
        state.isUpdating = true;
        state.updateError = null;
      })
      .addCase(updateShipmentContents.fulfilled, (state) => {
        state.isUpdating = false;
      })
      .addCase(updateShipmentContents.rejected, (state, action) => {
        state.isUpdating = false;
        state.updateError = action.error.message || "Failed to update contents";
      });
  },
});

export default shipmentContentSlice.reducer;
