import { http, HttpResponse } from "msw";
import mockShipmentContent from "../../data/contentData/shipmentContentData.json";
import { getApiUrl } from "@/api/config";

export const contentHandlers = [
  http.get(getApiUrl("/api/shipments/:goodsId/contents"), () => {
    return HttpResponse.json(mockShipmentContent, { status: 200 });
  }),
  http.put(getApiUrl("/api/shipments/:goodsId/contents"), async () => {
    return HttpResponse.json({ goodsId: 651097 }, { status: 200 });
  }),
];
