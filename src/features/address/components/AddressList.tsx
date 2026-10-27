import React, { useEffect, useMemo } from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { GridColumnDef, SharedDataGrid } from "@/shared";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  AddressListRow,
  loadAddressList,
} from "../reducers/addressListSlice";
import { loadAddressDetails } from "../reducers/addressDetailsSlice";
import { ModalTable } from "@/shared/components/Table/ModalTable";

interface AddressListProps {
  salesFileId?: number;
}

const useStyles = makeStyles({
  container: {
    boxSizing: "border-box",
    width: "calc(100% - 32px)",
    maxWidth: "1200px",
    margin: "24px auto",
    padding: tokens.spacingVerticalM,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusSmall,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  heading: {
    margin: `0 0 ${tokens.spacingVerticalM}`,
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase400,
  },
});

const AddressList: React.FC<AddressListProps> = ({ salesFileId }) => {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const { rows, status, error } = useAppSelector(
    (state) => state.addressList,
  );

  const columns = useMemo<GridColumnDef<AddressListRow>[]>(
    () => [
      { key: "addressType", label: "Type", minWidth: 140 },
      { key: "name", label: "Name", minWidth: 180 },
      { key: "address", label: "Address", minWidth: 240 },
      { key: "city", label: "City", minWidth: 140 },
      { key: "country", label: "Country", minWidth: 160 },
    ],
    [],
  );

  useEffect(() => {
    dispatch(loadAddressList(salesFileId));
  }, [dispatch, salesFileId]);

  return (
    <section className={styles.container} aria-labelledby="address-list-heading">
      <h2 id="address-list-heading" className={styles.heading}>
        Address List
      </h2>
      {error && <div role="alert">{error}</div>}
      <ModalTable<AddressListRow>
        items={rows}
        columns={columns}
        getRowId={(row) => String(row.addressId)}
        onRowClick={(row) => dispatch(loadAddressDetails(row.addressId))}
        emptyState={
          status === "loading"
            ? "Loading addresses..."
            : status === "failed"
              ? "Addresses could not be loaded."
              : "No addresses found."
        }
      />
    </section>
  );
};

export default AddressList;
