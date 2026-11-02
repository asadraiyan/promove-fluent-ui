import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  DestinationDatesResponse,
  fetchShipmentDates,
  FreightDatesResponse,
  OriginDatesResponse,
  PermStorageDatesResponse,
} from "../api/datesApi";

export interface ShipmentDatesGoodsIds {
  origin: number;
  freight: number;
  destination: number;
  permStorage: number;
}

export interface ShipmentDatesResponse {
  origin: OriginDatesResponse;
  freight: FreightDatesResponse;
  destination: DestinationDatesResponse;
  permStorage: PermStorageDatesResponse;
}

type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

export interface DatesNodeState {
  data: ShipmentDatesResponse | null;
  status: RequestStatus;
  error: string | null;
  requestId: string | null;
  requestedGoodsIds: ShipmentDatesGoodsIds | null;
}

const initialState: DatesNodeState = {
  data: null,
  status: "idle",
  error: null,
  requestId: null,
  requestedGoodsIds: null,
};

const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : "Unable to load shipment dates.";

export const loadShipmentDates = createAsyncThunk<
  ShipmentDatesResponse,
  ShipmentDatesGoodsIds,
  { rejectValue: string; state: { datesNode: DatesNodeState } }
>(
  "datesNode/loadShipmentDates",
  async (goodsIds, { rejectWithValue }) => {
    try {
      const [origin, freight, destination, permStorage] = await Promise.all([
        fetchShipmentDates<OriginDatesResponse>(
          goodsIds.origin,
          "origin-dates",
          "origin dates",
        ),
        fetchShipmentDates<FreightDatesResponse>(
          goodsIds.freight,
          "freight-dates",
          "freight dates",
        ),
        fetchShipmentDates<DestinationDatesResponse>(
          goodsIds.destination,
          "destination-dates",
          "destination dates",
        ),
        fetchShipmentDates<PermStorageDatesResponse>(
          goodsIds.permStorage,
          "perm-storage-dates",
          "permanent storage dates",
        ),
      ]);

      return { origin, freight, destination, permStorage };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
  {
    condition: (goodsIds, { getState }) => {
      const { status, requestedGoodsIds } = getState().datesNode;
      const isSameRequest =
        requestedGoodsIds?.origin === goodsIds.origin &&
        requestedGoodsIds?.freight === goodsIds.freight &&
        requestedGoodsIds?.destination === goodsIds.destination &&
        requestedGoodsIds?.permStorage === goodsIds.permStorage;

      return status !== "loading" || !isSameRequest;
    },
  },
);

const datesNodeSlice = createSlice({
  name: "datesNode",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadShipmentDates.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
        state.requestId = action.meta.requestId;
        state.requestedGoodsIds = action.meta.arg;
      })
      .addCase(loadShipmentDates.fulfilled, (state, action) => {
        if (state.requestId !== action.meta.requestId) return;
        state.data = action.payload;
        state.status = "succeeded";
        state.requestId = null;
      })
      .addCase(loadShipmentDates.rejected, (state, action) => {
        if (state.requestId !== action.meta.requestId) return;
        state.status = "failed";
        state.error =
          action.payload ?? action.error.message ?? "Unable to load shipment dates.";
        state.requestId = null;
      });
  },
});

export default datesNodeSlice.reducer;
