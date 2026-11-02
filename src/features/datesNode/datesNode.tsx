import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { FormProvider, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import Destination from "./components/Destination";
import PermStorage from "./components/PermStorage";
import { Origin } from "./components/Origin";
import { Freight } from "./components/Fright";
import { loadShipmentDates } from "./reducers/datesNodeSlice";
import { mapShipmentDates } from "./dateNodeFormMapping";
import { DateNodeFormValues } from "./datesNode.types";

export interface DatesNodeGoodsIds {
  origin: number;
  freight: number;
  destination: number;
  permStorage: number;
}

const DEFAULT_GOODS_IDS: DatesNodeGoodsIds = {
  origin: 482924,
  freight: 149115,
  destination: 149115,
  permStorage: 149115,
};

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

const DEFAULT_DATE_VALUES: DateNodeFormValues = {
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
  counselingDate: "",
  originFromDate: "",
  originToDate: "",
  
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

interface DatesNodeProps {
  goodsIds?: Partial<DatesNodeGoodsIds>;
}

const DatesNode: React.FC<DatesNodeProps> = ({ goodsIds = {} }) => {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const methods = useForm<DateNodeFormValues>({
    defaultValues: DEFAULT_DATE_VALUES,
  });
  const { status, error } = useAppSelector((state) => state.datesNode);
  const originGoodsId = goodsIds.origin ?? DEFAULT_GOODS_IDS.origin;
  const freightGoodsId = goodsIds.freight ?? DEFAULT_GOODS_IDS.freight;
  const destinationGoodsId =
    goodsIds.destination ?? DEFAULT_GOODS_IDS.destination;
  const permStorageGoodsId =
    goodsIds.permStorage ?? DEFAULT_GOODS_IDS.permStorage;

  React.useEffect(() => {
    let isCurrent = true;

    const loadDates = async () => {
      const result = await dispatch(
        loadShipmentDates({
          origin: originGoodsId,
          freight: freightGoodsId,
          destination: destinationGoodsId,
          permStorage: permStorageGoodsId,
        }),
      );

      if (!isCurrent || !loadShipmentDates.fulfilled.match(result)) return;

      const updates = mapShipmentDates(result.payload);
      (Object.keys(updates) as Array<keyof DateNodeFormValues>).forEach(
        (field) => {
          methods.setValue(field, updates[field] ?? "");
        },
      );
    };

    void loadDates();

    return () => {
      isCurrent = false;
    };
  }, [
    dispatch,
    methods.setValue,
    originGoodsId,
    freightGoodsId,
    destinationGoodsId,
    permStorageGoodsId,
  ]);

  return (
    <FormProvider {...methods}>
      <div className={styles.root}>
        <h2>Dates Node</h2>
        {status === "loading" && (
          <div role="status">Loading shipment dates...</div>
        )}
        {error && <div role="alert">{error}</div>}
        <Origin />
        <Freight />
        <Destination />
        <PermStorage />
      </div>
    </FormProvider>
  );
};

export default DatesNode;
