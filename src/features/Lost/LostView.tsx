import React, { useState } from "react";
import { makeStyles, tokens, Button, Text } from "@fluentui/react-components";
import { useForm } from "react-hook-form";
// import { FormInput } from "./FormInput"; // Adjust import path
// import { FormDropdown } from "./Dropdown"; // Adjust import path
// import { CommonEditDialog } from "./CommonEditDialog"; // Adjust import path
import {
  SharedDataGrid,
  type GridColumnDef,
} from "../../shared/components/Table/SharedDataGrid"; // Adjust import path
import { CommonEditDialog, FormDropdown, FormInput } from "@/shared";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    padding: tokens.spacingHorizontalL,
  },
  section: {
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    padding: tokens.spacingHorizontalM,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: tokens.spacingVerticalS,
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
  },
  competitorGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 300px",
    gap: tokens.spacingHorizontalL,
    alignItems: "start",
  },
  competitorForm: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingHorizontalM,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground2,
  },
  formActions: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    justifyContent: "flex-end",
    marginTop: tokens.spacingVerticalS,
  },
  detailsMessage: {
    padding: tokens.spacingVerticalM,
    color: tokens.colorNeutralForeground3,
  },
});

type CompetitorData = {
  id: string;
  competitor: string;
  price: string;
  description: string;
};

export const LostView = () => {
  const styles = useStyles();

  // State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLostConfirmed, setIsLostConfirmed] = useState(false);
  const [competitors, setCompetitors] = useState<CompetitorData[]>([]);

  // Forms
  const mainForm = useForm({
    defaultValues: {
      currentStatus: "Enquiry",
      lossReason: "",
      ourPrice: "",
    },
  });

  const compForm = useForm<CompetitorData>({
    defaultValues: {
      id: "",
      competitor: "",
      price: "",
      description: "",
    },
  });

  // Handlers
  const handleLostClick = () => {
    setIsModalOpen(true);
  };

  const handleModalConfirm = () => {
    setIsLostConfirmed(true);
    setIsModalOpen(false);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const handleSaveCompetitor = (data: CompetitorData) => {
    if (data.id) {
      // Update existing
      setCompetitors((prev) => prev.map((c) => (c.id === data.id ? data : c)));
    } else {
      // Add new
      const newComp = { ...data, id: Date.now().toString() };
      setCompetitors((prev) => [...prev, newComp]);
    }
    compForm.reset({ id: "", competitor: "", price: "", description: "" });
  };

  const handleNewCompetitor = () => {
    compForm.reset({ id: "", competitor: "", price: "", description: "" });
  };

  const handleEditCompetitor = (item: CompetitorData) => {
    compForm.reset(item);
  };

  // DataGrid Configurations
  const competitorColumns: GridColumnDef<CompetitorData>[] = [
    { key: "competitor", label: "Competitor" },
    { key: "price", label: "Price" },
    { key: "description", label: "Description" },
    // {
    //   key: "actions",
    //   label: "",
    //   sortable: false,
    //   renderCell: (item) => (
    //     <Button size="small" onClick={() => handleEditCompetitor(item)}>
    //       Edit
    //     </Button>
    //   ),
    // },
  ];

  const dummyHistory = [
    {
      id: "1",
      status: "Enquiry status to Lost",
      by: "Vias Palve",
      date: "03/11/2026 03:09:56",
    },
    {
      id: "2",
      status: "Enquiry status to Lost",
      by: "Antoinette Watson",
      date: "20/11/2018 17:36:20",
    },
  ];

  const historyColumns: GridColumnDef<any>[] = [
    { key: "status", label: "Status", minWidth: 200 },
    { key: "by", label: "By", minWidth: 150 },
    { key: "date", label: "Date", minWidth: 200 },
  ];

  return (
    <div className={styles.container}>
      {/* 1. Status Section */}
      <div className={styles.section}>
        <Text className={styles.sectionTitle}>- Status</Text>
        <div className={styles.row}>
          <FormDropdown
            name="currentStatus"
            control={mainForm.control}
            label="Current Status"
            labelPosition="left"
            options={[{ label: "Enquiry", value: "Enquiry" }]}
          />
          <Button onClick={handleLostClick}>Lost...</Button>
        </div>
      </div>

      {/* 2. Details Section */}
      <div className={styles.section}>
        <Text className={styles.sectionTitle}>- Details</Text>

        {!isLostConfirmed ? (
          <Text className={styles.detailsMessage}>
            Please refer to the Quotes screen for details on the issued Q
          </Text>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className={styles.row}>
              <FormDropdown
                name="lossReason"
                control={mainForm.control}
                label="Main reason for loss"
                labelPosition="left"
                options={[
                  { label: "Appt Cancelled", value: "Appt Cancelled" },
                  { label: "Budget", value: "Budget" },
                ]}
              />
              <FormInput
                name="ourPrice"
                control={mainForm.control}
                label="Our Price for a comparable service"
                labelPosition="left"
              />
            </div>

            <Text>Competitors:</Text>
            <div className={styles.competitorGrid}>
              <SharedDataGrid
                items={competitors}
                columns={competitorColumns}
                getRowId={(item) => item.id}
                showSearch={false}
              />

              <div className={styles.competitorForm}>
                <FormDropdown
                  name="competitor"
                  control={compForm.control}
                  label="Competitor"
                  options={[{ label: "Britannia", value: "Britannia" }]}
                />
                <FormInput
                  name="price"
                  control={compForm.control}
                  label="Price"
                  type="number"
                />
                <FormInput
                  name="description"
                  control={compForm.control}
                  label="Description"
                />
                <div className={styles.formActions}>
                  <Button
                    onClick={compForm.handleSubmit(handleSaveCompetitor)}
                    appearance="primary"
                  >
                    Save
                  </Button>
                  <Button onClick={handleNewCompetitor}>New</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Status Change History */}
      <div className={styles.section}>
        <Text className={styles.sectionTitle}>- Status Change History</Text>
        <SharedDataGrid
          items={dummyHistory}
          columns={historyColumns}
          getRowId={(item) => item.id}
          showSearch={false}
        />
      </div>

      {/* 4. Lost Confirmation Modal */}
      <CommonEditDialog
        open={isModalOpen}
        onClose={handleModalCancel}
        heading="Lost confirmation"
        showCloseButton
        content={
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <FormDropdown
              name="lossReason"
              control={mainForm.control}
              label="Main reason for loss"
              labelPosition="left"
              options={[
                { label: "Appt Cancelled", value: "Appt Cancelled" },
                { label: "Budget", value: "Budget" },
              ]}
            />
            <Text size={200} color="neutralForeground3">
              Note: you will be able to add information on competitors in the
              next screen.
            </Text>
          </div>
        }
        actions={[
          { label: "OK", onClick: handleModalConfirm, appearance: "primary" },
          { label: "Cancel", onClick: handleModalCancel },
        ]}
      />
    </div>
  );
};
