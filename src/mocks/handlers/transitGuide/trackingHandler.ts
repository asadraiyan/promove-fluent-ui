import { http, HttpResponse } from "msw";
import { getApiUrl } from "../../../api/config";
import trackingData from "../../data/trackingData/tracking.json";

// In-memory store based on the goodsId
let trackingDatabase: Record<string, any> = { ...trackingData };

export const trackingHandlers = [
  // 1. GET API
  http.get(getApiUrl("/api/shipments/:goodsId/tracking"), ({ params }) => {
    const { goodsId } = params;
    const data = trackingDatabase[goodsId as string];

    if (!data) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(data, { status: 200 });
  }),

  // 2. POST API
  http.post(
    getApiUrl("/api/shipments/:goodsId/tracking"),
    async ({ request, params }) => {
      const { goodsId } = params;

      // Parse the incoming trackingInformation from the request body
      const payload = (await request.json()) as any;

      // Update the in-memory database for this specific goodsId
      if (trackingDatabase[goodsId as string]) {
        trackingDatabase[goodsId as string].trackingInformation = {
          ...trackingDatabase[goodsId as string].trackingInformation,
          ...payload.trackingInformation,
        };
      } else {
        // Create new record if goodsId doesn't exist
        trackingDatabase[goodsId as string] = payload;
      }

      // Return the updated full object (or just a success status depending on your backend design)
      return HttpResponse.json(trackingDatabase[goodsId as string], {
        status: 201,
      });
    },
  ),
];
