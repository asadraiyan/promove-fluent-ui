export interface DebtorsFormData {
  // Header Section
  topOwner?: string;
  topName?: string;
  topRefNumber?: string;
  topRefNumber2?: string;
  includeBlockeds?: boolean;
  owner?: string;
  private?: string;
  refNumber?: string;
  debtorType?: string;
  refNumber2?: string;
  status?: string;

  // Name and Address Section
  title?: string;
  surname?: string;
  middleName?: string;
  firstName?: string;
  country?: string;
  address1?: string;
  address2?: string;
  address3?: string;
  city?: string;
  stateCounty?: string;
  postalCode?: string;
  telephone?: string;
  fax?: string;
  email?: string;

  // VAT Registration Section
  vatRegistration?: string;
  vatNumber?: string;
  vatRegistrationNumber?: string;
  dunsNumber?: string;
  invoicePrintMode?: string;
  collectionMode?: string;
  termsOfPayment?: string;
  defaultCurrency?: string;
  fxEffectiveDate?: string;
  defaultLanguage?: string;
  invoiceNote?: string;

  // Payment Terms Section
  paymentTerms?: string;
  accountTypeAnalysisCode?: string;
  vendorPaymentStatus?: string;
  vendorPaymentMethod?: string;
  vendorPaymentCurrency?: string;
  tinNumber?: string;
  ssn?: string;
  notes?: string;
  withHolding?: boolean;

  // Contact Section
  contactTitle?: string;
  contactName?: string;
  contactEmail?: string;
  contactTel?: string;
  contactMobile?: string;

  // SUN Specifics Section
  lookupCode?: string;
  accountGroupParent?: string;

  // Location and Search Keys Section
  searchKeys?: string;
  directDebit?: boolean;
  locations?: string;
  allowPriceIncrease?: boolean;
}
