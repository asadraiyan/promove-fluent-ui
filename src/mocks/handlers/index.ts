import { healthHandlers } from "./health";
import { locationHandler } from "./location/locationHandler";
import { addressHandler } from "./location/addressHandler";
export const handlers = [
  ...healthHandlers,
  ...locationHandler,
  ...addressHandler,
];
