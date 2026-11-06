export type SupplierTab =
  | "general"
  | "contract"
  | "tariff"
  | "instAgtselAllow"
  | "psInsBil"
  | "clmQualOthr";

export interface SupplierDetailsFormValues {
  // Ps-Ins-Bil
  enquiryRemark: string;
  poNumberRequired: boolean;
  invoiceServiceDescription: string;
  alwaysPrintRegionAddress: string;
  invoicingRestrictedBySecurity: boolean;
  invoiceActionAssignedTo: string;
  insuranceAllowance: boolean;
  fireInsuranceAllowance: string;
  insuranceRatePer1000: string;

  // Tariff
  hasTariff: string;
  bookingCommission: string;
  locationDetails: string;
  pricingPreviousIssues: string;
  tariffDescription: string;

  // Claims, Quality and Other
  claimInitiationProcess: string;
  claimHandledBy: string;
  sendFromGC: string;
  brand: string;
  additionalInformation: string;
}

export interface TabItem {
  key: SupplierTab;
  label: string;
}