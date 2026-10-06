import { configureStore } from "@reduxjs/toolkit";
import addressDetailsReducer from "../features/address/reducers/addressDetailsSlice";

export const store = configureStore({
  reducer: {
    addressDetails: addressDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
