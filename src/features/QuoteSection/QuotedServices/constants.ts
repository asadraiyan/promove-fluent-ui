import React from "react";
import { Checkbox, type GridColumnDef } from "@/shared";
import {
  type QuotedServiceFormData,
  type QuotedServiceRow,
  type QuotedTariffRow,
} from "./types";

export const defaultQuotedServiceFormValues: QuotedServiceFormData = {
  service: "",
  originLocation: "",
  originState: "",
  originCountry: "",
  manualOverrideUsd: "",
  amountInCurrency: "",
  containerType: "",
  agent: "",
  destinationLocation: "",
  destinationState: "",
  destinationCountry: "",
  calculatedAmount: "",
  overrideCurrency: "",
  fxRate: "",
};

export const serviceOptions = [
  { label: "(WA) Water/Air", value: "(WA) Water/Air" },
  { label: "(DP) Destination Port Service", value: "(DP) Destination Port Service" },
  { label: "(DI) Destination Inland", value: "(DI) Destination Inland" },
  { label: "(DA) Destination Agent", value: "(DA) Destination Agent" },
];

export const currencyOptions = [
  { label: "US Dollar", value: "USD" },
  { label: "Euro", value: "EUR" },
  { label: "British Pound", value: "GBP" },
  { label: "Swiss Franc", value: "CHF" },
];

export const containerTypeOptions = [
  { label: "20 ft", value: "20 ft" },
  { label: "40 ft", value: "40 ft" },
  { label: "40 ft High Cube", value: "40 ft High Cube" },
  { label: "45 ft", value: "45 ft" },
];

export const initialQuotedServices: QuotedServiceRow[] = [
  {
    id: "quoted-service-water-air",
    serviceDescription: "(WA) Water/Air",
    serviceOrigin: "",
    originState: "",
    originCountry: "",
    serviceDestination: "",
    destinationState: "",
    destinationCountry: "",
    code: "",
    agent: "",
    calculatedAmount: "0.00",
    manualOverrideUsd: "",
    amountInCurrency: "",
    overrideCurrency: "",
    fxRate: "",
    containerType: "",
    tariffAmount: "",
    tariff: "",
    vendor: "",
  },
  {
    id: "quoted-service-destination-port",
    serviceDescription: "(DP) Destination Port Service",
    serviceOrigin: "",
    originState: "",
    originCountry: "",
    serviceDestination: "",
    destinationState: "",
    destinationCountry: "",
    code: "",
    agent: "",
    calculatedAmount: "0.00",
    manualOverrideUsd: "",
    amountInCurrency: "",
    overrideCurrency: "",
    fxRate: "",
    containerType: "",
    tariffAmount: "",
    tariff: "",
    vendor: "",
  },
  {
    id: "quoted-service-destination-inland",
    serviceDescription: "(DI) Destination Inland",
    serviceOrigin: "",
    originState: "",
    originCountry: "",
    serviceDestination: "",
    destinationState: "",
    destinationCountry: "",
    code: "",
    agent: "",
    calculatedAmount: "0.00",
    manualOverrideUsd: "",
    amountInCurrency: "",
    overrideCurrency: "",
    fxRate: "",
    containerType: "",
    tariffAmount: "",
    tariff: "",
    vendor: "",
  },
  {
    id: "quoted-service-destination-agent",
    serviceDescription: "(DA) Destination Agent",
    serviceOrigin: "",
    originState: "",
    originCountry: "",
    serviceDestination: "",
    destinationState: "",
    destinationCountry: "",
    code: "",
    agent: "",
    calculatedAmount: "0.00",
    manualOverrideUsd: "",
    amountInCurrency: "",
    overrideCurrency: "",
    fxRate: "",
    containerType: "",
    tariffAmount: "",
    tariff: "",
    vendor: "",
  },
];

export const initialQuotedTariffs: QuotedTariffRow[] = [
  {
    id: "clear-tariff",
    amount: "0.00",
    tariff: "Clear Tariff",
    vendor: "",
    pick: false,
  },
];

export const quotedServiceColumns: GridColumnDef<QuotedServiceRow>[] = [
  { key: "serviceDescription", label: "Service Description", minWidth: 200 },
  { key: "serviceOrigin", label: "Service Origin", minWidth: 150 },
  { key: "originState", label: "State", minWidth: 100 },
  { key: "originCountry", label: "Country", minWidth: 120 },
  { key: "serviceDestination", label: "Service Destination", minWidth: 170 },
  { key: "destinationState", label: "State", minWidth: 100 },
  { key: "destinationCountry", label: "Country", minWidth: 120 },
  { key: "code", label: "Code", minWidth: 100 },
  { key: "agent", label: "Agent", minWidth: 150 },
  { key: "calculatedAmount", label: "Calculated Amount", minWidth: 150 },
  { key: "manualOverrideUsd", label: "Manual Override (USD)", minWidth: 160 },
];

export const createQuotedTariffColumns = (
  onPickTariff: (id: string, checked: boolean) => void,
): GridColumnDef<QuotedTariffRow>[] => [
  { key: "amount", label: "Amount", minWidth: 130 },
  { key: "tariff", label: "Tariff", minWidth: 240 },
  { key: "vendor", label: "Vendor", minWidth: 240 },
  {
    key: "pick",
    label: "Pick",
    minWidth: 90,
    sortable: false,
    renderCell: (item) =>
      React.createElement(Checkbox, {
        checked: item.pick,
        "aria-label": `Pick ${item.tariff}`,
        onChange: (_, data) => onPickTariff(item.id, Boolean(data.checked)),
      }),
  },
];
