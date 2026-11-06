import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { makeStyles, tokens, Text, Button } from "@fluentui/react-components";
import type { MainFormValues } from "./types";
import mockData from "./data.json";
import { FormDropdown } from "@/shared";
import { InvoicingAddressDetailsModal } from "./components/InvoicingAddressDetailsModal";

const useStyles = makeStyles({
  container: {
    width: "100%",
    padding: tokens.spacingHorizontalL,
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXL,
  },
  section: {
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    padding: tokens.spacingHorizontalM,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  sectionHeader: {
    fontWeight: "bold",
    marginBottom: tokens.spacingVerticalM,
    display: "block",
  },
  inlineRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    marginBottom: tokens.spacingVerticalS,
  },
  dropdownWrapper: {
    flexGrow: 1,
    maxWidth: "500px",
  },
  helperText: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
    marginTop: tokens.spacingVerticalXS,
    display: "block",
  },
});

export const InvoicingAddress: React.FC = () => {
  const styles = useStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { control } = useForm<MainFormValues>({
    defaultValues: {
      accountInvoicingAddress: mockData.accountAddresses[0].value,
      customerInvoicingAddress: mockData.customerAddresses[0].value,
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <Text className={styles.sectionHeader}>
          - Account Invoicing Address
        </Text>

        <Text
          style={{ display: "block", marginBottom: tokens.spacingVerticalM }}
        >
          <strong>
            An invoicing address (or multiple invoice addresses) has already
            been set-up for this agent.
          </strong>
        </Text>

        <div className={styles.inlineRow}>
          <div className={styles.dropdownWrapper}>
            <FormDropdown
              name="accountInvoicingAddress"
              control={control}
              label="Invoicing address:"
              labelPosition="left"
              options={mockData.accountAddresses}
            />
          </div>
          <Button onClick={() => setIsModalOpen(true)}>Details...</Button>
        </div>

        <Text className={styles.helperText}>
          (Invoicing addresses with status Temporary are currently being
          validated by finance.)
        </Text>
      </div>

      <div className={styles.section}>
        <Text className={styles.sectionHeader}>
          - Customer Invoicing Address
        </Text>

        <div className={styles.dropdownWrapper} style={{ maxWidth: "600px" }}>
          <FormDropdown
            name="customerInvoicingAddress"
            control={control}
            label="The following address will be used for billing"
            labelPosition="left"
            options={mockData.customerAddresses}
          />
        </div>
      </div>

      <InvoicingAddressDetailsModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultValues={mockData.addressDetails}
        options={mockData.modalOptions}
      />
    </div>
  );
};
