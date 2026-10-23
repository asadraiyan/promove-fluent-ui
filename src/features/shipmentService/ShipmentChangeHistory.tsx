import React, { useState, useMemo } from "react";
import {
  makeStyles,
  tokens,
  Button,
  Select,
  Label,
} from "@fluentui/react-components";
import {
  AdhocGlobalcoActionResult,
  AdhocGlobalcoActions,
} from "../actionButtons/AdhocGlobalcoActions";
import { FieldLabel, GridColumnDef, SharedDataGrid } from "@/shared";
import { DatePicker } from "@fluentui/react-datepicker-compat";

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
    alignItems: "center",
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
  filterLabel: {
    color: tokens.colorNeutralForegroundOnBrand,
    fontWeight: tokens.fontWeightSemibold,
  },
  actionContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: tokens.spacingVerticalS,
  },
});

export const ShipmentChangeHistory: React.FC = () => {
  const styles = useStyles();
  const today = new Date().toISOString().split("T")[0];

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [formFilter, setFormFilter] = useState<string>("All");
  const [tableData, setTableData] = useState<ChangeHistoryRow[]>([]);
  //   const { field: dateOfBirthField } = useController({
  //     name: "customerDateOfBirth",
  //     control,
  //   });
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

  const handleClearFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setFormFilter("All");
  };

  return (
    <div className={styles.container}>
      <h3> Shipment Change History</h3>
      <div className={styles.filterBar}>
        <div className={styles.filterGroup}>
          {/* <Label className={styles.filterLabel}>Change Date (Start)</Label> */}
          <FieldLabel htmlFor="startDate">Change Date (Start)</FieldLabel>
          <DatePicker
            value={startDate}
            onSelectDate={(date) => setStartDate(date ?? null)}
            placeholder="Select a date"
          />
        </div>

        <div className={styles.filterGroup}>
          {/* <Label className={styles.filterLabel}>Change Date (End)</Label> */}
          <FieldLabel htmlFor="endDate">Change Date (End)</FieldLabel>
          <DatePicker
            value={endDate}
            onSelectDate={(date) => setEndDate(date ?? null)}
            placeholder="Select a date"
          />
        </div>

        <div className={styles.filterGroup}>
          {/* <Label className={styles.filterLabel}>Form</Label> */}
          <FieldLabel htmlFor="formFilter">Form</FieldLabel>

          <Select
            id="formFilter"
            value={formFilter}
            onChange={(e, data) => setFormFilter(data.value)}
          >
            <option>All</option>
            <option>Shipment Actions</option>
          </Select>
        </div>

        <div className={styles.filterGroup}>
          <Button appearance="primary">Find</Button>
          <Button appearance="secondary" onClick={handleClearFilters}>
            Clear
          </Button>
        </div>
      </div>

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
