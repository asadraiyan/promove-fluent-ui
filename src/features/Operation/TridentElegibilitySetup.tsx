import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  makeStyles,
  tokens,
  Button,
  Input,
  Label,
  Text,
  Select,
} from "@fluentui/react-components";
import {
  AddRegular,
  DeleteRegular,
  SearchRegular,
  DismissRegular,
} from "@fluentui/react-icons";
import {
  FormDropdown,
  FormInput,
  GridColumnDef,
  SharedDataGrid,
  CommonEditDialog,
  CommonEditDialogAction,
} from "@/shared";
import { TridentAccount, ExcludedPerson, ModalFormData } from "./types";
import {
  initialAccounts,
  initialCoordinators,
  initialSupervisors,
  accountOptions,
  eligibilityOptions,
} from "./constants";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    padding: tokens.spacingHorizontalL,
    backgroundColor: tokens.colorNeutralBackground2,
    minHeight: "100vh",
    "@media (max-width: 768px)": {
      padding: tokens.spacingHorizontalS,
    },
  },
  headerBanner: {
    display: "flex",
    alignItems: "center",
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
  },
  filtersContainer: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
    alignItems: "flex-end",
    padding: tokens.spacingHorizontalM,
    flexWrap: "wrap",
  },
  filterGroup: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
  },
  bottomGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalL,
    "@media (max-width: 1024px)": {
      gridTemplateColumns: "1fr",
    },
  },
  tableSection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    overflowX: "auto",
  },
  inlineAddToolbar: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    alignItems: "center",
    flexWrap: "wrap",
  },
  dialogForm: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
});

