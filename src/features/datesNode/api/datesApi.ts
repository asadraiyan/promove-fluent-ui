import { getApiUrl } from "@/api/config";

export type ApiDate = string | null;

export interface OriginDatesResponse {
  shipmentCreationDate: ApiDate;
  customsDocumentReceivedDate: ApiDate;
  activationDate: ApiDate;
  packStartDate: ApiDate;
  requestedPackDate: ApiDate;
  surveyDate: ApiDate;
  originSitInDate: ApiDate;
  actualoriginSitoutDate: ApiDate;
  leftAgentDate: ApiDate;
  recdAtConsolidationWarehouseDate: ApiDate;
  readyToGoAtAgentDate: ApiDate;
  residencePickupDate: ApiDate;
  dpsReqPickUpDate: ApiDate;
  preferredSurveyDate: ApiDate;
  scheduledOriginSitoutDate: ApiDate;
  originFromDate: ApiDate;
  originToDate: ApiDate;
  introCallDate: ApiDate;
  authorizationDate: ApiDate;
  withdrawalDate: ApiDate;
  counselingDate: ApiDate;
  transshipmentInDate: ApiDate;
  transshipmentoutDate: ApiDate;
  enquiryDate: ApiDate;
}

export interface FreightDatesResponse {
  origin: {
    scheduledDepartureDate: ApiDate;
    actualDepartureDate: ApiDate;
    bookHaulageDate: ApiDate;
    documentCutoffDate: ApiDate;
    bookContainerDate: ApiDate;
    dropEmptyContainerDate: ApiDate;
    etaAtOriginalPort: ApiDate;
    lastFreeDateAtOrigin: ApiDate;
    portCutoffDate: ApiDate;
    inlandCutoffDate: ApiDate;
  };
  destination: {
    scheduledArrivalDate: ApiDate;
    actualArrivalDate: ApiDate;
    freightReleaseDate: ApiDate;
    lastFreeAtPort: ApiDate;
    lastFreeDateAtDestination: ApiDate;
    dailyChargeSchedule: string | null;
    dailyChargeAmount: number | null;
    outGateDate: ApiDate;
    inGateDate: ApiDate;
  };
  otherSit: {
    otherSitInDate: ApiDate;
    scheduledotherSitoutDate: ApiDate;
    actualotherSitoutDate: ApiDate;
    reason: string | null;
    containerReturned: ApiDate;
  };
}

export interface DestinationDatesResponse {
  "quarantine InDate"?: ApiDate;
  quarantineInDate?: ApiDate;
  quarantineOutDate: ApiDate;
  customsClearanceDate: ApiDate;
  arrivedAtAgentDate: ApiDate;
  destinationSitInDate: ApiDate;
  scheduledDestSitoutDate: ApiDate;
  actualDestinationSitoutDate: ApiDate;
  offeredDeliveryDate: ApiDate;
  scheduledDeliveryDate: ApiDate;
  requiredDeliveryDate: ApiDate;
  readyToBillDate: ApiDate;
  partialDeliveryDate: ApiDate;
  fileClosedDate: ApiDate;
  actualDeliveryDate: ApiDate;
  arrivalDeliveryDate: ApiDate;
  auditDate: ApiDate;
  readyToAuditDate: ApiDate;
  readyToRebillDate: ApiDate;
  billingDisputedDate: ApiDate;
}

export interface PermStorageDatesResponse {
  permStorageInDate: ApiDate;
  scheduledPermStorageOutDate: ApiDate;
  actualPermStorageOutDate: ApiDate;
  codConversionDate: ApiDate;
}

export interface SaveShipmentDatesPayload {
  origin: OriginDatesResponse;
  freight: FreightDatesResponse;
  destination: DestinationDatesResponse;
  permStorage: PermStorageDatesResponse;
}

export interface SaveShipmentDatesResponse {
  goodsId: number;
}

export const fetchShipmentDates = async <T>(
  goodsId: number,
  resource: string,
  resourceLabel: string,
): Promise<T> => {
  const response = await fetch(
    getApiUrl(
      `/api/shipments/${encodeURIComponent(goodsId)}/${resource}`,
    ),
  );
  if (!response.ok) {
    throw new Error(`Unable to load ${resourceLabel} (${response.status}).`);
  }

  return (await response.json()) as T;
};

export const saveShipmentDates = async (
  goodsId: number,
  payload: SaveShipmentDatesPayload,
): Promise<SaveShipmentDatesResponse> => {
  const response = await fetch(
    getApiUrl(
      `/api/shipments/${encodeURIComponent(goodsId)}/dates`,
    ),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    throw new Error(
      `Unable to save shipment dates (${response.status}).`,
    );
  }

  return (await response.json()) as SaveShipmentDatesResponse;
};
