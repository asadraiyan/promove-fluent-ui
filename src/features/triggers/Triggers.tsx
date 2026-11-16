import React, { useMemo, useRef, useState } from "react";
import { makeStyles, Text, tokens } from "@fluentui/react-components";

import { ModalTable } from "@/shared/components/Table/ModalTable";

import { ActionDetailsForm } from "./components/ActionDetailsForm";
import { TriggersHeader } from "./components/TriggersHeader";
import { INITIAL_ACTIONS, TRIGGER_ACTION_COLUMNS } from "./constants";
import type {
  TriggerActionFormValues,
  TriggerActionRecord,
  TriggerFilters,
} from "./Triggers.types";

const useStyles = makeStyles({
  page: {
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
    color: tokens.colorNeutralForeground1,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    maxWidth: "1600px",
    margin: "0 auto",
    padding: tokens.spacingHorizontalL,
  },
  panel: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    overflow: "hidden",
    minWidth: 0,
  },
  tableBody: {
    padding: tokens.spacingHorizontalM,
  },
  sectionHeading: {
    display: "block",
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    fontWeight: tokens.fontWeightSemibold,
  },
});

export const Triggers: React.FC = () => {
  const styles = useStyles();
  const [actions, setActions] = useState<TriggerActionRecord[]>(INITIAL_ACTIONS);
  const [appliedFilters, setAppliedFilters] = useState<TriggerFilters>({
    actionCode: "",
    group: "",
    owner: "",
    moveType: "",
  });
  const nextId = useRef(4);

  const visibleActions = useMemo(() => {
    const filters = {
      actionCode: appliedFilters.actionCode.toLowerCase(),
      group: appliedFilters.group.toLowerCase(),
      owner: appliedFilters.owner.toLowerCase(),
      moveType: appliedFilters.moveType.toLowerCase(),
    };

    return actions.filter(
      (action) =>
        (!filters.actionCode ||
          action.actionCode.toLowerCase().includes(filters.actionCode)) &&
        (!filters.group ||
          action.group.toLowerCase().includes(filters.group)) &&
        (!filters.owner ||
          action.owner.toLowerCase().includes(filters.owner)) &&
        (!filters.moveType ||
          action.moveType.toLowerCase().includes(filters.moveType)),
    );
  }, [actions, appliedFilters]);

const handleSave = (values: TriggerActionFormValues): boolean => {
  const isAnyFieldFilled = Object.values(values).some((value) =>
    String(value ?? "").trim()
  );

  if (!isAnyFieldFilled) {
    alert("Please fill at least one field before saving.");
    return false;
  }

  const now = new Date();

  setActions((current) => [
    ...current,
    {
      id: `trigger-action-${nextId.current++}`,
      actionCode: values.actionCode,
      event: values.eventDate,
      group: values.group,
      dueDate: values.dueDate,
      sequenceNumber: values.sequenceNumber,
      modificationUser: "CURRENT USER",
      modificationDate: now.toLocaleString(),
      assignee: values.assignee,
      owner: "",
      moveType: "",
    },
  ]);

  return true;
};

  const handleClearFilters = () => {
    setAppliedFilters({
      actionCode: "",
      group: "",
      owner: "",
      moveType: "",
    });
  };

  return (
    <main className={styles.page}>
      <TriggersHeader
        onFind={setAppliedFilters}
        onClear={handleClearFilters}
      />

      <div className={styles.content}>
        <section className={styles.panel} aria-labelledby="trigger-actions-title">
          <Text id="trigger-actions-title" className={styles.sectionHeading}>
            Actions
          </Text>
          <div className={styles.tableBody}>
            <ModalTable
              items={visibleActions}
              columns={TRIGGER_ACTION_COLUMNS}
              getRowId={(action) => action.id}
              compact
              fillWidth
              showEmptyState
              emptyState={<Text>No action details found.</Text>}
            />
          </div>
        </section>

        <section className={styles.panel} aria-label="Action details form">
          <ActionDetailsForm onSave={handleSave} />
        </section>
      </div>
    </main>
  );
};

export default Triggers;
