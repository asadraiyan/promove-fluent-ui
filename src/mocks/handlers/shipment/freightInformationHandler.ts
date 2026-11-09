
import { http, HttpResponse } from "msw";
import { getApiUrl } from "../../../api/config";

import {
  FreightInformationPayload,
  FreightInformationResponse,
} from "@/features/FreightInformation/api/freightInformationApi";

import freightDropdownsData from "../../data/freightInformationData/freightDropdowns.json";
import freightInformationData from "../../data/freightInformationData/freightInformation.json";

const dropdowns = freightDropdownsData;

const freightInformation =
  freightInformationData as FreightInformationResponse;

const shipments: Record<string, FreightInformationResponse> = {
  "89": freightInformation,
};

export const freightInformationHandlers = [
  // GET Freight Information Dropdowns
  http.get(
    getApiUrl("/api/shipments/freight-information/dropdowns"),
    ({ request }) => {
      const requestUrl = new URL(request.url);
      const mode = requestUrl.searchParams.get("mode");

      if (mode !== "air" && mode !== "sea" && mode !== "road") {
        return HttpResponse.json(
          { message: "A valid mode query parameter is required." },
          { status: 400 },
        );
      }

      return HttpResponse.json({
        mode,
        ...dropdowns,

        freightLanes: requestUrl.searchParams.has("addressId")
          ? dropdowns.freightLanes
          : [],

        salesCoordinators: requestUrl.searchParams.has("ownerCode")
          ? dropdowns.salesCoordinators
          : [],

        supportCoordinators: requestUrl.searchParams.has("ownerCode")
          ? dropdowns.supportCoordinators
          : [],

        workflows: requestUrl.searchParams.has("ownerCode")
          ? dropdowns.workflows
          : [],

        billing: requestUrl.searchParams.has("companyId")
          ? dropdowns.billing
          : [],
      });
    },
  ),

  // GET Freight Information
  http.get(
    getApiUrl("/api/shipments/:goodsId/freight-information"),
    ({ params }) => {
      const data = shipments[String(params.goodsId)];

      if (!data) {
        return HttpResponse.json(
          {
            message: `Shipment ${String(params.goodsId)} was not found.`,
          },
          { status: 404 },
        );
      }

      return HttpResponse.json(data);
    },
  ),

  // POST Freight Information
  http.post(
    getApiUrl("/api/shipments/:goodsId/freight-information"),
    async ({ params, request }) => {
      const goodsId = String(params.goodsId);
      const current = shipments[goodsId];

      if (!current) {
        return HttpResponse.json(
          {
            message: `Shipment ${goodsId} was not found.`,
          },
          { status: 404 },
        );
      }

      const payload = (await request.json()) as FreightInformationPayload;

      const general = { ...payload.General };
      const volume = { ...payload["Volume weight"] };

      general.Origin = general.origin ?? null;
      delete general.origin;

      volume["Special Weight"] = volume["Special weight"] ?? null;
      delete volume["Special weight"];

      const {
        ["other key service parameters"]: serviceParameters,
        ...payloadBase
      } = payload;

      const updated: FreightInformationResponse = {
        ...payloadBase,
        General: general,
        "Volume weight": volume,
        "Other key service parameters": serviceParameters,
      };

      shipments[goodsId] = updated;

      return HttpResponse.json(updated);
    },
  ),
];
