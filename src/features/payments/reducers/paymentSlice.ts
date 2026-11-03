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

export const fetchExpenses = createAsyncThunk(
  "payments/fetchExpenses",
  async () => {
    const response = await fetch("/api/expenses");
    if (!response.ok) throw new Error("Failed to fetch expenses");
    return await response.json();
  },
);

export const fetchRevenues = createAsyncThunk(
  "payments/fetchRevenues",
  async () => {
    const response = await fetch("/api/revenues");
    if (!response.ok) throw new Error("Failed to fetch revenues");
    return await response.json();
  },
);

const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchExpenses.fulfilled,
        (state, action: PayloadAction<ExpensePaidItem[]>) => {
          state.loading = false;
          state.expenses = action.payload;
        },
      )
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      })
      .addCase(fetchRevenues.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchRevenues.fulfilled,
        (state, action: PayloadAction<RevenueReceivedItem[]>) => {
          state.loading = false;
          state.revenues = action.payload;
        },
      )
      .addCase(fetchRevenues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      });
  },
});

export default paymentsSlice.reducer;
