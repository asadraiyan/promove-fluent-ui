import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { ResponsiveGrid } from "@/shared";
import { FormDate } from "@/shared/components/Date/FormDate";

const useStyles = makeStyles({
  section: {
    boxSizing: "border-box",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusSmall,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  heading: {
    margin: 0,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    color: tokens.colorNeutralForeground1,
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase400,
  },
  fields: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalL}`,
    padding: tokens.spacingHorizontalM,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    minWidth: 0,
  },
  field: {
    minWidth: 0,
    gridTemplateColumns: "minmax(150px, 1fr) minmax(120px, 0.8fr)",
    columnGap: tokens.spacingHorizontalXS,
    alignItems: "center",
    "& label": {
      justifySelf: "end",
      textAlign: "right",
      fontSize: tokens.fontSizeBase300,
      lineHeight: tokens.lineHeightBase300,
    },
    "& > div": {
      width: "100%",
      minWidth: 0,
    },
    "& input": {
      boxSizing: "border-box",
      width: "100%",
      minWidth: 0,
    },
  },
});

const PermStorage: React.FC = () => {
  const styles = useStyles();

  return (
    <section className={styles.section} aria-labelledby="perm-storage-heading">
      <h2 id="perm-storage-heading" className={styles.heading}>
        Perm Storage
      </h2>
      <ResponsiveGrid className={styles.fields}>
        <div className={styles.column}>
          <FormDate
            className={styles.field}
            orientation="horizontal"
            name="permStorageInDate"
            label="Perm Storage In Date"
          />
          <FormDate
            className={styles.field}
            orientation="horizontal"
            name="scheduledPermStorageOutDate"
            label="Scheduled Perm Storage Out Date"
          />
          <FormDate
            className={styles.field}
            orientation="horizontal"
            name="codConversionDate"
            label="COD Conversion Date"
          />
        </div>
        <div className={styles.column}>
          <div aria-hidden="true" />
          <FormDate
            className={styles.field}
            orientation="horizontal"
            name="actualPermStorageOutDate"
            label="Actual Perm Storage Out Date"
          />
        </div>
      </ResponsiveGrid>
    </section>
  );
};

export default PermStorage;