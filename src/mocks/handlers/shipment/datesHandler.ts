import { http, HttpResponse } from "msw";
import { getApiUrl } from "../../../api/config";
import destinationDates from "../../data/shipmentDates/destinationDates.json";
import freightDates from "../../data/shipmentDates/freightDates.json";
import originDates from "../../data/shipmentDates/originDates.json";
import permStorageDates from "../../data/shipmentDates/permStorageDates.json";

export const datesHandler = [
  http.get(
    getApiUrl("/api/shipments/:goodsId/origin-dates"),
    () => HttpResponse.json(originDates),
  ),
  http.get(
    getApiUrl("/api/shipments/:goodsId/freight-dates"),
    () => HttpResponse.json(freightDates),
  ),
  http.get(
    getApiUrl("/api/shipments/:goodsId/destination-dates"),
    () => HttpResponse.json(destinationDates),
  ),
  http.get(
    getApiUrl("/api/shipments/:goodsId/perm-storage-dates"),
    () => HttpResponse.json(permStorageDates),
  ),
];
