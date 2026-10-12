import React, { useMemo } from "react";
import {
  Button,
  TableCellLayout,
  Avatar,
  tokens,
} from "@fluentui/react-components";
import { PersonAddRegular, ArrowDownloadRegular } from "@fluentui/react-icons";
import { SharedDataGrid, GridColumnDef } from "./SharedDataGrid";

interface FlatPersonRow {
  id: string;
  fullName: string;
  nickName: string;
  addressType: string;
  countryName: string;
  status: "available" | "busy" | "offline"; 
}

const mockData: FlatPersonRow[] = [
  {
    id: "1",
    fullName: "Asad Khan",
    nickName: "Asad",
    addressType: "delivery",
    countryName: "India",
    status: "available",
  },
  {
    id: "2",
    fullName: "Erika Mustermann",
    nickName: "Erika",
    addressType: "billing",
    countryName: "Germany",
    status: "busy",
  },
];

export const PersonDashboard: React.FC = () => {
  const columns = useMemo<GridColumnDef<FlatPersonRow>[]>(
    () => [
      {
        key: "fullName",
        label: "Customer Name",
        renderCell: (row) => (
          <TableCellLayout
            media={
              <Avatar name={row.fullName} badge={{ status: row.status }} />
            }
          >
            {row.fullName}
          </TableCellLayout>
        ),
      },
      { key: "nickName", label: "Nickname", sortable: false },
      {
        key: "addressType",
        label: "Address Type",
        renderCell: (row) => (
          <span
            style={{
              padding: "2px 8px",
              backgroundColor: tokens.colorBrandBackground2,
              color: tokens.colorBrandForeground2,
              borderRadius: tokens.borderRadiusCircular,
              textTransform: "capitalize",
              fontSize: tokens.fontSizeBase200,
              fontWeight: tokens.fontWeightSemibold,
            }}
          >
            {row.addressType}
          </span>
        ),
      },
      { key: "countryName", label: "Country" },
    ],
    [],
  );

  const ToolbarButtons = (
    <>
      <Button appearance="primary" icon={<PersonAddRegular />}>
        Add Customer
      </Button>
      <Button appearance="subtle" icon={<ArrowDownloadRegular />}>
        Export CSV
      </Button>
    </>
  );

  return (
    <div style={{ padding: "32px", maxWidth: "1200px", margin: "0 auto" }}>
      <h2 style={{ fontFamily: "Segoe UI", marginBottom: "24px" }}>
        Customer Directory
      </h2>

      <SharedDataGrid<FlatPersonRow>
        items={mockData}
        columns={columns}
        getRowId={(row) => row.id}
        searchPlaceholder="Find customers..."
        selectionMode="multiselect" 
        toolbarActions={ToolbarButtons} 
      />
    </div>
  );
};
