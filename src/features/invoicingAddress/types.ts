export interface DropdownOption {
  label: string;
  value: string;
}

export interface ModalDropdownOptions {
  ownerOptions: DropdownOption[];
  statusOptions: DropdownOption[];
  privateOptions: DropdownOption[];
  debtorTypeOptions: DropdownOption[];
  vatRegistrationOptions: DropdownOption[];
  invoicePrintModeOptions: DropdownOption[];
  collectionModeOptions: DropdownOption[];
  termsOfPaymentOptions: DropdownOption[];
  defaultCurrencyOptions: DropdownOption[];
  fxEffectiveDateOptions: DropdownOption[];
  defaultLanguageOptions: DropdownOption[];
  countryOptions: DropdownOption[];
  stateOptions: DropdownOption[];
  titleOptions: DropdownOption[];
}

export interface InvoicingAddressData {
  accountAddresses: DropdownOption[];
  customerAddresses: DropdownOption[];
  addressDetails: InvoicingAddressDetailsFormValues;
  modalOptions: ModalDropdownOptions;
}

export interface MainFormValues {
  accountInvoicingAddress: string;
  customerInvoicingAddress: string;
}

export interface InvoicingAddressDetailsFormValues {
  owner: string;
  number: string;
  status: string;
  private: string;
  debtorType: string;
  name: string;
  namePart2: string;
  country: string;
  address1: string;
  address2: string;
  address3: string;
  city: string;
  stateCounty: string;
  postalCode: string;
  telephone: string;
  fax: string;
  email: string;
  vatRegistration: string;
  vatNumber: string;
  vatRegistrationNumber: string;
  dunsNumber: string;
  invoicePrintMode: string;
  collectionMode: string;
  termsOfPayment: string;
  defaultCurrency: string;
  fxEffectiveDate: string;
  defaultLanguage: string;
  invoiceRole: string;
  contactTitle: string;
  contactName: string;
  contactEmail: string;
  contactTel: string;
  contactMobile: string;
  contactFax: string;
  lookupCode: string;
  accountGroupParent: string;
  modificationUser: string;
  modificationDate: string;
}
