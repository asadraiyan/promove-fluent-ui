
import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";

import { ModalTable, type GridColumnDef } from "@/shared/components/Table/ModalTable";

import { ContainerRow } from "../SeaContainerDetails.types";

const useStyles = makeStyles({
  section: {
    paddingTop: tokens.spacingVerticalM,
  },
  sectionTitle: {
    margin: 0,
    marginBottom: tokens.spacingVerticalS,
    color: tokens.colorNeutralForeground4,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
  },
});

interface ContainerListSectionProps {
  containers: ContainerRow[];
  columns: GridColumnDef<ContainerRow>[];
}

const ContainerListSection: React.FC<ContainerListSectionProps> = ({
  containers,
  columns,
}) => {
  const styles = useStyles();

  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>Containers</h3>

      <ModalTable<ContainerRow>
        items={containers}
        columns={columns}
        getRowId={(container) => container.id}
        compact
        emptyState="No containers added yet."
      />
    </section>
  );
};

export default ContainerListSection;
