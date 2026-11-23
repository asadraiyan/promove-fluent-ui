import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, makeStyles, Text, tokens } from "@fluentui/react-components";
import { AddRegular, DeleteRegular, SaveRegular } from "@fluentui/react-icons";
import {
  Checkbox,
  FormDate,
  FormDropdown,
  FormInput,
  GridColumnDef,
  SharedDataGrid,
} from "@/shared";
import {
  defaultAccessorialFormValues,
  dummyAccessorialMetadata,
  initialAccessorials,
  overrideCurrencyOptions,
  serviceOptions,
} from "./constants";
import { AccessorialDetailFormData, AccessorialRow } from "./types";
import { QuoteHeader } from "../common/QuoteHeader";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingHorizontalL,
    backgroundColor: tokens.colorNeutralBackground2,
    minHeight: "100vh",
    "@media (max-width: 768px)": {
      padding: tokens.spacingHorizontalS,
    },
  },
  sectionCard: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    backgroundColor: tokens.colorNeutralBackground1,
    padding: tokens.spacingHorizontalM,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  actionBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
    padding: `${tokens.spacingVerticalXS} 0`,
  },
  detailSection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    backgroundColor: tokens.colorNeutralBackground1,
    padding: tokens.spacingHorizontalM,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  detailGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    columnGap: tokens.spacingHorizontalXXL,
    rowGap: tokens.spacingVerticalM,
    "@media (max-width: 900px)": {
      gridTemplateColumns: "1fr",
      columnGap: tokens.spacingHorizontalM,
    },
  },
  leftColumn: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    minWidth: 0,
  },
  rightColumn: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    minWidth: 0,
  },
  inlinePairRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalM,
    alignItems: "center",
    "@media (max-width: 600px)": {
      gridTemplateColumns: "1fr",
    },
  },
  checkboxRow: {
    display: "grid",
    gridTemplateColumns: "minmax(0, min(12rem, 40%)) minmax(0, 1fr)",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalM,
    "@media (max-width: 600px)": {
      gridTemplateColumns: "1fr",
      gap: tokens.spacingVerticalXS,
    },
  },
  checkboxLabel: {
    color: tokens.colorNeutralForeground2,
  },
});

