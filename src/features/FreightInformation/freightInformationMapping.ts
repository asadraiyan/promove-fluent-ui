import type { OverseasSummaryFormValues } from "./OverseasSummary.types";
import type {
  FreightInformationPayload,
  FreightInformationResponse,
} from "./api/freightInformationApi";
import { EMPTY_OVERSEAS_SUMMARY } from "./constants";

const read = (section: Record<string, string | null>, key: string): string =>
  section[key] ?? "";

const readBoolean = (
  section: Record<string, string | null>,
  key: string,
): boolean => read(section, key).toLowerCase() === "true";

const toNullable = (value: string): string | null => value || null;
const toApiBoolean = (value: boolean): string => (value ? "True" : "False");

export const mapFreightInformationToForm = (
  data: FreightInformationResponse,
): OverseasSummaryFormValues => {
  const general = data.General;
  const volume = data["Volume weight"];
  const account = data["Account Specific"];
  const service = data["Other key service parameters"];

  return {
    ...EMPTY_OVERSEAS_SUMMARY,
    serviceMode: data["Service Mode"].toLowerCase() as OverseasSummaryFormValues["serviceMode"],
    serviceCoordinator: data.SC ?? "",
    supportCoordinator: data.Support ?? "",
    billingCoordinator: data.Billing ?? "",
    controllingBranch: data["Controlling Branch"] ?? "",
    revenueBranch: data["Rev Branch"] ?? "",
    originAgent: read(general, "OA"),
    destinationAgent: read(general, "DA"),
    requiredThroughGc: read(general, "Req through GC"),
    cod: readBoolean(general, "COD"),
    amount: read(general, "Amt"),
    currency: read(general, "Currency"),
    spoc: readBoolean(general, "SPOC"),
    tradeLane: read(general, "Trade Lane"),
    freightLane: read(general, "Freight Lane"),
    vip: readBoolean(general, "VIP"),
    seaFlag: readBoolean(general, "SN Sea Flag"),
    partialAllowance: readBoolean(general, "Partial Allwnce"),
    confidential: readBoolean(general, "Confidential"),
    diplomaticDesignation: readBoolean(general, "Diplomatic Designation"),
    gbl: read(general, "GBL"),
    sitNumber: read(general, "SIT#"),
    origin: read(general, "Origin") || read(general, "origin"),
    authorizedWeight: read(volume, "Auth Weight"),
    billedWeight: read(volume, "Billed Weight"),
    specialWeight: read(volume, "Special Weight") || read(volume, "Special weight"),
    surveyWeight: read(volume, "Survey Weight"),
    partialDeliveryWeight: read(volume, "Partial Delivery Weight"),
    actualVolumeNetCft: read(volume, "Actual Vol cuft"),
    actualVolumeNetM3: read(volume, "Actual Vol M3"),
    actualWeightNetLbs: read(volume, "Actual Weight 1bs"),
    actualWeightNetKg: read(volume, "Actual Weight Kg"),
    actualVolumeDensity: read(volume, "Actual Density"),
    sitWeightNetLbs: read(volume, "SIT Weight 1lbs"),
    sitWeightNetKg: read(volume, "SIT Weight Kg"),
    permanentStorageNetLbs: read(volume, "Perm Storage Weight 1bs"),
    permanentStorageNetKg: read(volume, "Perm Storage Weight Kg"),
    costCenter: read(account, "Cost Center"),
    employeePersonnelNumber: read(account, "Employee Personnel No"),
    affiliateCode: read(account, "Affiliate Code"),
    entitledWeight: read(account, "Entitled Weight"),
    entitledWeightDescription: read(account, "Entitled Weight Description"),
    endingAssignmentDate: read(account, "Ending Assignment Date"),
    housingSpendableWaiver: readBoolean(account, "Housing Spendable Waiver"),
    housingSpendableWaiverDate: read(account, "Housing Spendable Waiver Date"),
    removalType: read(account, "Removal Type"),
    serviceType: read(service, "Service Type"),
    pricingType: read(service, "Pricing Type"),
    packingType: read(service, "Packing Type"),
    furnitureWrap: read(service, "Furniture Wrap"),
    shipmentMode: read(service, "Shipment Mode"),
    deliveryType: read(service, "Delivery Type"),
    commodityType: read(service, "Commodity Type"),
    workflow: read(service, "Workflow"),
    surveyType: read(service, "Survey Type"),
    shipmentOnHold: readBoolean(service, "Shipment On Hold"),
    shipmentHoldDate: read(service, "Shipment Hold Date"),
    shipmentHoldReason: read(service, "Shipment Hold Reason"),
  };
};

