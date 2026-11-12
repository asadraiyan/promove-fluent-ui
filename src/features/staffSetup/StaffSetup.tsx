import React, { useMemo, useState } from "react";
import { makeStyles, Text, tokens } from "@fluentui/react-components";
import { useForm } from "react-hook-form";

import { ResponsiveGrid } from "@/shared";
import { Button } from "@/shared/components/Button/Button";
import { ModalTable } from "@/shared/components/Table/ModalTable";

import {
  EMPTY_STAFF_FORM,
  STAFF_COLUMNS,
} from "./constants";

import type {
  StaffFormValues,
  StaffRecord,
} from "./StaffSetup.types";

import { StaffSetupHeader } from "./components/StaffSetupHeader";
import { StaffDetailsSection } from "./components/StaffDetailsSection";
import { StaffAssignmentSection } from "./components/StaffAssignmentSection";
import { AdminStaffSection } from "./components/AdminStaffSection";
import { LoginSecuritySection } from "./components/LoginSecuritySection";

const useStyles = makeStyles({
  page: {
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
    color: tokens.colorNeutralForeground1,
  },

  content: {
    padding: tokens.spacingHorizontalL,
    maxWidth: "1600px",
    margin: "0 auto",
  },

  workspace: {
    gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)",
    gap: tokens.spacingHorizontalL,
    alignItems: "start",
    width: "100%",
  },

  panel: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    overflow: "hidden",
    minWidth: 0,
  },

  panelTitle: {
    display: "block",
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    fontWeight: tokens.fontWeightSemibold,
  },

  tableBody: {
    padding: tokens.spacingHorizontalM,
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingHorizontalM,
    minWidth: 0,
  },

  formFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalM,
  },
});

const recordToForm = (record: StaffRecord): StaffFormValues => ({
  ownerCode: record.ownerCode,
  region: record.region,
  pmUserId: record.pmUserId,
  title: record.title,
  firstName: record.firstName,
  lastName: record.lastName,
  status: record.status,
  crewMember: record.crewMember,
  crewRole: record.crewRole,
  initials: record.initials,
  timeCardRef: record.timeCardRef,
  niRef: record.niRef,
  toleranceLevel: record.toleranceLevel,
  phoneCode: record.phoneCode,
  phone: record.phone,
  faxCode: record.faxCode,
  fax: record.fax,
  email: record.email,
  email2: record.email2,
  email3: record.email3,
  marginNegative: record.marginNegative,
  ccaMember: record.ccaMember,
  marginPositive: record.marginPositive,
  supervisor: record.supervisor,
  team: record.team,
  login: record.login,
  permissions: record.permissions
    ? record.permissions.split("|")
    : [],
});

export const StaffSetup: React.FC = () => {
  const styles = useStyles();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    getValues,
    setValue,
  } = useForm<StaffFormValues>({
    defaultValues: EMPTY_STAFF_FORM,
  });

  const formValues = watch();

  const [staff, setStaff] = useState<StaffRecord[]>([]);
  const [selectedId, setSelectedId] = useState("");

  const [filterRegion, setFilterRegion] = useState("");
  const [filterLastName, setFilterLastName] = useState("");

  const [appliedRegion, setAppliedRegion] = useState("");
  const [appliedLastName, setAppliedLastName] = useState("");

  const visibleStaff = useMemo(
    () =>
      staff.filter(
        (record) =>
          (!appliedRegion || record.region === appliedRegion) &&
          (!appliedLastName ||
            record.lastName
              .toLowerCase()
              .includes(appliedLastName.toLowerCase())),
      ),
    [staff, appliedRegion, appliedLastName],
  );

const handleSave = (data: StaffFormValues) => {
  if (
    !data.ownerCode.trim() ||
    !data.firstName.trim() ||
    !data.lastName.trim()
  ) {
    alert("Owner code, first name, and last name are required.");
    return;
  }

  const record: StaffRecord = {
    ...data,
    permissions: data.permissions.join("|"),
    id: selectedId || `${Date.now()}`,
    ownerCode: data.ownerCode.trim(),
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
  };

  setStaff((previous) =>
    selectedId
      ? previous.map((item) =>
          item.id === selectedId ? record : item,
        )
      : [...previous, record],
  );

  setSelectedId("");
  reset(EMPTY_STAFF_FORM);
};


  const handleSelectStaff = (record: StaffRecord) => {
    setSelectedId(record.id);
    reset(recordToForm(record));
  };

  const handleClearFilters = () => {
    setFilterRegion("");
    setFilterLastName("");
    setAppliedRegion("");
    setAppliedLastName("");
  };

  const handleNewStaff = () => {
    setSelectedId("");
    reset(EMPTY_STAFF_FORM);
  };

  return (
    <main className={styles.page}>
      <StaffSetupHeader
        region={filterRegion}
        lastName={filterLastName}
        onRegionChange={setFilterRegion}
        onLastNameChange={setFilterLastName}
        onClear={handleClearFilters}
      />

      <div className={styles.content}>
        <ResponsiveGrid className={styles.workspace}>
          {/* Staff list */}
          <section
            className={styles.panel}
            aria-labelledby="staff-list-title"
          >
            <Text
              id="staff-list-title"
              className={styles.panelTitle}
            >
              Staff list
            </Text>

            <div className={styles.tableBody}>
              <ModalTable
                items={visibleStaff}
                columns={STAFF_COLUMNS}
                getRowId={(record) => record.id}
                compact
                fillWidth
                showEmptyState
                emptyState={<Text>No staff records found.</Text>}
                onRowClick={handleSelectStaff}
              />
            </div>
          </section>

          {/* Staff form */}
          <section
            className={styles.panel}
            aria-label="Staff details"
          >
            <form
              className={styles.form}
              onSubmit={handleSubmit(handleSave)}
            >
              <StaffDetailsSection control={control} />

              <StaffAssignmentSection control={control} />

              <AdminStaffSection control={control} />

              <LoginSecuritySection
                control={control}
                permissions={formValues.permissions}
                getValues={getValues}
                setValue={setValue}
              />

              <div className={styles.formFooter}>
                <Button
                  type="button"
                  onClick={handleNewStaff}
                >
                  New staff
                </Button>

                <Button
                  appearance="primary"
                  type="submit"
                >
                  Save
                </Button>
              </div>
            </form>
          </section>
        </ResponsiveGrid>
      </div>
    </main>
  );
};

export default StaffSetup;