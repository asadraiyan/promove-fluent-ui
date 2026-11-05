import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ContainerApiRecord,
  ContainerRequestPayload,
  SeaContainerResponse,
} from "../SeaContainerDetails.types";
import {
  createShipmentContainer,
  deleteShipmentContainer,
  fetchShipmentContainers,
  ShipmentDirection,
  updateShipmentContainer,
} from "../api/containersApi";

type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

export interface SeaContainerDetailsState {
  data: SeaContainerResponse | null;
  loadStatus: RequestStatus;
  loadError: string | null;
  loadRequestId: string | null;
  saveStatus: RequestStatus;
  saveError: string | null;
}

interface ContainerMutation {
  goodsId: number;
  direction: ShipmentDirection;
  payload: ContainerRequestPayload;
}

interface ContainerUpdate extends ContainerMutation {
  movingUnitsId: number;
}

interface ContainerDelete {
  goodsId: number;
  movingUnitsId: number;
  direction: ShipmentDirection;
}

const initialState: SeaContainerDetailsState = {
  data: null,
  loadStatus: "idle",
  loadError: null,
  loadRequestId: null,
  saveStatus: "idle",
  saveError: null,
};

const errorMessage = (error: unknown, fallback: string): string =>
  error instanceof Error ? error.message : fallback;

export const loadSeaContainerDetails = createAsyncThunk<
  SeaContainerResponse,
  { goodsId: number; movingUnitsId?: number },
  { rejectValue: string }
>(
  "seaContainerDetails/load",
  async ({ goodsId, movingUnitsId }, { rejectWithValue }) => {
    try {
      return await fetchShipmentContainers(goodsId, movingUnitsId);
    } catch (error) {
      return rejectWithValue(
        errorMessage(error, "Unable to load shipment containers."),
      );
    }
  },
);

export const createSeaContainer = createAsyncThunk<
  ContainerApiRecord,
  ContainerMutation,
  { rejectValue: string }
>(
  "seaContainerDetails/create",
  async ({ goodsId, direction, payload }, { rejectWithValue }) => {
    try {
      return await createShipmentContainer(goodsId, direction, payload);
    } catch (error) {
      return rejectWithValue(
        errorMessage(error, "Unable to create shipment container."),
      );
    }
  },
);

export const updateSeaContainer = createAsyncThunk<
  ContainerApiRecord,
  ContainerUpdate,
  { rejectValue: string }
>(
  "seaContainerDetails/update",
  async ({ goodsId, movingUnitsId, direction, payload }, { rejectWithValue }) => {
    try {
      return await updateShipmentContainer(
        goodsId,
        movingUnitsId,
        direction,
        payload,
      );
    } catch (error) {
      return rejectWithValue(
        errorMessage(error, "Unable to update shipment container."),
      );
    }
  },
);

export const deleteSeaContainer = createAsyncThunk<
  number,
  ContainerDelete,
  { rejectValue: string }
>(
  "seaContainerDetails/delete",
  async ({ goodsId, movingUnitsId, direction }, { rejectWithValue }) => {
    try {
      await deleteShipmentContainer(goodsId, movingUnitsId, direction);
      return movingUnitsId;
    } catch (error) {
      return rejectWithValue(
        errorMessage(error, "Unable to delete shipment container."),
      );
    }
  },
);

const seaContainerDetailsSlice = createSlice({
  name: "seaContainerDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadSeaContainerDetails.pending, (state, action) => {
        state.loadStatus = "loading";
        state.loadError = null;
        state.loadRequestId = action.meta.requestId;
      })
      .addCase(loadSeaContainerDetails.fulfilled, (state, action) => {
        if (state.loadRequestId !== action.meta.requestId) return;
        state.data = action.payload;
        state.loadStatus = "succeeded";
        state.loadRequestId = null;
      })
      .addCase(loadSeaContainerDetails.rejected, (state, action) => {
        if (state.loadRequestId !== action.meta.requestId) return;
        state.loadStatus = "failed";
        state.loadError =
          action.payload ??
          action.error.message ??
          "Unable to load shipment containers.";
        state.loadRequestId = null;
      })
      .addCase(createSeaContainer.pending, (state) => {
        state.saveStatus = "loading";
        state.saveError = null;
      })
      .addCase(createSeaContainer.fulfilled, (state) => {
        state.saveStatus = "succeeded";
      })
      .addCase(createSeaContainer.rejected, (state, action) => {
        state.saveStatus = "failed";
        state.saveError =
          action.payload ??
          action.error.message ??
          "Unable to create shipment container.";
      })
      .addCase(updateSeaContainer.pending, (state) => {
        state.saveStatus = "loading";
        state.saveError = null;
      })
      .addCase(updateSeaContainer.fulfilled, (state) => {
        state.saveStatus = "succeeded";
      })
      .addCase(updateSeaContainer.rejected, (state, action) => {
        state.saveStatus = "failed";
        state.saveError =
          action.payload ??
          action.error.message ??
          "Unable to update shipment container.";
      })
      .addCase(deleteSeaContainer.pending, (state) => {
        state.saveStatus = "loading";
        state.saveError = null;
      })
      .addCase(deleteSeaContainer.fulfilled, (state) => {
        state.saveStatus = "succeeded";
      })
      .addCase(deleteSeaContainer.rejected, (state, action) => {
        state.saveStatus = "failed";
        state.saveError =
          action.payload ??
          action.error.message ??
          "Unable to delete shipment container.";
      });
  },
});

export default seaContainerDetailsSlice.reducer;