export const AccessorialsSection: React.FC = () => {
  const styles = useStyles();

  const [rows, setRows] = useState<AccessorialRow[]>(initialAccessorials);

  const { control, handleSubmit, reset } = useForm<AccessorialDetailFormData>({
    defaultValues: defaultAccessorialFormValues,
  });

  const handleNew = () => {
    reset(defaultAccessorialFormValues);
  };
  const resolveRowValues = (data: AccessorialDetailFormData) => {
    const resolvedService = data.service?.trim() ?? "";
    const resolvedQuantity =
      data.quantity !== undefined ? String(data.quantity).trim() : "";

    const unitCostUsd =
      data.unitCostUsd !== undefined ? String(data.unitCostUsd).trim() : "";
    const unitCostCurr =
      data.unitCostCurrency !== undefined
        ? String(data.unitCostCurrency).trim()
        : "";
    const resolvedUnitCost = unitCostUsd || unitCostCurr;

    const totalCostInput =
      data.totalCostUsd !== undefined ? String(data.totalCostUsd).trim() : "";

    const calculatedTotal =
      resolvedQuantity && resolvedUnitCost
        ? (
            (parseFloat(resolvedQuantity) || 0) *
            (parseFloat(resolvedUnitCost) || 0)
          ).toFixed(2)
        : "";

    const resolvedTotalCost = totalCostInput || calculatedTotal;

    return {
      accessorialType: resolvedService,
      bucket: dummyAccessorialMetadata.bucket,
      quantity: resolvedQuantity,
      unitCost: resolvedUnitCost,
      totalCost: resolvedTotalCost,
    };
  };

  const handleSave = (data: AccessorialDetailFormData) => {
    const resolved = resolveRowValues(data);

    const newRow: AccessorialRow = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      ...resolved,
      creationDate: dummyAccessorialMetadata.creationDate,
      creationUser: dummyAccessorialMetadata.creationUser,
      modificationDate: dummyAccessorialMetadata.modificationDate,
      modificationUser: dummyAccessorialMetadata.modificationUser,
      service: data.service,
      unitCostUsd: data.unitCostUsd,
      unitCostCurrency: data.unitCostCurrency,
      overrideCurrency: data.overrideCurrency,
      fxRate: data.fxRate,
      billedFrom: data.billedFrom,
      billedTo: data.billedTo,
      totalCostUsd: resolved.totalCost,
      optionalService: data.optionalService,
    };

    setRows((prev) => [newRow, ...prev]);
    reset(defaultAccessorialFormValues);
  };

  const handleDeleteRow = (id: string) => {
    setRows((prev) => prev.filter((item) => item.id !== id));
  };

  const columns: GridColumnDef<AccessorialRow>[] = [
    { key: "accessorialType", label: "Accessorial Type", minWidth: 260 },
    { key: "bucket", label: "Bucket", minWidth: 100 },
    { key: "quantity", label: "Quantity", minWidth: 100 },
    { key: "unitCost", label: "Unit Cost", minWidth: 110 },
    { key: "totalCost", label: "Total Cost", minWidth: 110 },
    { key: "creationDate", label: "Creation Date", minWidth: 125 },
    { key: "creationUser", label: "Creation User", minWidth: 135 },
    { key: "modificationDate", label: "Modification Date", minWidth: 140 },
    { key: "modificationUser", label: "Modification User", minWidth: 145 },
    {
      key: "id",
      label: "",
      minWidth: 60,
      sortable: false,
      renderCell: (item) => (
        <Button
          icon={<DeleteRegular />}
          appearance="subtle"
          aria-label="Delete accessorial"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteRow(item.id);
          }}
        />
      ),
    },
  ];

  return (
    <div className={styles.root}>
      <div className={styles.sectionCard}>
        <Text weight="semibold" size={400}>
          Accessorials
        </Text>
        <SharedDataGrid
          items={rows}
          columns={columns}
          getRowId={(item) => item.id}
          showSearch={false}
          pageSize={5}
          enableColumnPinning={false}
        />
      </div>

      <div className={styles.actionBar}>
        <Button
          appearance="secondary"
          icon={<AddRegular />}
          onClick={handleNew}
        >
          New
        </Button>
        <Button
          appearance="primary"
          icon={<SaveRegular />}
          onClick={handleSubmit(handleSave)}
        >
          Save
        </Button>
      </div>

      <div className={styles.detailSection}>
        <Text weight="semibold" size={400}>
          Accessorial Detail
        </Text>

        <form onSubmit={handleSubmit(handleSave)} className={styles.detailGrid}>
          <div className={styles.leftColumn}>
            <FormDropdown
              name="service"
              control={control}
              label="Service :"
              labelPosition="left"
              options={serviceOptions}
              placeholder="Select Service..."
            />

            <FormInput
              name="quantity"
              control={control}
              label="Quantity :"
              labelPosition="left"
              type="number"
              placeholder="0"
            />

            <FormInput
              name="unitCostUsd"
              control={control}
              label="Unit Cost (USD) :"
              labelPosition="left"
              type="number"
              placeholder="0.00"
            />

            <div className={styles.inlinePairRow}>
              <FormInput
                name="unitCostCurrency"
                control={control}
                label="Unit Cost (Currency) :"
                labelPosition="left"
                type="number"
                placeholder="0.00"
              />
              <FormDropdown
                name="overrideCurrency"
                control={control}
                label="Override Currency :"
                labelPosition="left"
                options={overrideCurrencyOptions}
                placeholder="Currency..."
              />
            </div>

            <FormInput
              name="totalCostUsd"
              control={control}
              label="Total Cost (USD) :"
              labelPosition="left"
              type="number"
              placeholder="0.00"
            />

            <div className={styles.checkboxRow}>
              <Text className={styles.checkboxLabel}>Optional Service :</Text>
              <Controller
                name="optionalService"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    checked={Boolean(field.value)}
                    onChange={(_, data) =>
                      field.onChange(Boolean(data.checked))
                    }
                    aria-label="Optional Service"
                  />
                )}
              />
            </div>
          </div>

          <div className={styles.rightColumn}>
            <FormDate
              name="billedFrom"
              control={control as any}
              label="Billed From :"
              orientation="horizontal"
              placeholder="Select date..."
            />

            <FormDate
              name="billedTo"
              control={control as any}
              label="Billed To :"
              orientation="horizontal"
              placeholder="Select date..."
            />

            <FormInput
              name="fxRate"
              control={control}
              label="Fx Rate :"
              labelPosition="left"
              type="number"
              placeholder="1.0000"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
