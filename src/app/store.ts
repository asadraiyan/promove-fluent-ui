import { configureStore } from "@reduxjs/toolkit";
import addressListReducer from "../features/address/reducers/addressListSlice";
import addressDetailsReducer from "../features/address/reducers/addressDetailsSlice";
import locationDataReducer from "../features/address/reducers/locationDataSlice";
import datesNodeReducer from "../features/datesNode/reducers/datesNodeSlice";
import trackingReducer from "../features/tracking/slices/trackingSlice";
import paymentsReducer from "../features/payments/reducers/paymentSlice";
import seaContainerDetailsReducer from "../features/seaContainerDetails/reducers/seaContainerDetailsSlice";
import shipmentContentReducer from "../features/shipmentContent/reducers/shipmentContentSlice";
import freightInformationReducer from "../features/FreightInformation/reducers/freightInformationSlice";

export const store = configureStore({
  reducer: {
    addressList: addressListReducer,
    addressDetails: addressDetailsReducer,
    locationData: locationDataReducer,
    datesNode: datesNodeReducer,
    tracking: trackingReducer,
    payments: paymentsReducer,
    seaContainerDetails: seaContainerDetailsReducer,
    shipmentContent: shipmentContentReducer,
    freightInformation: freightInformationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
