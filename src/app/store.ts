import { configureStore } from "@reduxjs/toolkit";
import addressDetailsReducer from "../features/address/reducers/addressDetailsSlice";
import locationDataReducer from "../features/address/reducers/locationDataSlice";

export const store = configureStore({
  reducer: {
    addressDetails: addressDetailsReducer,
    locationData: locationDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
