export interface ServicePlanRow {
  id: string;
  serviceDescription: string;
  serviceOrigin: string;
  originState: string;
  originCountry: string;
  serviceDestination: string;
  destinationState: string;
  destinationCountry: string;
  code: string;
  agent: string;
  calculatedAmount: string;
  manualOverride: string;
  overrideCurrency?: string;
  amountInCurrency?: string;
  fxRate?: string;
}

export interface ServicePlanDetailFormData {
  service: string;
  originLocation: string;
  originState: string;
  originCountry: string;
  manualOverrideUsd: string;
  overrideCurrency: string;
  agent: string;
  destinationLocation: string;
  destinationState: string;
  destinationCountry: string;
  amountInCurrency: string;
  fxRate: string;
}
