import React, { useEffect } from "react";
import { makeStyles, tokens, Text, Spinner } from "@fluentui/react-components";
import { useDispatch, useSelector } from "react-redux";
import { fetchPayments } from "./reducers/paymentSlice";
import {
  SharedDataGrid,
  GridColumnDef,
} from "../../shared/components/Table/SharedDataGrid";
import { ExpensePaidItem, RevenueReceivedItem } from "./paymentsView.types";
import { AppDispatch, RootState } from "@/app/store";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXL,
    padding: tokens.spacingHorizontalL,
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  sectionTitle: {
    paddingLeft: tokens.spacingHorizontalS,
  },
});

const expensePaidColumns: GridColumnDef<ExpensePaidItem>[] = [
  {
    key: "promoveShipmentNumber",
    label: "Promove Shipment and #",
    minWidth: 180,
  },
  { key: "vendorInvoiceNumber", label: "Vendor Invoice Number", minWidth: 160 },
  { key: "invoiceDate", label: "Invoice Date", minWidth: 120 },
  { key: "accountCode", label: "Account Code", minWidth: 120 },
  { key: "accountName", label: "Account Name", minWidth: 150 },
  { key: "journalType", label: "Journal Type", minWidth: 120 },
  { key: "description", label: "Description", minWidth: 200 },
  { key: "baseAmount", label: "Base Amount", minWidth: 120 },
  { key: "transactionAmount", label: "Transaction Amount", minWidth: 150 },
  {
    key: "transactionCurrencyCode",
    label: "Transaction Currency Code",
    minWidth: 180,
  },
  { key: "allocation", label: "Allocation", minWidth: 120 },
  { key: "checkNumber", label: "Check Number", minWidth: 120 },
  { key: "paymentType", label: "Payment Type", minWidth: 120 },
];

const revenueReceivedColumns: GridColumnDef<RevenueReceivedItem>[] = [
  { key: "registration", label: "Registration", minWidth: 120 },
  {
    key: "transRefInvoiceNumber",
    label: "Trans Ref / Invoice#",
    minWidth: 160,
  },
  { key: "invoiceDate", label: "InvoiceDate", minWidth: 120 },
  { key: "accountCode", label: "Account Code", minWidth: 120 },
  { key: "accountName", label: "Account Name", minWidth: 150 },
  { key: "journalType", label: "Journal Type", minWidth: 120 },
  { key: "description", label: "Description", minWidth: 200 },
  { key: "baseAmount", label: "Base Amount", minWidth: 120 },
  { key: "baseCurrencyCode", label: "Base Currency", minWidth: 120 },
  { key: "transactionAmount", label: "Transaction Amount", minWidth: 150 },
  { key: "invoiceCurrencyCode", label: "Invoice Currency", minWidth: 140 },
  { key: "allocation", label: "Allocation", minWidth: 120 },
  { key: "checkNumber", label: "Check Number", minWidth: 120 },
  { key: "paymentType", label: "Payment Type", minWidth: 120 },
  {
    key: "originatorOperatorCode",
    label: "Originator Operator Code",
    minWidth: 180,
  },
];

export const PaymentsView: React.FC = () => {
  const styles = useStyles();
  const dispatch = useDispatch<AppDispatch>();

  const { expenses, revenues, loading, error } = useSelector(
    (state: RootState) => state.payments,
  );

  useEffect(() => {
    const salesId = "12345";
    dispatch(fetchPayments(salesId));
  }, [dispatch]);

  if (loading && expenses.length === 0 && revenues.length === 0) {
    return <Spinner label="Loading payments data..." />;
  }

  if (error) {
    return <Text color="danger">Error loading data: {error}</Text>;
  }

  return (
    <div className={styles.container}>
      <Text weight="semibold" size={400}>
        - Payments
      </Text>

      <div className={styles.section}>
        <Text size={300} weight="semibold" className={styles.sectionTitle}>
          Expense Paid
        </Text>
        <SharedDataGrid<ExpensePaidItem>
          items={expenses}
          columns={expensePaidColumns}
          getRowId={(item) => item.id}
          showSearch={false}
          emptyState={<Text>No expense records found.</Text>}
        />
      </div>

      <div className={styles.section}>
        <Text size={300} weight="semibold" className={styles.sectionTitle}>
          Revenue Received
        </Text>
        <SharedDataGrid<RevenueReceivedItem>
          items={revenues}
          columns={revenueReceivedColumns}
          getRowId={(item) => item.id}
          showSearch={false}
          emptyState={<Text>No revenue records found.</Text>}
        />
      </div>
    </div>
  );
};
