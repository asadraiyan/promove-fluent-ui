import React from "react";
import { makeStyles, Text, tokens } from "@fluentui/react-components";

import { CommonEditDialog } from "@/shared/components/Modal/CommonEditDialog";
import {
  ModalTable,
  type GridColumnDef,
} from "@/shared/components/Table/ModalTable";

import { UninvoicedRevenueLineRow } from "../Invoicing.types";

const useStyles = makeStyles({
  dialogContent: {
    paddingTop: tokens.spacingVerticalM,
  },
  dialogDescription: {
    display: "block",
    marginBottom: tokens.spacingVerticalS,
  },
  dialogTable: {
    maxHeight: "55vh",
    overflow: "auto",
  },
});

interface UninvoicedRevenueDialogProps {
  open: boolean;
  revenueLines: UninvoicedRevenueLineRow[];
  revenueLineColumns: GridColumnDef<UninvoicedRevenueLineRow>[];
  onClose: () => void;
}

const UninvoicedRevenueDialog: React.FC<
  UninvoicedRevenueDialogProps
> = ({
  open,
  revenueLines,
  revenueLineColumns,
  onClose,
}) => {
  const styles = useStyles();

  return (
    <CommonEditDialog
      open={open}
      heading="Uninvoiced revenue lines"
      content={
        <div className={styles.dialogContent}>
          <Text
            className={styles.dialogDescription}
            weight="semibold"
          >
            These revenue lines have not been invoiced yet:
          </Text>

          <div className={styles.dialogTable}>
            <ModalTable<UninvoicedRevenueLineRow>
              items={revenueLines}
              columns={revenueLineColumns}
              getRowId={(line) => line.id}
              compact
              fillWidth
              emptyState="No invoices found yet."
            />
          </div>
        </div>
      }
      actions={[
        {
          label: "Close",
          onClick: onClose,
          appearance: "secondary",
        },
      ]}
      onClose={onClose}
      showCloseButton
      maxWidth="min(1100px, calc(100vw - 32px))"
    />
  );
};

export default UninvoicedRevenueDialog;
