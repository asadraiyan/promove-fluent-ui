import React from "react";
import { useForm } from "react-hook-form";
import { makeStyles, Text, tokens } from "@fluentui/react-components";
import { Button, FormDropdown, FormInput, ResponsiveGrid } from "@/shared";
import {
  QUOTE_LEAD_OPTIONS,
  QUOTE_RAISED_BY_OPTIONS,
} from "../QuoteDetails/constants";

interface HeaderValues {
  quote: string;
  account: string;
  lastName: string;
  quoteLead: string;
  promove: string;
  bookingAgent: string;
  raisedBy: string;
}

const EMPTY_HEADER_VALUES: HeaderValues = {
  quote: "",
  account: "",
  lastName: "",
  quoteLead: "find-quotes",
  promove: "",
  bookingAgent: "",
  raisedBy: "aaron-thompson",
};

const useStyles = makeStyles({
  header: {
    display: "grid",
    gridTemplateColumns: "minmax(160px, 0.7fr) minmax(0, 4fr)",
    alignItems: "stretch",
    // backgroundColor: "#159c9c",
    // color: "#102d3e",
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  title: {
    display: "flex",
    alignItems: "center",
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
    // backgroundColor: "#12344a",
    // color: "#ffffff",
  },
  content: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalM,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    minWidth: 0,
  },
  fields: {
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    alignItems: "center",
    flex: "1 1 720px",
    gap: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    minWidth: 0,
  },
  actions: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    marginLeft: "auto",
  },
});

export const QuoteHeader: React.FC = () => {
  const styles = useStyles();
  const { control, reset } = useForm<HeaderValues>({
    defaultValues: EMPTY_HEADER_VALUES,
  });

  return (
    <header>
      <ResponsiveGrid className={styles.header}>
        <Text size={500} weight="semibold" className={styles.title}>
          Quote/Variation
        </Text>
        <div className={styles.content}>
          <ResponsiveGrid className={styles.fields}>
            <FormInput
              name="quote"
              control={control}
              label="Quote"
              labelPosition="left"
              ariaLabel="Quote"
            />
            <FormInput
              name="account"
              control={control}
              label="Account"
              labelPosition="left"
              ariaLabel="Account"
            />
            <FormInput
              name="lastName"
              control={control}
              label="Last Name"
              labelPosition="left"
              ariaLabel="Last Name"
            />
            <FormDropdown
              name="quoteLead"
              control={control}
              label="Quote/Lead"
              labelPosition="left"
              options={QUOTE_LEAD_OPTIONS}
            />
            <FormInput
              name="promove"
              control={control}
              label="Promove#"
              labelPosition="left"
              ariaLabel="Promove#"
            />
            <FormInput
              name="bookingAgent"
              control={control}
              label="Booking Agent"
              labelPosition="left"
              ariaLabel="Booking Agent"
            />
            <FormDropdown
              name="raisedBy"
              control={control}
              label="Quote Raised By"
              labelPosition="left"
              options={QUOTE_RAISED_BY_OPTIONS}
            />
          </ResponsiveGrid>
          <div className={styles.actions}>
            <Button type="button">Find</Button>
            <Button
              type="button"
              onClick={() => reset(EMPTY_HEADER_VALUES)}
            >
              Clear
            </Button>
          </div>
        </div>
      </ResponsiveGrid>
    </header>
  );
};
