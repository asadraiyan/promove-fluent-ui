export interface AccessorialRow {
  id: string;
  accessorialType: string;
  bucket: string;
  quantity: string;
  unitCost: string;
  totalCost: string;
  creationDate: string;
  creationUser: string;
  modificationDate: string;
  modificationUser: string;
  // Extra detail fields so selecting/editing a row can populate the form if needed
  service?: string;
  unitCostUsd?: string;
  unitCostCurrency?: string;
  overrideCurrency?: string;
  fxRate?: string;
  billedFrom?: string;
  billedTo?: string;
  totalCostUsd?: string;
  optionalService?: boolean;
}

export interface AccessorialDetailFormData {
  service: string;
  quantity: string;
  unitCostUsd: string;
  unitCostCurrency: string;
  overrideCurrency: string;
  fxRate: string;
  billedFrom: string;
  billedTo: string;
  totalCostUsd: string;
  optionalService: boolean;
}