import type { GridColumnDef } from "@/shared/components/Table/ModalTable";
import type {
  InvoiceDetails,
  InvoiceLineRow,
  InvoiceRow,
  UninvoicedRevenueLineRow,
} from "./Invoicing.types";

export const EMPTY_INVOICE_DETAILS: InvoiceDetails = {
  uninvoicedRevenue: "0.00",
  invoiceNumber: "",
  scanReference: "",
  paymentTerms: "",
  currency: "",
  vatCurrency: "",
  invoiceMode: "",
  serviceDescription: "",
  invoiceDate: "",
  agentStatementReference: "",
  dueDate: "",
  exchangeRate: "",
  vatExchangeRate: "",
  invoiceAddressName: "",
  attentionTitle: "",
  attentionName: "",
  invoiceAddress: "",
  vatRegistrationNumber: "",
  language: "",
  comments: "",
  vat: "",
};

export const INVOICE_COLUMNS: GridColumnDef<InvoiceRow>[] = [
  { key: "invoiceNumber", label: "Inv number" },
  { key: "date", label: "Date" },
  { key: "debtor", label: "Debtor" },
  { key: "address", label: "Address" },
  { key: "amountExcludingTax", label: "Amount (excl Tax)" },
  { key: "amountIncludingTax", label: "Amount (incl Tax)" },
  { key: "printed", label: "Printed" },
];

export const INVOICE_LINE_COLUMNS: GridColumnDef<InvoiceLineRow>[] = [
  { key: "fileReference", label: "File Ref" },
  { key: "billTo", label: "Bill To" },
  { key: "partyCode", label: "Code of Party" },
  { key: "revenueCode", label: "Rev C" },
  { key: "description", label: "Description" },
  { key: "amount", label: "Amount" },
  { key: "vat", label: "Vat" },
  { key: "vatAmount", label: "Vat Amount" },
  { key: "sumVat", label: "Sum Vat" },
];

export const UNINVOICED_REVENUE_LINE_COLUMNS: GridColumnDef<UninvoicedRevenueLineRow>[] =
  [
    { key: "fileReference", label: "File Ref" },
    { key: "product", label: "Product" },
    { key: "revenueCode", label: "Rev Code" },
    { key: "description", label: "Description" },
    { key: "amount", label: "Amount" },
    { key: "vat", label: "Vat" },
    { key: "vatAmount", label: "Vat Amount" },
    { key: "sumVat", label: "Sum Vat" },
  ];

export const CURRENCY_OPTIONS = [
  { value: "usd", label: "USD" },
  { value: "eur", label: "EUR" },
  { value: "gbp", label: "GBP" },
];

export const INVOICE_MODE_OPTIONS = [
  { value: "standard", label: "Standard" },
  { value: "consolidated", label: "Consolidated" },
];

export const ATTENTION_TITLE_OPTIONS = [
  { value: "mr", label: "Mr" },
  { value: "mrs", label: "Mrs" },
  { value: "ms", label: "Ms" },
];

export const LANGUAGE_OPTIONS = [
  { value: "english", label: "English" },
  { value: "dutch", label: "Dutch" },
];

export const VAT_OPTIONS = [
  { value: "standard", label: "Standard" },
  { value: "zero", label: "Zero" },
  { value: "exempt", label: "Exempt" },
];
