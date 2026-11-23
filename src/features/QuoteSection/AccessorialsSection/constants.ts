import { AccessorialDetailFormData, AccessorialRow } from "./types";

export const defaultAccessorialFormValues: AccessorialDetailFormData = {
  service: "",
  quantity: "",
  unitCostUsd: "",
  unitCostCurrency: "",
  overrideCurrency: "",
  fxRate: "",
  billedFrom: "",
  billedTo: "",
  totalCostUsd: "",
  optionalService: false,
};

export const serviceOptions = [
  {
    label: '80" and Larger TV Crate: Solid /Test - Electronics - ORGN',
    value: '80" and Larger TV Crate: Solid /Test - Electronics - ORGN',
  },
  {
    label: "Shuttle Service - Origin",
    value: "Shuttle Service - Origin",
  },
  {
    label: "Piano / Specialty Carry",
    value: "Piano / Specialty Carry",
  },
];

export const overrideCurrencyOptions = [
  { label: "USD", value: "USD" },
  { label: "EUR", value: "EUR" },
  { label: "GBP", value: "GBP" },
  { label: "CHF", value: "CHF" },
];

export const dummyAccessorialMetadata = {
  accessorialType: '80" and Larger TV Crate: Solid /Test - Electronics - ORGN',
  bucket: "ORGN",
  quantity: "1",
  unitCost: "100.00",
  totalCost: "100.00",
  creationDate: "11/19/2026",
  creationUser: "SystemUser",
  modificationDate: "11/19/2026",
  modificationUser: "SystemUser",
};

export const initialAccessorials: AccessorialRow[] = [
  {
    id: "1",
    accessorialType: '80" and Larger TV Crate: Solid /Test - Electronics - ORGN',
    bucket: "ORGN",
    quantity: "1",
    unitCost: "100.00",
    totalCost: "100.00",
    creationDate: "11/18/2026",
    creationUser: "AdminUser",
    modificationDate: "11/18/2026",
    modificationUser: "AdminUser",
    service: '80" and Larger TV Crate: Solid /Test - Electronics - ORGN',
    unitCostUsd: "100.00",
    unitCostCurrency: "100.00",
    overrideCurrency: "USD",
    fxRate: "1.0000",
    billedFrom: "2026-11-01",
    billedTo: "2026-11-30",
    totalCostUsd: "100.00",
    optionalService: false,
  },
];