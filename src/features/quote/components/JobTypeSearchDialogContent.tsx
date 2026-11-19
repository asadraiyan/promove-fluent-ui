import React, { useState } from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { useForm } from "react-hook-form";
import { Button, FormDropdown, ResponsiveGrid } from "@/shared";
import {
  ModalTable,
  type GridColumnDef,
} from "@/shared/components/Table/ModalTable";

interface JobTypeRow {
  id: string;
  jobType: string;
  mode: string;
  jobNature: string;
  service: string;
  goodsType: string;
  shipmentType: string;
}

interface JobTypeFilters {
  mode: string;
  jobNature: string;
  service: string;
  goodsType: string;
  shipmentType: string;
}

interface JobTypeSearchDialogContentProps {
  onSelect: (jobType: string) => void;
}

const JOB_TYPE_ROWS: JobTypeRow[] = [
  {
    id: "job-type-1",
    jobType: "3RD COUNTRY OVERLAND-HHGS-THIRD COUNTRY-HHGS-LCL-D/D-CIVILIAN",
    mode: "Overland",
    jobNature: "Third Country",
    service: "LCL",
    goodsType: "Household Goods",
    shipmentType: "Civilian",
  },
  {
    id: "job-type-2",
    jobType: "3RD COUNTRY OVERLAND-HHGS-THIRD COUNTRY-FCL-LOOSE-D/D-CIVILIAN",
    mode: "Overland",
    jobNature: "Third Country",
    service: "FCL",
    goodsType: "Household Goods",
    shipmentType: "Civilian",
  },
  {
    id: "job-type-3",
    jobType: "CANADA OVERLAND-HHGS-EXPORT-FCL-LOOSE-D/D-CIVILIAN",
    mode: "Overland",
    jobNature: "Export",
    service: "FCL",
    goodsType: "Household Goods",
    shipmentType: "Civilian",
  },
  {
    id: "job-type-4",
    jobType: "HHGS-EXPORT-AIR--D/D-CIVILIAN",
    mode: "Air",
    jobNature: "Export",
    service: "Air",
    goodsType: "Household Goods",
    shipmentType: "Civilian",
  },
  {
    id: "job-type-5",
    jobType: "COMMERCIAL OVERLAND-IMPORT-FCL-D/D-CIVILIAN",
    mode: "Overland",
    jobNature: "Import",
    service: "FCL",
    goodsType: "Commercial Goods",
    shipmentType: "Civilian",
  },
  {
    id: "job-type-6",
    jobType: "HHGS-EXPORT-AIR--D/P-MILITARY",
    mode: "Air",
    jobNature: "Export",
    service: "Air",
    goodsType: "Household Goods",
    shipmentType: "Military",
  },
];

const EMPTY_FILTERS: JobTypeFilters = {
  mode: "",
  jobNature: "",
  service: "",
  goodsType: "Household Goods",
  shipmentType: "Civilian",
};

const MODE_OPTIONS = [
  { value: "Air", label: "Air" },
  { value: "Overland", label: "Overland" },
];
const JOB_NATURE_OPTIONS = [
  { value: "Export", label: "Export" },
  { value: "Import", label: "Import" },
  { value: "Third Country", label: "Third Country" },
];
const SERVICE_OPTIONS = [
  { value: "Air", label: "Air" },
  { value: "FCL", label: "FCL" },
  { value: "LCL", label: "LCL" },
];
const GOODS_TYPE_OPTIONS = [
  { value: "Household Goods", label: "Household Goods" },
  { value: "Commercial Goods", label: "Commercial Goods" },
];
const SHIPMENT_TYPE_OPTIONS = [
  { value: "Civilian", label: "Civilian" },
  { value: "Military", label: "Military" },
];

const columns: GridColumnDef<JobTypeRow>[] = [
  { key: "jobType", label: "Job Type", sortable: false },
];

const useStyles = makeStyles({
  content: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    paddingTop: tokens.spacingVerticalM,
    minWidth: 0,
  },
  filters: {
    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
    columnGap: tokens.spacingHorizontalL,
    rowGap: tokens.spacingVerticalS,
    alignItems: "center",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: tokens.spacingHorizontalS,
  },
  table: {
    maxHeight: "55vh",
    overflow: "auto",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  selectedJobType: {
    color: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
});

export const JobTypeSearchDialogContent: React.FC<
  JobTypeSearchDialogContentProps
> = ({ onSelect }) => {
  const styles = useStyles();
  const { control, getValues } = useForm<JobTypeFilters>({
    defaultValues: EMPTY_FILTERS,
  });
  const [visibleRows, setVisibleRows] = useState<JobTypeRow[]>(JOB_TYPE_ROWS);
  const [selectedRow, setSelectedRow] = useState<JobTypeRow | null>(null);

  const handleSearch = () => {
    const filters = getValues();
    const matches = JOB_TYPE_ROWS.filter((row) =>
      (Object.keys(filters) as Array<keyof JobTypeFilters>).every(
        (key) => !filters[key] || row[key] === filters[key],
      ),
    );
    setVisibleRows(matches);
    setSelectedRow(null);
  };

  return (
    <div className={styles.content}>
      <ResponsiveGrid className={styles.filters}>
        <FormDropdown
          name="mode"
          control={control}
          label="Mode"
          labelPosition="left"
          options={MODE_OPTIONS}
          placeholder="Select mode"
        />
        <FormDropdown
          name="goodsType"
          control={control}
          label="Goods Type"
          labelPosition="left"
          options={GOODS_TYPE_OPTIONS}
        />
        <FormDropdown
          name="jobNature"
          control={control}
          label="Job Nature"
          labelPosition="left"
          options={JOB_NATURE_OPTIONS}
          placeholder="Select job nature"
        />
        <FormDropdown
          name="shipmentType"
          control={control}
          label="Shipment Type"
          labelPosition="left"
          options={SHIPMENT_TYPE_OPTIONS}
        />
        <FormDropdown
          name="service"
          control={control}
          label="Service"
          labelPosition="left"
          options={SERVICE_OPTIONS}
          placeholder="Select service"
        />
        <div />
      </ResponsiveGrid>

      <div className={styles.actions}>
        <Button type="button" appearance="primary" onClick={handleSearch}>
          Search
        </Button>
        <Button
          type="button"
          appearance="primary"
          disabled={!selectedRow}
          onClick={() => {
            if (selectedRow) onSelect(selectedRow.jobType);
          }}
        >
          OK
        </Button>
      </div>

      <div className={styles.table}>
        <ModalTable<JobTypeRow>
          items={visibleRows}
          columns={[
            {
              ...columns[0],
              renderCell: (row) => (
                <span
                  className={
                    selectedRow?.id === row.id
                      ? styles.selectedJobType
                      : undefined
                  }
                >
                  {row.jobType}
                </span>
              ),
            },
          ]}
          getRowId={(row) => row.id}
          onRowClick={setSelectedRow}
          emptyState="No job types match the selected filters."
        />
      </div>
    </div>
  );
};