export const TridentEligibilitySetup: React.FC = () => {
  const styles = useStyles();

  // State
  const [accounts, setAccounts] = useState<TridentAccount[]>(initialAccounts);
  const [coordinators, setCoordinators] =
    useState<ExcludedPerson[]>(initialCoordinators);
  const [supervisors, setSupervisors] =
    useState<ExcludedPerson[]>(initialSupervisors);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Local state for the small tables' dropdowns
  const [selectedCoordinator, setSelectedCoordinator] = useState("");
  const [selectedSupervisor, setSelectedSupervisor] = useState("");

  // Modal Form Setup
  const { control, handleSubmit, reset, setValue } = useForm<ModalFormData>({
    defaultValues: { account: "", sfdc: "", address: "", eligibility: "" },
  });

  // --- Handlers ---
  const handleAccountSelection = (value: string) => {
    const selected = accountOptions.find((opt) => opt.value === value);
    if (selected) {
      setValue("sfdc", selected.sfdc, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue("address", selected.address, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  };

  const handleAddAccount = (data: ModalFormData) => {
    const newAccount: TridentAccount = {
      id: Math.random().toString(),
      account: data.account,
      sfdc: data.sfdc,
      address: data.address,
      eligibility: data.eligibility,
    };
    setAccounts([newAccount, ...accounts]);
    setIsModalOpen(false);
    reset();
  };

  const handleAddCoordinator = () => {
    if (!selectedCoordinator) return;
    setCoordinators([
      { id: Math.random().toString(), name: selectedCoordinator },
      ...coordinators,
    ]);
    setSelectedCoordinator("");
  };

  const handleAddSupervisor = () => {
    if (!selectedSupervisor) return;
    setSupervisors([
      { id: Math.random().toString(), name: selectedSupervisor },
      ...supervisors,
    ]);
    setSelectedSupervisor("");
  };

  // --- Column Definitions ---
  const accountColumns: GridColumnDef<TridentAccount>[] = [
    { key: "account", label: "Account", minWidth: 200 },
    { key: "sfdc", label: "SFDC", minWidth: 100 },
    { key: "address", label: "Address", minWidth: 250 },
    { key: "eligibility", label: "Trident Eligibility", minWidth: 150 },
    {
      key: "actions" as keyof TridentAccount,
      label: "",
      minWidth: 50,
      renderCell: (item) => (
        <Button
          icon={<DeleteRegular />}
          appearance="subtle"
          onClick={() => setAccounts(accounts.filter((a) => a.id !== item.id))}
          aria-label="Delete"
        />
      ),
    },
  ];

  const coordinatorColumns: GridColumnDef<ExcludedPerson>[] = [
    { key: "name", label: "Shipment Coordinator", minWidth: 200 },
    {
      key: "actions" as keyof ExcludedPerson,
      label: "",
      minWidth: 50,
      renderCell: (item) => (
        <Button
          icon={<DeleteRegular />}
          appearance="subtle"
          onClick={() =>
            setCoordinators(coordinators.filter((c) => c.id !== item.id))
          }
        />
      ),
    },
  ];

  const supervisorColumns: GridColumnDef<ExcludedPerson>[] = [
    { key: "name", label: "Supervisor", minWidth: 200 },
    {
      key: "actions" as keyof ExcludedPerson,
      label: "",
      minWidth: 50,
      renderCell: (item) => (
        <Button
          icon={<DeleteRegular />}
          appearance="subtle"
          onClick={() =>
            setSupervisors(supervisors.filter((s) => s.id !== item.id))
          }
        />
      ),
    },
  ];

  // --- Dialog Configuration ---
  const dialogActions: CommonEditDialogAction[] = [
    {
      label: "Cancel",
      onClick: () => {
        setIsModalOpen(false);
        reset();
      },
      appearance: "secondary",
    },
    {
      label: "Add",
      onClick: handleSubmit(handleAddAccount),
      appearance: "primary",
    },
  ];

  const dialogContent = (
    <div className={styles.dialogForm}>
      <FormDropdown
        name="account"
        control={control}
        label="Account:"
        labelPosition="left"
        options={accountOptions}
        onChange={handleAccountSelection}
      />
      <FormInput
        name="sfdc"
        control={control}
        label="SFDC:"
        labelPosition="left"
      />
      <FormInput
        name="address"
        control={control}
        label="Address:"
        labelPosition="left"
      />
      <FormDropdown
        name="eligibility"
        control={control}
        label="Trident Eligibility:"
        labelPosition="left"
        options={eligibilityOptions}
      />
    </div>
  );

  return (
    <div className={styles.root}>
      {/* Header & Global Filters */}
      <div>
        <div className={styles.filtersContainer}>
          <div className={styles.headerBanner}>
            <Text weight="semibold" size={400}>
              Trident Eligibility Setup
            </Text>
          </div>
          <div className={styles.filterGroup}>
            <Label>Account</Label>
            <Input />
          </div>
          <div className={styles.filterGroup}>
            <Label>SFDC</Label>
            <Input />
          </div>
          <Button icon={<SearchRegular />}>Find</Button>
          <Button icon={<DismissRegular />}>Clear</Button>
        </div>
      </div>

      {/* Main Table: Trident Accounts */}
      <div className={styles.tableSection}>
        <Text weight="semibold">Trident Accounts</Text>
        <SharedDataGrid
          items={accounts}
          columns={accountColumns}
          getRowId={(item) => item.id}
          pageSize={10}
          showSearch={false}
          toolbarActions={
            <Button icon={<AddRegular />} onClick={() => setIsModalOpen(true)}>
              New Account
            </Button>
          }
        />
      </div>

      {/* Bottom Tables */}
      <div className={styles.bottomGrid}>
        {/* Coordinators Table */}
        <div className={styles.tableSection}>
          <Text weight="semibold">Excluded Shipment Coordinators</Text>
          <div className={styles.inlineAddToolbar}>
            <Select
              value={selectedCoordinator}
              onChange={(e) => setSelectedCoordinator(e.target.value)}
            >
              <option value="">Select Coordinator...</option>
              <option value="Neelam Tiwana">Neelam Tiwana</option>
              <option value="Renata Kowalczyk">Renata Kowalczyk</option>
              <option value="104201099">104201099</option>
            </Select>
            <Button appearance="primary" onClick={handleAddCoordinator}>
              Save
            </Button>
          </div>
          <SharedDataGrid
            items={coordinators}
            columns={coordinatorColumns}
            getRowId={(item) => item.id}
            showSearch={false}
          />
        </div>

        {/* Supervisors Table */}
        <div className={styles.tableSection}>
          <Text weight="semibold">Excluded Supervisors</Text>
          <div className={styles.inlineAddToolbar}>
            <Select
              value={selectedSupervisor}
              onChange={(e) => setSelectedSupervisor(e.target.value)}
            >
              <option value="">Select Supervisor...</option>
              <option value="Kim Kalata">Kim Kalata</option>
              <option value="Lucrecia Sikora">Lucrecia Sikora</option>
              <option value="Adam Bowles">Adam Bowles</option>
            </Select>
            <Button appearance="primary" onClick={handleAddSupervisor}>
              Save
            </Button>
          </div>
          <SharedDataGrid
            items={supervisors}
            columns={supervisorColumns}
            getRowId={(item) => item.id}
            showSearch={false}
          />
        </div>
      </div>

      {/* Add New Trident Account Modal */}
      <CommonEditDialog
        open={isModalOpen}
        heading="Add New Trident Account"
        content={dialogContent}
        actions={dialogActions}
        onClose={() => setIsModalOpen(false)}
        showCloseButton={true}
        maxWidth="600px"
      />
    </div>
  );
};
