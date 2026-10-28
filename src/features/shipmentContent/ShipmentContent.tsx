import React from "react";
import { useForm } from "react-hook-form";
import { Button, SharedDataGrid } from "@/shared";

import {
  defaultShipmentContentValues,
  moveTypeColumns,
  moveTypeOptions,
} from "./constants";
import { useShipmentContentStyles } from "./ShipmentContent.styles";
import type { ShipmentContentValues } from "./ShipmentContent.types";
import ShipmentDetails from "./components/ShipmentDetails";

const ShipmentContent: React.FC = () => {
  const styles = useShipmentContentStyles();
  const { control } = useForm<ShipmentContentValues>({
    defaultValues: defaultShipmentContentValues,
  });

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Shipment Content</h2>
      <div className={styles.moveGrid}>
        <SharedDataGrid
          items={moveTypeOptions}
          columns={moveTypeColumns}
          getRowId={(item) => item.id}
          showSearch={false}
          selectionMode="single"
          emptyState="No move type options."
        />
      </div>

      <h3 className={styles.detailHeading}>
        Details for selected move type option:
      </h3>
      <ShipmentDetails control={control} styles={styles} />

      <div className={styles.quantityRow}>
        <span className={styles.quantity}>Lift Vans: 5</span>
        <span className={styles.quantity}>Crates: 0</span>
        <span className={styles.quantity}>Overflow: 1</span>
        <span className={styles.quantity}>Air Containers: 0</span>
        <Button type="button" appearance="secondary">
          Vans
        </Button>
      </div>
    </section>
  );
};

export default ShipmentContent;
