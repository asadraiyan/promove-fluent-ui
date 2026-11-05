import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button, SharedDataGrid } from "@/shared";
import { AppDispatch, RootState } from "@/app/store";

import { defaultShipmentContentValues, moveTypeColumns } from "./constants";
import { useShipmentContentStyles } from "./ShipmentContent.styles";
import type { ShipmentContentValues } from "./ShipmentContent.types";
import ShipmentDetails from "./components/ShipmentDetails";
import { fetchShipmentContents } from "./reducers/shipmentContentSlice";
import { Spinner } from "@fluentui/react-components";
// import { fetchShipmentContents } from "./shipmentContentSlice";

const ShipmentContent: React.FC = () => {
  const styles = useShipmentContentStyles();
  const dispatch = useDispatch<AppDispatch>();

  const {
    data: apiData,
    loading,
    error,
  } = useSelector((state: RootState) => state.shipmentContent);

  const { control, reset } = useForm<ShipmentContentValues>({
    defaultValues: defaultShipmentContentValues,
  });

  // Example Goods ID; you would normally pass this as a prop or get it from the route
  const goodsId = "651097";

  useEffect(() => {
    dispatch(fetchShipmentContents(goodsId));
  }, [dispatch, goodsId]);

  useEffect(() => {
    if (apiData) {
      reset({
        ...defaultShipmentContentValues,
        cartonsPieces: String(apiData.contents.cartonsPiecesNumber || "0"),
        cartonsVolume: String(apiData.contents.cartonsPiecesVolume || "0"),
        ownerPrepackedVolume: String(
          apiData.contents.ownerPrepackedVolume || "0",
        ),
        totalNumber: String(apiData.contents.totalNumber || "0"),
        totalVolume: String(apiData.contents.totalVolume || "0"),
        mileage: String(apiData.vehicle.mileage || "0"),
        releaseValue: String(apiData.vehicle.releaseValueOfGoods || ""),
        declaredVehicleValue: String(
          apiData.vehicle.declaredValueOfVehicles || "",
        ),
        quoteNumber: apiData.interfaces.quoteNumber || "",
        variation: apiData.interfaces.variation || "",
        itnNumber: apiData.interfaces.itnNumber || "",
        questWebNumber: apiData.interfaces.questwebNumber || "",
        isfConfirmationNumber: apiData.interfaces.isfConfirmationNumber || "",
        interfaceNotes: apiData.interfaces.isfErrorDescription || "",
      });
    }
  }, [apiData, reset]);

  if (loading && !apiData) {
    return <Spinner label="Loading shipment contents..." />;
  }

  if (error) {
    return <div style={{ color: "red", padding: "20px" }}>Error: {error}</div>;
  }

  const moveOptions = apiData?.moveTypeOptions || [];
  const summary = apiData?.summary || {
    liftVans: 0,
    crates: 0,
    overflow: 0,
    airContainers: 0,
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Shipment Content</h2>
      <div className={styles.moveGrid}>
        <SharedDataGrid
          items={moveOptions}
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
        <span className={styles.quantity}>
          Lift Vans: {summary.liftVans || 0}
        </span>
        <span className={styles.quantity}>Crates: {summary.crates || 0}</span>
        <span className={styles.quantity}>
          Overflow: {summary.overflow || 0}
        </span>
        <span className={styles.quantity}>
          Air Containers: {summary.airContainers || 0}
        </span>
        <Button type="button" appearance="secondary">
          Vans
        </Button>
      </div>
    </section>
  );
};

export default ShipmentContent;
