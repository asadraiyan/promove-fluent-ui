export interface InvoiceDetails extends Record<string, string> {
  uninvoicedRevenue: string;
  invoiceNumber: string;
  scanReference: string;
  paymentTerms: string;
  currency: string;
  vatCurrency: string;
  invoiceMode: string;
  serviceDescription: string;
  invoiceDate: string;
  agentStatementReference: string;
  dueDate: string;
  exchangeRate: string;
  vatExchangeRate: string;
  invoiceAddressName: string;
  attentionTitle: string;
  attentionName: string;
  invoiceAddress: string;
  vatRegistrationNumber: string;
  language: string;
  comments: string;
  vat: string;
}

export interface InvoiceRow extends Record<string, string> {
  id: string;
  invoiceNumber: string;
  date: string;
  debtor: string;
  address: string;
  amountExcludingTax: string;
  amountIncludingTax: string;
  printed: string;
}

export interface InvoiceLineRow extends Record<string, string> {
  id: string;
  fileReference: string;
  billTo: string;
  partyCode: string;
  revenueCode: string;
  description: string;
  amount: string;
  vat: string;
  vatAmount: string;
  sumVat: string;
}

export interface UninvoicedRevenueLineRow extends Record<string, string> {
  id: string;
  fileReference: string;
  product: string;
  revenueCode: string;
  description: string;
  amount: string;
  vat: string;
  vatAmount: string;
  sumVat: string;
}
