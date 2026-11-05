import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ExpensePaidItem, RevenueReceivedItem } from "../paymentsView.types";

interface PaymentsState {
  expenses: ExpensePaidItem[];
  revenues: RevenueReceivedItem[];
  loading: boolean;
  error: string | null;
}

const initialState: PaymentsState = {
  expenses: [],
  revenues: [],
  loading: false,
  error: null,
};

export const fetchPayments = createAsyncThunk(
  "payments/fetchPayments",
  async (salesId: string) => {
    const response = await fetch(`/api/payments/${salesId}`);
    if (!response.ok) throw new Error("Failed to fetch payments");
    return await response.json();
  },
);

const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPayments.fulfilled,
        (
          state,
          action: PayloadAction<{
            expensePaid: ExpensePaidItem[];
            revenueReceived: RevenueReceivedItem[];
          }>,
        ) => {
          state.loading = false;
          state.expenses = action.payload.expensePaid || [];
          state.revenues = action.payload.revenueReceived || [];
        },
      )
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      });
  },
});

export default paymentsSlice.reducer;
