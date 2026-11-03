import {
  DestinationDatesResponse,
  FreightDatesResponse,
  OriginDatesResponse,
  PermStorageDatesResponse,
} from "./api/datesApi";
import type { ShipmentDatesResponse } from "./reducers/datesNodeSlice";
import { DateNodeFormValues } from "./datesNode.types";

type DateNodeFormUpdate = Partial<DateNodeFormValues>;

const toFormDate = (value: string | null | undefined): string =>
  value ? value.slice(0, 10) : "";

export const mapOriginDates = (
  dates: OriginDatesResponse,
): DateNodeFormUpdate => ({
  enquiryDate: toFormDate(dates.enquiryDate),
  authorizationDate: toFormDate(dates.authorizationDate),
  surveyDate: toFormDate(dates.surveyDate),
  requestedPackDate: toFormDate(dates.requestedPackDate),
  residencePickupDate: toFormDate(dates.residencePickupDate),
  readyToGoAtAgentDate: toFormDate(dates.readyToGoAtAgentDate),
  recdAtConsolidationWarehouse: toFormDate(
    dates.recdAtConsolidationWarehouseDate,
  ),
  scheduledOriginSITOutDate: toFormDate(dates.scheduledOriginSitoutDate),
  actualOriginSITOutDate: toFormDate(dates.actualoriginSitoutDate),
  withdrawalDate: toFormDate(dates.withdrawalDate),
  shipmentCreationDate: toFormDate(dates.shipmentCreationDate),
  preferredSurveyDate: toFormDate(dates.preferredSurveyDate),
  introCallDate: toFormDate(dates.introCallDate),
  dpsReqPickUpDate: toFormDate(dates.dpsReqPickUpDate),
  activationDate: toFormDate(dates.activationDate),
  packStartDate: toFormDate(dates.packStartDate),
  customsDocumentRecdDate: toFormDate(dates.customsDocumentReceivedDate),
  leftAgentDate: toFormDate(dates.leftAgentDate),
  originSITInDate: toFormDate(dates.originSitInDate),
  transshipmentInDate: toFormDate(dates.transshipmentInDate),
  transshipmentOutDate: toFormDate(dates.transshipmentoutDate),
  counselingDate: toFormDate(dates.counselingDate),
  originFromDate: toFormDate(dates.originFromDate),
  originToDate: toFormDate(dates.originToDate),
});

export const mapFreightDates = (
  dates: FreightDatesResponse,
): DateNodeFormUpdate => ({
  scheduledDepartureDate: toFormDate(dates.origin.scheduledDepartureDate),
  actualDepartureDate: toFormDate(dates.origin.actualDepartureDate),
  bookHaulageDate: toFormDate(dates.origin.bookHaulageDate),
  documentCutoffDate: toFormDate(dates.origin.documentCutoffDate),
  bookContainerDate: toFormDate(dates.origin.bookContainerDate),
  dropEmptyContainerDate: toFormDate(dates.origin.dropEmptyContainerDate),
  etaAtOriginPort: toFormDate(dates.origin.etaAtOriginalPort),
  lastFreeDateAtOrigin: toFormDate(dates.origin.lastFreeDateAtOrigin),
  portCutOffDate: toFormDate(dates.origin.portCutoffDate),
  inlandCutOffDate: toFormDate(dates.origin.inlandCutoffDate),
  scheduledArrivalDate: toFormDate(dates.destination.scheduledArrivalDate),
  freightReleaseDate: toFormDate(dates.destination.freightReleaseDate),
  dailyChargeSchedule: dates.destination.dailyChargeSchedule ?? "",
  dailyChargeAmount:
    dates.destination.dailyChargeAmount === null
      ? ""
      : String(dates.destination.dailyChargeAmount),
  actualArrivalDate: toFormDate(dates.destination.actualArrivalDate),
  lastFreeDateAtPort: toFormDate(dates.destination.lastFreeAtPort),
  lastFreeDateAtDestination: toFormDate(
    dates.destination.lastFreeDateAtDestination,
  ),
  outGateDate: toFormDate(dates.destination.outGateDate),
  inGateDate: toFormDate(dates.destination.inGateDate),
  otherSITInDate: toFormDate(dates.otherSit.otherSitInDate),
  schOtherOutDate: toFormDate(dates.otherSit.scheduledotherSitoutDate),
  actOtherSITOutDate: toFormDate(dates.otherSit.actualotherSitoutDate),
  reason: dates.otherSit.reason ?? "",
  containerReturned: toFormDate(dates.otherSit.containerReturned),
});

export const mapDestinationDates = (
  dates: DestinationDatesResponse,
): DateNodeFormUpdate => ({
  quarantineInDate: toFormDate(
    dates["quarantine InDate"] ?? dates.quarantineInDate,
  ),
  quarantineOutDate: toFormDate(dates.quarantineOutDate),
  customsClearanceDate: toFormDate(dates.customsClearanceDate),
  arrivedAtAgentDate: toFormDate(dates.arrivedAtAgentDate),
  destinationSitInDate: toFormDate(dates.destinationSitInDate),
  scheduledDestinationSitOutDate: toFormDate(dates.scheduledDestSitoutDate),
  actualDestinationSitOutDate: toFormDate(
    dates.actualDestinationSitoutDate,
  ),
  offeredDeliveryDate: toFormDate(dates.offeredDeliveryDate),
  scheduledDeliveryDate: toFormDate(dates.scheduledDeliveryDate),
  requiredDeliveryDate: toFormDate(dates.requiredDeliveryDate),
  readyToBillDate: toFormDate(dates.readyToBillDate),
  partialDeliveryDate: toFormDate(dates.partialDeliveryDate),
  fileClosedDate: toFormDate(dates.fileClosedDate),
  actualDeliveryDate: toFormDate(dates.actualDeliveryDate),
  arrivalDeliveryDate: toFormDate(dates.arrivalDeliveryDate),
  auditDate: toFormDate(dates.auditDate),
  readyToAuditDate: toFormDate(dates.readyToAuditDate),
  readyToRebillDate: toFormDate(dates.readyToRebillDate),
  billingDisputedDate: toFormDate(dates.billingDisputedDate),
});

export const mapPermStorageDates = (
  dates: PermStorageDatesResponse,
): DateNodeFormUpdate => ({
  permStorageInDate: toFormDate(dates.permStorageInDate),
  scheduledPermStorageOutDate: toFormDate(dates.scheduledPermStorageOutDate),
  actualPermStorageOutDate: toFormDate(dates.actualPermStorageOutDate),
  codConversionDate: toFormDate(dates.codConversionDate),
});

export const mapShipmentDates = (
  dates: ShipmentDatesResponse,
): DateNodeFormUpdate => ({
  ...mapOriginDates(dates.origin),
  ...mapFreightDates(dates.freight),
  ...mapDestinationDates(dates.destination),
  ...mapPermStorageDates(dates.permStorage),
});
