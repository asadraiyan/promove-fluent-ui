export interface ExpensePaidItem {
  id: string;
  promoveShipment: string;
  vendorInvoiceNumber: string;
  invoiceDate: string;
  accountCode: string;
  accountName: string;
  journalType: string;
  description: string;
  baseAmount: number;
  transactionAmount: number;
  transactionCurrencyCode: string;
  allocation: string;
  checkNumber: string;
  paymentType: string;
}

export interface RevenueReceivedItem {
  id: string;
  registration: string;
  transRefInvoice: string;
  invoiceDate: string;
  accountCode: string;
  accountName: string;
  journalType: string;
  description: string;
  baseAmount: number;
  baseCurrency: string;
  transactionAmount: number;
  invoiceCurrency: string;
  allocation: string;
  checkNumber: string;
  paymentType: string;
  originatorOperatorCode: string;
}
