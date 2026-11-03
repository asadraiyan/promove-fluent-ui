import { healthHandlers } from "./health";
import { locationHandler } from "./location/locationHandler";
import { addressHandler } from "./location/addressHandler";
import { datesHandler } from "./shipment/datesHandler";
import { trackingHandlers } from "./transitGuide/trackingHandler";
export const handlers = [
  ...healthHandlers,
  ...locationHandler,
  ...addressHandler,
  ...datesHandler,
  ...trackingHandlers,
];
