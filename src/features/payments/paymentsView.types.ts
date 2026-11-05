export interface ExpensePaidItem {
  id: string;
  promoveShipmentNumber: string;
  vendorInvoiceNumber: string;
  invoiceDate: string;
  accountCode: string | null;
  accountName: string | null;
  journalType: string | null;
  description: string;
  baseAmount: number;
  transactionAmount: number;
  transactionCurrencyCode: string;
  allocation: string | null;
  checkNumber: string | null;
  paymentType: string | null;
}

export interface RevenueReceivedItem {
  id: string;
  registration: string;
  transRefInvoiceNumber: string;
  invoiceDate: string;
  accountCode: string | null;
  accountName: string | null;
  journalType: string | null;
  description: string;
  baseAmount: number;
  baseCurrencyCode: string;
  transactionAmount: number;
  invoiceCurrencyCode: string;
  allocation: string | null;
  checkNumber: string | null;
  paymentType: string | null;
  originatorOperatorCode: string | null;
}
