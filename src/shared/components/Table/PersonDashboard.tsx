import React, { useMemo } from "react";
import {
  Button,
  TableCellLayout,
  Avatar,
  tokens,
} from "@fluentui/react-components";
import { PersonAddRegular, ArrowDownloadRegular } from "@fluentui/react-icons";
import { SharedDataGrid, GridColumnDef } from "./SharedDataGrid";
import apiResponse from "../../../../public/addressDetails.json";

interface ApiUser {
  id: string;
  label: string;
  formValues: {
    firstName: string;
    lastName: string;
    email: string;
    mobile1: string;
    addressType: string;
    city: { name: string };
    country: { name: string };
    [key: string]: any;
  };
}

interface FlatUserRow {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  addressType: string;
  locationString: string;
}

// Simulate your API response
// const apiResponse = {
//   users: [
//     // ... paste your entire JSON array here
//   ],
// };

export const PersonDashboard: React.FC = () => {
  const flatData: FlatUserRow[] = useMemo(() => {
    return apiResponse.users.map((user: ApiUser) => ({
      id: user.id,
      fullName: `${user.formValues.firstName} ${user.formValues.lastName}`,
      email: user.formValues.email,
      phone: user.formValues.mobile1,
      addressType: user.formValues.addressType,
      locationString: `${user.formValues.city.name}, ${user.formValues.country.name}`,
    }));
  }, []);

  const columns = useMemo<GridColumnDef<FlatUserRow>[]>(
    () => [
      {
        key: "fullName",
        label: "Customer Name",
        renderCell: (row) => (
          <TableCellLayout
            media={<Avatar name={row.fullName} color="colorful" />}
          >
            {row.fullName}
          </TableCellLayout>
        ),
      },
      {
        key: "email",
        label: "Email Address",
      },
      {
        key: "phone",
        label: "Phone Number",
        sortable: false,
      },
      {
        key: "locationString",
        label: "Location",
      },
      {
        key: "addressType",
        label: "Type",
        renderCell: (row) => {
          const isDelivery = row.addressType === "delivery";
          return (
            <span
              style={{
                padding: "2px 8px",
                backgroundColor: isDelivery
                  ? tokens.colorPaletteGreenBackground1
                  : tokens.colorPaletteBlueBackground2,
                color: isDelivery
                  ? tokens.colorPaletteGreenForeground1
                  : tokens.colorPaletteBlueForeground2,
                borderRadius: tokens.borderRadiusCircular,
                textTransform: "capitalize",
                fontSize: tokens.fontSizeBase200,
                fontWeight: tokens.fontWeightSemibold,
              }}
            >
              {row.addressType}
            </span>
          );
        },
      },
    ],
    [],
  );

  const ToolbarButtons = (
    <>
      <Button appearance="primary" icon={<PersonAddRegular />}>
        Add User
      </Button>
      <Button appearance="subtle" icon={<ArrowDownloadRegular />}>
        Export
      </Button>
    </>
  );

  return (
    <div style={{ padding: "32px", maxWidth: "1200px", margin: "0 auto" }}>
      <h2 style={{ fontFamily: "Segoe UI", marginBottom: "24px" }}>
        User Directory
      </h2>

      <SharedDataGrid<FlatUserRow>
        items={flatData}
        columns={columns}
        getRowId={(row) => row.id}
        searchPlaceholder="Search by name, email, or location..."
        selectionMode="multiselect"
        toolbarActions={ToolbarButtons}
      />
    </div>
  );
};
