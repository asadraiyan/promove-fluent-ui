import React, { useMemo } from "react";

import { Badge } from "@fluentui/react-components";

import { DataGridColumn } from "@/shared/components/DataGrid/DataGrid.types";
import DataGrid from "@/shared/components/DataGrid/DataGrid";

export const DUMMY_INVOICE_LINES: InvoiceLine[] = [
  {
    id: 1,
    fileRef: "5600811",
    billTo: "",
    codeOfParty: "173163",
    revC: "4100",
    description: "Air Freight (ORIGN)",
    amount: 10.0,
    currency: "USD",
    vat: "0.00%",
    sunVat: "UNKN",
    vatAmount: 0.0,
  },
  {
    id: 2,
    fileRef: "5600811",
    billTo: "",
    codeOfParty: "173163",
    revC: "6900",
    description: "Automobile Accessorial (ORIGN)",
    amount: 30.0,
    currency: "USD",
    vat: "0.00%",
    sunVat: "UNKN",
    vatAmount: 0.0,
  },
  {
    id: 3,
    fileRef: "5600811",
    billTo: "",
    codeOfParty: "173163",
    revC: "9270",
    description: "Chassis Rental (ORIGN)",
    amount: 20.0,
    currency: "USD",
    vat: "0.00%",
    sunVat: "UNKN",
    vatAmount: 0.0,
  },
];

export type InvoiceLine = {
  id: number;
  fileRef: string;
  billTo: string;
  codeOfParty: string;
  revC: string;
  description: string;
  amount: number;
  currency: string;
  vat: string;
  sunVat: string;
  vatAmount: number;
};

export type EmployeeListProps = {
  employees?: unknown[];
};

const Employee: React.FC<EmployeeListProps> = () => {
 const columns = useMemo<DataGridColumn<InvoiceLine>[]>(
  () => [
    {
      key: "fileRef",
      header: "File Ref",
      accessor: (row) => row.fileRef,
    },
    {
      key: "billTo",
      header: "Bill To",
      accessor: (row) => row.billTo,
    },
    {
      key: "codeOfParty",
      header: "Code of Party",
      accessor: (row) => row.codeOfParty,
    },
    {
      key: "revC",
      header: "Rev C",
      accessor: (row) => row.revC,
    },
    {
      key: "description",
      header: "Description",
      accessor: (row) => row.description,
    },
    {
      key: "amount",
      header: "Amount",
      accessor: (row) => row.amount,
      renderCell: (row) =>
        `${row.amount.toFixed(2)} ${row.currency}`,
    },
    {
      key: "vat",
      header: "VAT",
      accessor: (row) => row.vat,
    },
    {
      key: "sunVat",
      header: "Sun Vat",
      accessor: (row) => row.sunVat,
    },
    {
      key: "vatAmount",
      header: "Vat Amount",
      accessor: (row) => row.vatAmount,
      renderCell: (row) =>
        `${row.vatAmount.toFixed(2)} ${row.currency}`,
    },
    {
      key: "actions",
      header: "Actions",
      accessor: () => "",
      sortable: false,
      searchable: false,
      renderCell: () => <span>···</span>,
    },
  ],
  []
);

  return (
    <DataGrid<InvoiceLine>
      data={DUMMY_INVOICE_LINES}
      columns={columns}
      getRowId={(row) => row.id}
      searchPlaceholder="Search invoice lines..."
      emptyMessage="No invoice lines found."
    />
  );
};

export default Employee;