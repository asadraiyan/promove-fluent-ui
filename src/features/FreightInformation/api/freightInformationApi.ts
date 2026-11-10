import { getApiUrl } from "@/api/config";

export type FreightMode = "air" | "sea" | "road";
export type FreightLookupType = "agent" | "seaport" | "airport";
export type FreightLookupRecord = Record<string, string | null>;

export interface FreightLookupQuery {
  search: string;
  ownerCode?: string | number;
  region?: string;
}

export interface FreightDropdownOption {
  value: string;
  label: string;
}

export interface FreightInformationDropdowns {
  mode: FreightMode;
  serviceTypes: FreightDropdownOption[];
  deliveryTypes: FreightDropdownOption[];
  removalTypes: FreightDropdownOption[];
  pricingTypes: FreightDropdownOption[];
  packingTypes: FreightDropdownOption[];
  furnitureWraps: FreightDropdownOption[];
  commodityTypes: FreightDropdownOption[];
  surveyTypes: FreightDropdownOption[];
  freightLanes: FreightDropdownOption[];
  salesCoordinators: FreightDropdownOption[];
  supportCoordinators: FreightDropdownOption[];
  controllingBranches: FreightDropdownOption[];
  workflows: FreightDropdownOption[];
  billing: FreightDropdownOption[];
}

export type FreightInformationSection = Record<string, string | null>;

export interface FreightInformationResponse {
  "Service Mode": string;
  "Controlling Branch": string | null;
  "Rev Branch": string | null;
  SC: string | null;
  Support: string | null;
  Billing: string | null;
  General: FreightInformationSection;
  "Volume weight": FreightInformationSection;
  "Account Specific": FreightInformationSection;
  "Other key service parameters": FreightInformationSection;
  Transport: FreightInformationSection | null;
}

export interface FreightInformationPayload
  extends Omit<FreightInformationResponse, "Other key service parameters"> {
  "other key service parameters": FreightInformationSection;
}

export interface FreightDropdownQuery {
  mode: FreightMode;
  companyId?: string | number;
  ownerCode?: string | number;
  addressId?: string | number;
}

const getErrorMessage = (response: Response, action: string) =>
  `${action} (${response.status}).`;

export const fetchFreightInformationDropdowns = async (
  query: FreightDropdownQuery,
): Promise<FreightInformationDropdowns> => {
  const search = new URLSearchParams({ mode: query.mode });
  if (query.companyId !== undefined) {
    search.set("companyId", String(query.companyId));
  }
  if (query.ownerCode !== undefined) {
    search.set("ownerCode", String(query.ownerCode));
  }
  if (query.addressId !== undefined) {
    search.set("addressId", String(query.addressId));
  }

  const response = await fetch(
    getApiUrl(`/api/shipments/freight-information/dropdowns?${search}`),
  );
  if (!response.ok) {
    throw new Error(getErrorMessage(response, "Unable to load freight dropdowns"));
  }

  return (await response.json()) as FreightInformationDropdowns;
};

export const fetchFreightInformation = async (
  goodsId: number,
): Promise<FreightInformationResponse> => {
  const response = await fetch(
    getApiUrl(`/api/shipments/${encodeURIComponent(goodsId)}/freight-information`),
  );
  if (!response.ok) {
    throw new Error(
      getErrorMessage(response, "Unable to load freight information"),
    );
  }

  return (await response.json()) as FreightInformationResponse;
};

export const fetchFreightLookup = async (
  lookupType: FreightLookupType,
  query: FreightLookupQuery,
): Promise<FreightLookupRecord[]> => {
  const search = new URLSearchParams({
    search: query.search,
    ownerCode: String(query.ownerCode ?? -1),
    region: query.region ?? "US",
  });
  const response = await fetch(
    getApiUrl(
      `/api/shipments/freight-information/lookups/${lookupType}?${search}`,
    ),
  );
  if (!response.ok) {
    throw new Error(getErrorMessage(response, "Unable to search freight lookups"));
  }

  return (await response.json()) as FreightLookupRecord[];
};

export const saveFreightInformation = async (
  goodsId: number,
  payload: FreightInformationPayload,
): Promise<FreightInformationResponse> => {
  const response = await fetch(
    getApiUrl(`/api/shipments/${encodeURIComponent(goodsId)}/freight-information`),
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );
  if (!response.ok) {
    throw new Error(
      getErrorMessage(response, "Unable to save freight information"),
    );
  }

  return (await response.json()) as FreightInformationResponse;
};
