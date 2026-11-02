import { healthHandlers } from "./health";
import { countriesHandler } from "./locationData";

export const handlers = [...healthHandlers, ...countriesHandler];
