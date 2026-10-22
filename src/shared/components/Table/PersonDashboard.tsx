import React, { useMemo, useState } from "react";
import {
  Button,
  TableCellLayout,
  Avatar,
  tokens,
  makeStyles,
  typographyStyles,
  mergeClasses,
} from "@fluentui/react-components";
import { PersonAddRegular, ArrowDownloadRegular } from "@fluentui/react-icons";
import { SharedDataGrid, GridColumnDef } from "./SharedDataGrid";
import apiResponse from "../../../../public/addressDetails.json";
import { CommonEditDialog } from "../Modal/CommonEditDialog";
import { PersonDashboardEditFields } from "./PersonDashboardEditFields";

interface ApiUser {
  id?: string;
  label?: string;
  formValues?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    mobile1?: string;
    addressType?: string;
    city?: { name?: string };
    country?: { name?: string };
    roles?: string[];
    [key: string]: any;
  };
}

export interface FlatUserRow {
  id: string;
  fullName: string;
  roles: string[];
  email: string;
  phone: string;
  addressType: string;
  locationString: string;
}

// const apiResponse = {
//   users: [
//     // ... your JSON array
//   ],
// };

const useStyles = makeStyles({
  layout: {
    padding: tokens.spacingVerticalXXL,
    maxWidth: "1200px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  header: {
    ...typographyStyles.title2,
    marginBottom: tokens.spacingVerticalL,
  },
  badgeBase: {
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalS}`,
    borderRadius: tokens.borderRadiusCircular,
    textTransform: "capitalize",
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
  },
  badgeDelivery: {
    backgroundColor: tokens.colorPaletteGreenBackground1,
    color: tokens.colorPaletteGreenForeground1,
  },
  badgeBilling: {
    backgroundColor: tokens.colorPaletteBlueBackground2,
    color: tokens.colorPaletteBlueForeground2,
  },
  badgeDefault: {
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground3,
  },
  customerLink: {
    color: tokens.colorBrandForegroundLink,
    textDecorationLine: "underline",
    minWidth: "0",
    paddingLeft: "0",
    paddingRight: "0",
  },
  rolesContainer: {
    // display: "flex",
    gap: tokens.spacingHorizontalSNudge,
    flexWrap: "wrap",
  },
  roleBadge: {
    // border: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: `${tokens.spacingVerticalMNudge} ${tokens.spacingHorizontalS}`,
    // borderRadius: tokens.borderRadiusMedium,
    // fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
  },
});

export const PersonDashboard: React.FC = () => {
  const styles = useStyles();

  const [flatData, setFlatData] = useState<FlatUserRow[]>(() => {
    if (!apiResponse?.users || !Array.isArray(apiResponse.users)) {
      return [];
    }

    return apiResponse.users
      .map((user: ApiUser) => {
        if (!user || !user.formValues) return null;

        const form = user.formValues;
        const firstName = form.firstName?.trim() || "Unknown";
        const lastName = form.lastName?.trim() || "";
        const fullName = `${firstName} ${lastName}`.trim();

        const cityName = form.city?.name?.trim();
        const countryName = form.country?.name?.trim();

        let locationString = "Location not provided";
        if (cityName && countryName) {
          locationString = `${cityName}, ${countryName}`;
        } else if (cityName) {
          locationString = cityName;
        } else if (countryName) {
          locationString = countryName;
        }

        return {
          id:
            user.id ||
            `unknown-${crypto.randomUUID ? crypto.randomUUID() : Math.random()}`,
          fullName,
          email: form.email?.trim() || "No email provided",
          phone: form.mobile1?.trim() || "No phone provided",
          addressType: form.addressType?.trim() || "unspecified",
          locationString,
          roles:
            Array.isArray(form.roles) && form.roles.length > 0
              ? form.roles
              : ["Standard User"],
        };
      })
      .filter((row): row is FlatUserRow => row !== null);
  });

  const [editingCustomer, setEditingCustomer] = useState<FlatUserRow | null>(
    null,
  );

  const updateEditingCustomer = (field: keyof FlatUserRow, value: string) => {
    setEditingCustomer((customer) =>
      customer ? { ...customer, [field]: value } : customer,
    );
  };

  const saveCustomer = () => {
    if (!editingCustomer) return;

    setFlatData((rows) =>
      rows.map((row) =>
        row.id === editingCustomer.id ? editingCustomer : row,
      ),
    );
    setEditingCustomer(null);
  };

  const columns = useMemo<GridColumnDef<FlatUserRow>[]>(
    () => [
      {
        key: "fullName",
        label: "Customer Name",
        minWidth: 250,
        renderCell: (row) => (
          <TableCellLayout
            media={<Avatar name={row.fullName} color="colorful" />}
          >
            <Button
              appearance="transparent"
              className={styles.customerLink}
              onClick={() => setEditingCustomer({ ...row })}
            >
              {row.fullName}
            </Button>
          </TableCellLayout>
        ),
      },
      {
        key: "email",
        label: "Email Address",
        minWidth: 250,
      },
      {
        key: "phone",
        label: "Phone Number",
        sortable: false,
        minWidth: 250,
      },
      {
        key: "locationString",
        label: "Location",
        minWidth: 250,
      },
      {
        key: "addressType",
        label: "Type",
        minWidth: 250,
        renderCell: (row) => {
          const badgeColorClass =
            row.addressType === "delivery"
              ? styles.badgeDelivery
              : row.addressType === "billing"
                ? styles.badgeBilling
                : styles.badgeDefault;

          return (
            <span className={mergeClasses(styles.badgeBase, badgeColorClass)}>
              {row.addressType}
            </span>
          );
        },
      },
      {
        key: "roles",
        label: "Assigned Roles",
        minWidth: 250,
        accessor: (row: FlatUserRow) => row.roles.join(", "),
        renderCell: (row) => (
          <div className={styles.rolesContainer}>
            {row.roles.map((role, index) => (
              <React.Fragment key={`${role}-${index}`}>
                <div className={styles.roleBadge}>{role}</div>
                {index !== row.roles.length - 1 && <hr />}
              </React.Fragment>
            ))}
          </div>
        ),
      },
    ],
    [styles],
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
    <div className={styles.layout}>
      <h2 className={styles.header}>User Directory</h2>

      <SharedDataGrid<FlatUserRow>
        items={flatData}
        columns={columns}
        getRowId={(row) => row.id}
        searchPlaceholder="Search by name, email, roles, or location..."
        selectionMode="multiselect"
        // toolbarActions={ToolbarButtons}
        pageSize={5}
      />

      <CommonEditDialog
        open={editingCustomer !== null}
        heading="Edit customer details"
        content={
          <PersonDashboardEditFields
            customer={editingCustomer}
            onChange={updateEditingCustomer}
          />
        }
        actions={[
          {
            label: "Cancel",
            appearance: "secondary",
            onClick: () => setEditingCustomer(null),
            position: "end",
          },
          {
            label: "Save",
            appearance: "primary",
            onClick: saveCustomer,
            position: "end",
          },
        ]}
        onClose={() => setEditingCustomer(null)}
      />
    </div>
  );
};
