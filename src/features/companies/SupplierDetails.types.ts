export type SupplierTab =
  | "general"
  | "contract"
  | "tariff"
  | "instAgtselAllow"
  | "psInsBil"
  | "clmQualOthr";

export interface SupplierDetailsFormValues {
  // General
  companyType: string;
  owner: string;
  scanReference: string;
  companyId: string;
  gcId: string;
  status: string;
  companyName: string;
  country: string;
  address1: string;
  address2: string;
  address3: string;
  city: string;
  state: string;
  postalCode: string;
  telephoneCountryCode: string;
  telephone: string;
  faxCountryCode: string;
  faxNumber: string;
  email: string;
  billableAt: string;
  payeeCode: string;
  scac: string;
  isCostPlus: boolean;
  copyToDebtor: boolean;
  defaultCurrency: string;
  defaultLanguage: string;
  collectorCode: string;
  baId: string;
  bookingAgent: string;
  accountManager: string;
  opsContacts: string;
  isConsumer: boolean;
  clientProfileSpLink: string;

  // Inst-Agtsel-Allow
  moveInitiationFrom: string;
  moveRegistrationProcess: string;
  qualityFeedbackSurveyUsed: string;
  qualityApprovalProcess: string;
  exceptionAncillaryApprovalProcess: string;
  agentSelectionCriteria: string;
  anyLocationCriteria: string;
  locationSpecificCriteria: string;
  anyBannedAgent: string;
  bannedAgentList: string;
  numberOfMovePolicies: string;
  standardHousingAllowance: string;
  sitAllowances: string;
  petsApproved: string;
  firearmsApproved: string;
  frequentSpecialItemsApproved: string;

  // Ps-Ins-Bil
  permanentStorageAuthorized: string;
  psDetails: string;
  insuredBy: string;
  insuranceType: string;
  rateCriteria: string;
  insuranceCommissionPaid: string;
  insuranceProcess: string;
  billToId: string;
  billTo: string;
  billToLocation: string;
  billingTimeframes: string;
  billingAttachmentsNeeded: string;
  billingInformation: string;

  // Contract
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

export interface InvoiceAddressRow {
  debtorNumber: string;
  name: string;
  address: string;
  city: string;
  country: string;
  hr: string;
}