import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { FormProvider, useForm } from "react-hook-form";
import Destination from "./components/Destination";
import PermStorage from "./components/PermStorage";
import { Origin } from "./components/Origin";
import { Freight } from "./components/Fright";


const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    boxSizing: "border-box",
    width: "calc(100% - 32px)",
    maxWidth: "1400px",
    margin: "24px auto",
  },
});

const DEFAULT_DATE_VALUES = {
  quarantineInDate: "",
  customsClearanceDate: "",
  destinationSitInDate: "",
  scheduledDestinationSitOutDate: "",
  offeredDeliveryDate: "",
  requiredDeliveryDate: "",
  partialDeliveryDate: "",
  actualDeliveryDate: "",
  auditDate: "",
  quarantineOutDate: "",
  arrivedAtAgentDate: "",
  actualDestinationSitOutDate: "",
  scheduledDeliveryDate: "",
  readyToBillDate: "",
  fileClosedDate: "",
  arrivalDeliveryDate: "",
  readyToAuditDate: "",
  readyToRebillDate: "",
  billingDisputedDate: "",
  permStorageInDate: "",
  scheduledPermStorageOutDate: "",
  codConversionDate: "",
  actualPermStorageOutDate: "",

  enquiryDate: "",
  authorizationDate:"",
  surveyDate: "",
  requestedPackDate: "",
  residencePickupDate: "",
  readyToGoAtAgentDate: "",
  recdAtConsolidationWarehouse: "",
  scheduledOriginSITOutDate: "",
  actualOriginSITOutDate: "",
  withdrawalDate: "",
  shipmentCreationDate: "",
  preferredSurveyDate: "",
  introCallDate: "",
  dpsReqPickUpDate: "",
  activationDate: "",
  packStartDate: "",
  customsDocumentRecdDate: "",
  leftAgentDate: "",
  originSITInDate: "",
  transshipmentInDate: "",
  transshipmentOutDate: "",
  
  scheduledDepartureDate: "",
  bookHaulageDate: "",
  bookContainerDate: "",
  etaAtOriginPort: "",
  portCutOffDate: "",
  actualDepartureDate: "",
  documentCutoffDate: "",
  dropEmptyContainerDate: "",
  lastFreeDateAtOrigin: "",
  inlandCutOffDate: "",
  otherSITInDate: "",
  schOtherOutDate: "",
  actOtherSITOutDate: "",
  reason: "",
  containerReturned: "",
  scheduledArrivalDate: "",
  freightReleaseDate: "",
  dailyChargeSchedule: "",
  dailyChargeAmount: "",
  actualArrivalDate: "",
  lastFreeDateAtPort: "",
  lastFreeDateAtDestination: "",
  outGateDate: "",
  inGateDate:"",
};

const DatesNode: React.FC = () => {
  const styles = useStyles();
  const methods = useForm({ defaultValues: DEFAULT_DATE_VALUES });

  return (
    <FormProvider {...methods}>
      <div className={styles.root}>
      <h2>Dates Node</h2>
        <Origin />
        <Freight />
        <Destination />
        <PermStorage />
      </div>
    </FormProvider>
  );
};

export default DatesNode;

