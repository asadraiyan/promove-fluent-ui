import React, { useState, useMemo } from "react";
import { makeStyles, tokens, Button } from "@fluentui/react-components";
import { useForm, FormProvider } from "react-hook-form";
import {
  AdhocGlobalcoActionResult,
  AdhocGlobalcoActions,
} from "../actionButtons/AdhocGlobalcoActions";
import { GridColumnDef, SharedDataGrid } from "@/shared";
import { FormDate } from "@/shared/components/Date/FormDate";
import { FormDropdown } from "@/shared/components/Dropdown/Dropdown";

export interface ChangeHistoryRow {
  id: string;
  form: string;
  field: string;
  oldValue: string;
  newValue: string;
  modifier: string;
  changeDate: string;
}

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    marginTop: tokens.spacingVerticalL,
    maxWidth: "1200px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  filterBar: {
    display: "flex",
    alignItems: "end",
    gap: tokens.spacingHorizontalM,
    flexWrap: "wrap",
    backgroundColor: tokens.colorBrandBackground2,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    borderRadius: tokens.borderRadiusMedium,
  },
  filterGroup: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  actionContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: tokens.spacingVerticalS,
  },
});

type FilterFormValues = {
  startDate: string;
  endDate: string;
  formFilter: string;
};

export const ShipmentChangeHistory: React.FC = () => {
  const styles = useStyles();

  const methods = useForm<FilterFormValues>({
    defaultValues: {
      startDate: "",
      endDate: "",
      formFilter: "All",
    },
  });

  const [tableData, setTableData] = useState<ChangeHistoryRow[]>([]);

  const columns = useMemo<GridColumnDef<ChangeHistoryRow>[]>(
    () => [
      { key: "form", label: "Form", minWidth: 150 },
      { key: "field", label: "Field", minWidth: 250 },
      { key: "oldValue", label: "Old Value", minWidth: 100 },
      { key: "newValue", label: "New Value", minWidth: 200 },
      { key: "modifier", label: "Modifier", minWidth: 150 },
      { key: "changeDate", label: "Change Date", minWidth: 180 },
    ],
    [],
  );

  const handleActionSubmit = (result: AdhocGlobalcoActionResult) => {
    const timestamp = new Date().toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const currentUser = "admin";
    const newRows: ChangeHistoryRow[] = [];
    const prefix =
      result.action === "notes" ? "(Add Notes to Globalcom)" : "(Ad hoc)";

    if (result.briefComment) {
      newRows.push({
        id: crypto.randomUUID(),
        form: "Shipment Actions",
        field: `${prefix} Brief Comments`,
        oldValue: "",
        newValue: result.briefComment,
        modifier: currentUser,
        changeDate: timestamp,
      });
    }

    if (result.longComment) {
      newRows.push({
        id: crypto.randomUUID(),
        form: "Shipment Actions",
        field: `${prefix} Long Comments`,
        oldValue: "",
        newValue: result.longComment,
        modifier: currentUser,
        changeDate: timestamp,
      });
    }

    if (result.markCancelled) {
      newRows.push({
        id: crypto.randomUUID(),
        form: "Shipment Actions",
        field: `${prefix} Stat`,
        oldValue: "Open",
        newValue: "Cancelled",
        modifier: currentUser,
        changeDate: timestamp,
      });
    } else if (result.outcome === "completed") {
      newRows.push({
        id: crypto.randomUUID(),
        form: "Shipment Actions",
        field: `${prefix} Stat`,
        oldValue: "Open",
        newValue: "Completed",
        modifier: currentUser,
        changeDate: timestamp,
      });
    }

    setTableData((prevData) => [...newRows, ...prevData]);
  };

  const handleFind = (data: FilterFormValues) => {
    console.log("Filtering with:", data);
  };

  const handleClearFilters = () => {
    methods.reset();
  };

  return (
    <div className={styles.container}>
      <h3>Shipment Change History</h3>

      <FormProvider {...methods}>
        <div className={styles.filterBar}>
          <div className={styles.filterGroup}>
            <FormDate
              name="startDate"
              label="Change Date (Start)"
              placeholder="Select a date"
            />
          </div>

          <div className={styles.filterGroup}>
            <FormDate
              name="endDate"
              label="Change Date (End)"
              placeholder="Select a date"
            />
          </div>

          <div className={styles.filterGroup}>
            <FormDropdown
              name="formFilter"
              control={methods.control}
              label="Form"
              labelPosition="left"
              options={[
                { label: "All", value: "All" },
                { label: "Shipment Actions", value: "Shipment Actions" },
              ]}
            />
          </div>

          <div className={styles.filterGroup}>
            <Button
              appearance="primary"
              onClick={methods.handleSubmit(handleFind)}
            >
              Find
            </Button>
            <Button appearance="secondary" onClick={handleClearFilters}>
              Clear
            </Button>
          </div>
        </div>
      </FormProvider>

      <div className={styles.actionContainer}>
        <AdhocGlobalcoActions onSubmit={handleActionSubmit} />
      </div>

      <SharedDataGrid<ChangeHistoryRow>
        items={tableData}
        columns={columns}
        getRowId={(row) => row.id}
        showSearch={false}
        pageSize={10}
        emptyState="No change history found."
      />
    </div>
  );
};
