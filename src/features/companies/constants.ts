import { GridColumnDef } from "@/shared/components/Table/ModalTable";
import type { InvoiceAddressRow, SupplierDetailsFormValues, TabItem } from "./SupplierDetails.types";

export const SUPPLIER_TABS: TabItem[] = [
  { key: "general", label: "General" },
  { key: "contract", label: "Contract" },
  { key: "tariff", label: "Tariff" },
  { key: "instAgtselAllow", label: "Inst-Agtsel-Allow" },
  { key: "psInsBil", label: "Ps-Ins-Bil" },
  { key: "clmQualOthr", label: "Clm-Qual-Othr" },
];

export const EMPTY_SUPPLIER_DETAILS: SupplierDetailsFormValues = {
  companyType: "",
  owner: "",
  scanReference: "",
  companyId: "",
  gcId: "",
  status: "",
  companyName: "",
  country: "",
  address1: "",
  address2: "",
  address3: "",
  city: "",
  state: "",
  postalCode: "",
  telephoneCountryCode: "",
  telephone: "",
  faxCountryCode: "",
  faxNumber: "",
  email: "",
  billableAt: "",
  payeeCode: "",
  scac: "",
  isCostPlus: false,
  copyToDebtor: false,
  defaultCurrency: "",
  defaultLanguage: "",
  collectorCode: "",
  baId: "",
  bookingAgent: "",
  accountManager: "",
  opsContacts: "",
  isConsumer: false,
  clientProfileSpLink: "",

  moveInitiationFrom: "",
  moveRegistrationProcess: "",
  qualityFeedbackSurveyUsed: "",
  qualityApprovalProcess: "",
  exceptionAncillaryApprovalProcess: "",
  agentSelectionCriteria: "",
  anyLocationCriteria: "",
  locationSpecificCriteria: "",
  anyBannedAgent: "",
  bannedAgentList: "",
  numberOfMovePolicies: "",
  standardHousingAllowance: "",
  sitAllowances: "",
  petsApproved: "",
  firearmsApproved: "",
  frequentSpecialItemsApproved: "",

  permanentStorageAuthorized: "",
  psDetails: "",
  insuredBy: "",
  insuranceType: "",
  rateCriteria: "",
  insuranceCommissionPaid: "",
  insuranceProcess: "",
  billToId: "",
  billTo: "",
  billToLocation: "",
  billingTimeframes: "",
  billingAttachmentsNeeded: "",
  billingInformation: "",

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

export const COMPANY_TYPE_OPTIONS = [
  { label: "Corporate account", value: "Corporate account" },
  { label: "Branch", value: "Branch" },
  { label: "Individual", value: "Individual" },
];

export const OWNER_OPTIONS = [
  { label: "Allied International", value: "Allied International" },
  { label: "Global Relocation", value: "Global Relocation" },
];

export const COMPANY_STATUS_OPTIONS = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
];

export const BILLABLE_AT_OPTIONS = [
  { label: "Activation", value: "Activation" },
  { label: "Delivery", value: "Delivery" },
  { label: "Both", value: "Both" },
];

export const CURRENCY_OPTIONS = [
  { label: "USD", value: "USD" },
  { label: "EUR", value: "EUR" },
  { label: "GBP", value: "GBP" },
];

export const LANGUAGE_OPTIONS = [
  { label: "English", value: "English" },
  { label: "French", value: "French" },
  { label: "Spanish", value: "Spanish" },
];

export const MOVE_INITIATION_OPTIONS = [
  { label: "National Account", value: "National Account" },
  { label: "Local Office", value: "Local Office" },
];

export const MOVE_REGISTRATION_OPTIONS = [
  { label: "Booked", value: "Booked" },
  { label: "Registered", value: "Registered" },
];

export const INSURANCE_PROVIDER_OPTIONS = [
  { label: "Client", value: "Client" },
  { label: "Company", value: "Company" },
  { label: "Agent", value: "Agent" },
];

export const INSURANCE_TYPE_OPTIONS = [
  { label: "Full value", value: "Full value" },
  { label: "Limited liability", value: "Limited liability" },
];

export const invoiceAddresses: InvoiceAddressRow[] = [
  {
    debtorNumber: "117761",
    name: "3m Logistics",
    address: "P.O. Box 33225",
    city: "St. Paul",
    country: "US",
    hr: "",
  },
  {
    debtorNumber: "117762",
    name: "Allied International",
    address: "1000 Corporate Drive",
    city: "Chicago",
    country: "US",
    hr: "Yes",
  },
  {
    debtorNumber: "117763",
    name: "Global Relocation",
    address: "25 King Street",
    city: "London",
    country: "GB",
    hr: "",
  },
];

export const invoiceAddressColumns: GridColumnDef<InvoiceAddressRow>[] = [
  { key: "debtorNumber", label: "Debtor Nr" },
  { key: "name", label: "Name" },
  { key: "address", label: "Address" },
  { key: "city", label: "City" },
  { key: "country", label: "Country" },
  { key: "hr", label: "HR" },
];