import type { SupplierDetailsFormValues, TabItem } from "./SupplierDetails.types";

export const SUPPLIER_TABS: TabItem[] = [
  { key: "general", label: "General" },
  { key: "contract", label: "Contract" },
  { key: "tariff", label: "Tariff" },
  { key: "instAgtselAllow", label: "Inst-Agtsel-Allow" },
  { key: "psInsBil", label: "Ps-Ins-Bil" },
  { key: "clmQualOthr", label: "Clm-Qual-Othr" },
];

export const EMPTY_SUPPLIER_DETAILS: SupplierDetailsFormValues = {
  enquiryRemark: "",
  poNumberRequired: false,
  invoiceServiceDescription: "",
  alwaysPrintRegionAddress: "",
  invoicingRestrictedBySecurity: false,
  invoiceActionAssignedTo: "",
  insuranceAllowance: false,
  fireInsuranceAllowance: "",
  insuranceRatePer1000: "",

  hasTariff: "",
  bookingCommission: "",
  locationDetails: "",
  pricingPreviousIssues: "",
  tariffDescription: "",

  claimInitiationProcess: "",
  claimHandledBy: "",
  sendFromGC: "",
  brand: "",
  additionalInformation: "",
};

export const YES_NO_OPTIONS = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

export const REGION_ADDRESS_OPTIONS = [
  { label: "North Region", value: "North Region" },
  { label: "South Region", value: "South Region" },
  { label: "East Region", value: "East Region" },
  { label: "West Region", value: "West Region" },
  { label: "Central Region", value: "Central Region" },
];

export const SEND_FROM_GC_OPTIONS = YES_NO_OPTIONS;

export const BRAND_OPTIONS = [
  { label: "Brand 1", value: "Brand 1" },
  { label: "Brand 2", value: "Brand 2" },
  { label: "Brand 3", value: "Brand 3" },
  { label: "Brand 4", value: "Brand 4" },
];