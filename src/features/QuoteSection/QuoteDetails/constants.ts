import { QuoteFormValues } from "./quoteDetails.types";

export const EMPTY_QUOTE_FORM: QuoteFormValues = {
  quoteNumber: "20241000004-1",
  promoveNumber: "",
  bookingAgentSummary: "Sirva Move Management",
  jobSummary: "HHGS-EXPORT-FCL-LOOSE-D/D-CIVILIAN",
  status: "Pending Quote",
  clientName: "Robert Lansing",
  accountName: "SIRVA / Schlumberger",
  gcNumber: "",
  summaryWeight: "0.00",
  summaryVolume: "0.00",
  originSummary: "San Francisco, CA, US",
  destinationSummary: "Paris, FR",
  bookingAgent: "Sirva Move Management",
  brand: "allied",
  surveyType: "",
  corporateAccount: "SIRVA / Schlumberger",
  firstName: "Robert",
  lastName: "Lansing",
  originLocation: "San Francisco",
  originState: "California",
  originCountry: "United States of America",
  pickupAddress1: "",
  pickupAddress2: "",
  originZipCode: "",
  originPhoneHome: "",
  originAgent: "",
  destinationLocation: "Paris",
  destinationState: "",
  destinationCountry: "France",
  deliveryAddress1: "",
  deliveryAddress2: "",
  destinationZipCode: "",
  destinationPhoneHome: "",
  destinationAgent: "",
  jobType: "HHGS-EXPORT-FCL-LOOSE-D/D-CIVILIAN",
  containerType: "20ft",
  fclDrayageOptions: "drop-pick",
  currency: "usd",
  measurementSystem: "imperial",
  netWeight: "0.0",
  netVolume: "0.0",
  imperialDensity: "6.50",
  metricVolume: "0.00",
  moveAwardDate: "",
  weightNetLbs: "0.00",
  weightGrossLbs: "0.00",
  weightNetKg: "0.00",
  weightGrossKg: "0.00",
  volumeNetCuft: "0.00",
  volumeGrossCuft: "0.00",
  volumeNetM3: "0.00",
  volumeGrossM3: "0.00",
  totalDensity: "0.00000",
};

export const QUOTE_LEAD_OPTIONS = [
  { value: "find-quotes", label: "Find Quotes" },
  { value: "find-leads", label: "Find Leads" },
];

export const QUOTE_RAISED_BY_OPTIONS = [
  { value: "aaron-thompson", label: "Aaron Thompson (1)" },
  { value: "jordan-lee", label: "Jordan Lee" },
];

export const BRAND_OPTIONS = [
  { value: "allied", label: "Allied" },
  { value: "north-american", label: "North American" },
  { value: "sirva", label: "SIRVA" },
];

export const SURVEY_TYPE_OPTIONS = [
  { value: "in-home", label: "In-home" },
  { value: "virtual", label: "Virtual" },
  { value: "self-survey", label: "Self survey" },
];

export const CONTAINER_TYPE_OPTIONS = [
  { value: "20ft", label: "20ft general purpose container" },
  { value: "40ft", label: "40ft general purpose container" },
  { value: "40ft-high-cube", label: "40ft high-cube container" },
];

export const FCL_DRAYAGE_OPTIONS = [
  { value: "drop-pick", label: "Only Drop and Pick" },
  { value: "live-load", label: "Live load and unload" },
  { value: "drop-live", label: "Drop and live load" },
];

export const CURRENCY_OPTIONS = [
  { value: "usd", label: "US Dollar" },
  { value: "eur", label: "Euro" },
  { value: "gbp", label: "Pound Sterling" },
];

export const MEASUREMENT_SYSTEM_OPTIONS = [
  { value: "imperial", label: "Imperial" },
  { value: "metric", label: "Metric" },
  { value: "db", label: "DB" },
];
