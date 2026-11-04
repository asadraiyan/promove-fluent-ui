import React, { useState } from "react";
import { makeStyles, tokens, Button, Text } from "@fluentui/react-components";
import { useForm } from "react-hook-form";
import {
  SharedDataGrid,
  type GridColumnDef,
} from "../../shared/components/Table/SharedDataGrid";
import { CommonEditDialog, FormDropdown, FormInput } from "@/shared";

import type { CompetitorData, HistoryData } from "./lostView.types";
import viewData from "../../mocks/data/lost/lostData.json";

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
    overflow: "hidden",
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: tokens.spacingVerticalS,
  },
  row: {
    display: "flex",
    alignItems: "end",
    gap: tokens.spacingHorizontalM,
    flexWrap: "wrap",
  },
  competitorLayout: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalL,
    alignItems: "start",
  },
  tableWrapper: {
    flex: "1 1 300px",
    maxWidth: "800px",
    width: "100%",
    overflowX: "auto",
  },
  competitorForm: {
    flex: "1 1 250px",
    maxWidth: "350px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingHorizontalM,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground2,
    boxSizing: "border-box",
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
  clickableCell: {
    cursor: "pointer",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
});

export const LostView = () => {
  const styles = useStyles();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLostConfirmed, setIsLostConfirmed] = useState(false);
  const [competitors, setCompetitors] = useState<CompetitorData[]>([]);
  const [history, setHistory] = useState<HistoryData[]>(
    viewData.initialHistory,
  );

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

  const handleLostClick = () => {
    setIsModalOpen(true);
  };

  const handleModalConfirm = () => {
    setIsLostConfirmed(true);
    setIsModalOpen(false);
    mainForm.setValue("currentStatus", "Lost");

    setHistory((prev) => [
      {
        id: Date.now().toString(),
        status: "Enquiry status to Lost",
        by: "Current User",
        date: new Date().toLocaleString(),
      },
      ...prev,
    ]);
  };

  const handleUndoClick = () => {
    setIsLostConfirmed(false);
    mainForm.setValue("currentStatus", "Enquiry");
    mainForm.resetField("lossReason");
    mainForm.resetField("ourPrice");

    setCompetitors([]);
    compForm.reset({ id: "", competitor: "", price: "", description: "" });

    setHistory((prev) => [
      {
        id: Date.now().toString(),
        status: "Lost status to Enquiry",
        by: "Current User",
        date: new Date().toLocaleString(),
      },
      ...prev,
    ]);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const handleSaveCompetitor = (data: CompetitorData) => {
    if (data.id) {
      setCompetitors((prev) => prev.map((c) => (c.id === data.id ? data : c)));
    } else {
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

  const competitorColumns: GridColumnDef<CompetitorData>[] = [
    {
      key: "competitor",
      minWidth: 150,
      label: "Competitor",
      renderCell: (item) => (
        <div
          className={styles.clickableCell}
          onClick={() => handleEditCompetitor(item)}
        >
          {item.competitor}
        </div>
      ),
    },
    {
      key: "price",
      minWidth: 100,
      label: "Price",
      renderCell: (item) => (
        <div
          className={styles.clickableCell}
          onClick={() => handleEditCompetitor(item)}
        >
          {item.price}
        </div>
      ),
    },
    {
      key: "description",
      minWidth: 150,
      label: "Description",
      renderCell: (item) => (
        <div
          className={styles.clickableCell}
          onClick={() => handleEditCompetitor(item)}
        >
          {item.description}
        </div>
      ),
    },
  ];

  const historyColumns: GridColumnDef<HistoryData>[] = [
    { key: "status", label: "Status", minWidth: 150 },
    { key: "by", label: "By", minWidth: 120 },
    { key: "date", label: "Date", minWidth: 150 },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <Text className={styles.sectionTitle}>- Status</Text>
        <div className={styles.row}>
          <FormInput
            name="currentStatus"
            control={mainForm.control}
            label="Current Status"
            labelPosition="left"
          />
          {!isLostConfirmed ? (
            <Button onClick={handleLostClick}>Lost...</Button>
          ) : (
            <Button onClick={handleUndoClick}>Undo</Button>
          )}
        </div>
      </div>

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
                options={viewData.lossReasonOptions}
              />
              <FormInput
                name="ourPrice"
                control={mainForm.control}
                label="Our Price for a comparable service"
                labelPosition="left"
              />
            </div>

            <Text>Competitors:</Text>
            <div className={styles.competitorLayout}>
              <div className={styles.tableWrapper}>
                <SharedDataGrid
                  items={competitors}
                  columns={competitorColumns}
                  getRowId={(item) => item.id}
                  showSearch={false}
                  selectionMode="single"
                />
              </div>

              <div className={styles.competitorForm}>
                <FormDropdown
                  name="competitor"
                  control={compForm.control}
                  label="Competitor"
                  placeholder="Select a competitor"
                  options={viewData.competitorOptions}
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

      <div className={styles.section}>
        <Text className={styles.sectionTitle}>- Status Change History</Text>
        <SharedDataGrid
          items={history}
          columns={historyColumns}
          getRowId={(item) => item.id}
          showSearch={false}
        />
      </div>

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
              options={viewData.lossReasonOptions}
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
