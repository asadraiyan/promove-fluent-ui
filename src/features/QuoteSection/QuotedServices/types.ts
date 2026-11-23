export interface QuotedServiceRow {
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
  manualOverrideUsd: string;
  amountInCurrency: string;
  overrideCurrency: string;
  fxRate: string;
  containerType: string;
  tariffAmount: string;
  tariff: string;
  vendor: string;
}

export interface QuotedServiceFormData {
  service: string;
  originLocation: string;
  originState: string;
  originCountry: string;
  manualOverrideUsd: string;
  amountInCurrency: string;
  containerType: string;
  agent: string;
  destinationLocation: string;
  destinationState: string;
  destinationCountry: string;
  calculatedAmount: string;
  overrideCurrency: string;
  fxRate: string;
}

export interface QuotedTariffRow {
  id: string;
  amount: string;
  tariff: string;
  vendor: string;
  pick: boolean;
}
