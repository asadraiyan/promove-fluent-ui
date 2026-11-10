
import { http, HttpResponse } from "msw";
import { getApiUrl } from "../../../api/config";

import {
  FreightInformationPayload,
  FreightInformationResponse,
} from "@/features/FreightInformation/api/freightInformationApi";

import freightDropdownsData from "../../data/freightInformationData/freightDropdowns.json";
import freightInformationData from "../../data/freightInformationData/freightInformation.json";
import agentDetailsData from "../../data/freightInformationData/agentDetails.json";
import portEntryData from "../../data/freightInformationData/portEntry.json";
import type { FreightLookupRecord } from "@/features/FreightInformation/api/freightInformationApi";

const dropdowns = freightDropdownsData;

const freightInformation =
  freightInformationData as FreightInformationResponse;
const agentDetails = agentDetailsData as FreightLookupRecord[];
const portEntries = portEntryData as FreightLookupRecord[];

const shipments: Record<string, FreightInformationResponse> = {
  "89": freightInformation,
};

export const freightInformationHandlers = [
  http.get(
    getApiUrl(
      "/api/shipments/freight-information/lookups/:lookupType",
    ),
    ({ params, request }) => {
      const lookupType = String(params.lookupType);
      if (
        lookupType !== "agent" &&
        lookupType !== "seaport" &&
        lookupType !== "airport"
      ) {
        return HttpResponse.json(
          { message: `Unsupported lookup type: ${lookupType}.` },
          { status: 400 },
        );
      }

      const requestUrl = new URL(request.url);
      const search = requestUrl.searchParams.get("search")?.trim().toLowerCase();
      const records =
        lookupType === "agent"
          ? agentDetails
          : lookupType === "seaport"
            ? portEntries
            : [];
      const results = search
        ? records.filter((record) =>
            Object.values(record).some((value) =>
              value?.toLowerCase().includes(search),
            ),
          )
        : records;

      return HttpResponse.json(results);
    },
  ),

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
