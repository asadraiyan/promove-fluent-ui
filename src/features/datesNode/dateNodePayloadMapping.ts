import { DateNodeFormValues } from "./datesNode.types";
import { SaveShipmentDatesPayload } from "./api/datesApi";

const toApiDate = (value: string | null | undefined): string | null => {
  if (!value || value.trim() === "") return null;

  return value;
};

export const mapFormValuesToShipmentDates = (
  values: DateNodeFormValues,
): SaveShipmentDatesPayload => ({
  origin: {
    shipmentCreationDate: toApiDate(values.shipmentCreationDate),
    customsDocumentReceivedDate: toApiDate(
      values.customsDocumentRecdDate,
    ),
    activationDate: toApiDate(values.activationDate),
    packStartDate: toApiDate(values.packStartDate),
    requestedPackDate: toApiDate(values.requestedPackDate),
    surveyDate: toApiDate(values.surveyDate),
    originSitInDate: toApiDate(values.originSITInDate),
    actualoriginSitoutDate: toApiDate(values.actualOriginSITOutDate),
    leftAgentDate: toApiDate(values.leftAgentDate),
    recdAtConsolidationWarehouseDate: toApiDate(
      values.recdAtConsolidationWarehouse,
    ),
    readyToGoAtAgentDate: toApiDate(values.readyToGoAtAgentDate),
    residencePickupDate: toApiDate(values.residencePickupDate),
    dpsReqPickUpDate: toApiDate(values.dpsReqPickUpDate),
    preferredSurveyDate: toApiDate(values.preferredSurveyDate),
    scheduledOriginSitoutDate: toApiDate(
      values.scheduledOriginSITOutDate,
    ),
    originFromDate: toApiDate(values.originFromDate),
    originToDate: toApiDate(values.originToDate),
    introCallDate: toApiDate(values.introCallDate),
    authorizationDate: toApiDate(values.authorizationDate),
    withdrawalDate: toApiDate(values.withdrawalDate),
    counselingDate: toApiDate(values.counselingDate),
    transshipmentInDate: toApiDate(values.transshipmentInDate),
    transshipmentoutDate: toApiDate(values.transshipmentOutDate),
    enquiryDate: toApiDate(values.enquiryDate),
  },

  freight: {
    origin: {
      scheduledDepartureDate: toApiDate(values.scheduledDepartureDate),
      actualDepartureDate: toApiDate(values.actualDepartureDate),
      bookHaulageDate: toApiDate(values.bookHaulageDate),
      documentCutoffDate: toApiDate(values.documentCutoffDate),
      bookContainerDate: toApiDate(values.bookContainerDate),
      dropEmptyContainerDate: toApiDate(values.dropEmptyContainerDate),
      etaAtOriginalPort: toApiDate(values.etaAtOriginPort),
      lastFreeDateAtOrigin: toApiDate(values.lastFreeDateAtOrigin),
      portCutoffDate: toApiDate(values.portCutOffDate),
      inlandCutoffDate: toApiDate(values.inlandCutOffDate),
    },

    destination: {
      scheduledArrivalDate: toApiDate(values.scheduledArrivalDate),
      actualArrivalDate: toApiDate(values.actualArrivalDate),
      freightReleaseDate: toApiDate(values.freightReleaseDate),
      lastFreeAtPort: toApiDate(values.lastFreeDateAtPort),
      lastFreeDateAtDestination: toApiDate(
        values.lastFreeDateAtDestination,
      ),
      dailyChargeSchedule: toApiDate(values.dailyChargeSchedule),
      dailyChargeAmount:
        values.dailyChargeAmount === "" ||
        values.dailyChargeAmount == null
          ? null
          : Number(values.dailyChargeAmount),
      outGateDate: toApiDate(values.outGateDate),
      inGateDate: toApiDate(values.inGateDate),
    },

    otherSit: {
      otherSitInDate: toApiDate(values.otherSITInDate),
      scheduledotherSitoutDate: toApiDate(values.schOtherOutDate),
      actualotherSitoutDate: toApiDate(values.actOtherSITOutDate),
      reason: values.reason || null,
      containerReturned: toApiDate(values.containerReturned),
    },
  },

  destination: {
    "quarantine InDate": toApiDate(values.quarantineInDate),
    quarantineOutDate: toApiDate(values.quarantineOutDate),
    customsClearanceDate: toApiDate(values.customsClearanceDate),
    arrivedAtAgentDate: toApiDate(values.arrivedAtAgentDate),
    destinationSitInDate: toApiDate(values.destinationSitInDate),
    scheduledDestSitoutDate: toApiDate(
      values.scheduledDestinationSitOutDate,
    ),
    actualDestinationSitoutDate: toApiDate(
      values.actualDestinationSitOutDate,
    ),
    offeredDeliveryDate: toApiDate(values.offeredDeliveryDate),
    scheduledDeliveryDate: toApiDate(values.scheduledDeliveryDate),
    requiredDeliveryDate: toApiDate(values.requiredDeliveryDate),
    readyToBillDate: toApiDate(values.readyToBillDate),
    partialDeliveryDate: toApiDate(values.partialDeliveryDate),
    fileClosedDate: toApiDate(values.fileClosedDate),
    actualDeliveryDate: toApiDate(values.actualDeliveryDate),
    arrivalDeliveryDate: toApiDate(values.arrivalDeliveryDate),
    auditDate: toApiDate(values.auditDate),
    readyToAuditDate: toApiDate(values.readyToAuditDate),
    readyToRebillDate: toApiDate(values.readyToRebillDate),
    billingDisputedDate: toApiDate(values.billingDisputedDate),
  },

  permStorage: {
    permStorageInDate: toApiDate(values.permStorageInDate),
    scheduledPermStorageOutDate: toApiDate(
      values.scheduledPermStorageOutDate,
    ),
    actualPermStorageOutDate: toApiDate(values.actualPermStorageOutDate),
    codConversionDate: toApiDate(values.codConversionDate),
  },
});