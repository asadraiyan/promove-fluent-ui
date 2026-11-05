import { healthHandlers } from "./health";
import { locationHandler } from "./location/locationHandler";
import { addressHandler } from "./location/addressHandler";
import { datesHandler } from "./shipment/datesHandler";
import { trackingHandlers } from "./transitGuide/trackingHandler";
import { paymentsHandler } from "./payments/paymentsHandler";
import { containersHandler } from "./shipment/containersHandler";
import { contentHandlers } from "./content/contentHandlers";

export const handlers = [
  ...healthHandlers,
  ...locationHandler,
  ...addressHandler,
  ...datesHandler,
  ...trackingHandlers,
  ...paymentsHandler,
  ...containersHandler,
  ...contentHandlers,
];
