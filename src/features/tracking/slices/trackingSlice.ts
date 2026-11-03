import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApiUrl } from "../../../api/config";

export const fetchTrackingData = createAsyncThunk(
  "tracking/fetchData",
  async (goodsId: string) => {
    const response = await fetch(`/api/shipments/${goodsId}/tracking`);
    if (!response.ok) throw new Error("Failed to fetch tracking data");
    return await response.json();
  },
);

export const updateTrackingData = createAsyncThunk(
  "tracking/updateData",
  async ({ goodsId, payload }: { goodsId: string; payload: any }) => {
    const response = await fetch(`/api/shipments/${goodsId}/tracking`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error("Failed to update tracking data");
    return await response.json();
  },
);

const trackingSlice = createSlice({
  name: "tracking",
  initialState: { data: null, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTrackingData.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
    });
  },
});

export default trackingSlice.reducer;