export const mapFormToFreightInformation = (
  values: OverseasSummaryFormValues,
  current: FreightInformationResponse,
): FreightInformationPayload => {
  const general = { ...current.General };
  const volume = { ...current["Volume weight"] };
  const account = { ...current["Account Specific"] };
  const service = { ...current["Other key service parameters"] };

  Object.assign(general, {
    OA: toNullable(values.originAgent),
    DA: toNullable(values.destinationAgent),
    "Req through GC": toNullable(values.requiredThroughGc),
    COD: toApiBoolean(values.cod),
    Amt: toNullable(values.amount),
    Currency: toNullable(values.currency),
    SPOC: toApiBoolean(values.spoc),
    "Trade Lane": toNullable(values.tradeLane),
    "Freight Lane": toNullable(values.freightLane),
    VIP: toApiBoolean(values.vip),
    "SN Sea Flag": toApiBoolean(values.seaFlag),
    "Partial Allwnce": toApiBoolean(values.partialAllowance),
    Confidential: toApiBoolean(values.confidential),
    "Diplomatic Designation": toApiBoolean(values.diplomaticDesignation),
    GBL: toNullable(values.gbl),
    "SIT#": toNullable(values.sitNumber),
    origin: toNullable(values.origin),
  });
  delete general.Origin;

  Object.assign(volume, {
    "Auth Weight": toNullable(values.authorizedWeight),
    "Billed Weight": toNullable(values.billedWeight),
    "Special weight": toNullable(values.specialWeight),
    "Survey Weight": toNullable(values.surveyWeight),
    "Partial Delivery Weight": toNullable(values.partialDeliveryWeight),
    "Actual Vol cuft": toNullable(values.actualVolumeNetCft),
    "Actual Vol M3": toNullable(values.actualVolumeNetM3),
    "Actual Weight 1bs": toNullable(values.actualWeightNetLbs),
    "Actual Weight Kg": toNullable(values.actualWeightNetKg),
    "Actual Density": toNullable(values.actualVolumeDensity),
    "SIT Weight 1lbs": toNullable(values.sitWeightNetLbs),
    "SIT Weight Kg": toNullable(values.sitWeightNetKg),
    "Perm Storage Weight 1bs": toNullable(values.permanentStorageNetLbs),
    "Perm Storage Weight Kg": toNullable(values.permanentStorageNetKg),
  });
  delete volume["Special Weight"];

  Object.assign(account, {
    "Cost Center": toNullable(values.costCenter),
    "Employee Personnel No": toNullable(values.employeePersonnelNumber),
    "Affiliate Code": toNullable(values.affiliateCode),
    "Entitled Weight": toNullable(values.entitledWeight),
    "Entitled Weight Description": toNullable(values.entitledWeightDescription),
    "Ending Assignment Date": toNullable(values.endingAssignmentDate),
    "Housing Spendable Waiver": toApiBoolean(values.housingSpendableWaiver),
    "Housing Spendable Waiver Date": toNullable(values.housingSpendableWaiverDate),
    "Removal Type": toNullable(values.removalType),
  });

  Object.assign(service, {
    "Pricing Type": toNullable(values.pricingType),
    "Packing Type": toNullable(values.packingType),
    "Furniture Wrap": toNullable(values.furnitureWrap),
    "Shipment Mode": toNullable(values.shipmentMode),
    "Delivery Type": toNullable(values.deliveryType),
    "Commodity Type": toNullable(values.commodityType),
    Workflow: toNullable(values.workflow),
    "Survey Type": toNullable(values.surveyType),
    "Shipment On Hold": toApiBoolean(values.shipmentOnHold),
    "Shipment Hold Date": toNullable(values.shipmentHoldDate),
    "Shipment Hold Reason": toNullable(values.shipmentHoldReason),
    "Service Type": toNullable(values.serviceType),
  });

  return {
    "Service Mode": values.serviceMode[0].toUpperCase() + values.serviceMode.slice(1),
    "Controlling Branch": toNullable(values.controllingBranch),
    "Rev Branch": toNullable(values.revenueBranch),
    SC: toNullable(values.serviceCoordinator),
    Support: toNullable(values.supportCoordinator),
    Billing: toNullable(values.billingCoordinator),
    General: general,
    "Volume weight": volume,
    "Account Specific": account,
    "other key service parameters": service,
    Transport: current.Transport,
  };
};
