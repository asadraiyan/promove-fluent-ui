import React, { useState } from "react";
import {
  Button as FluentButton,
  makeStyles,
  Text,
  tokens,
} from "@fluentui/react-components";
import { Dropdown, InputField, ResponsiveGrid } from "@/shared";
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
  field: {
    display: "grid",
    gridTemplateColumns: "minmax(72px, auto) minmax(0, 1fr)",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    minWidth: 0,
  },
  fieldLabel: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    whiteSpace: "nowrap",
  },
  actions: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    marginLeft: "auto",
  },
});

export const QuoteHeader: React.FC = () => {
  const styles = useStyles();
  const [values, setValues] = useState<HeaderValues>(EMPTY_HEADER_VALUES);
  const update = (key: keyof HeaderValues, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const inputField = (
    key: "quote" | "account" | "lastName" | "promove" | "bookingAgent",
    label: string,
  ) => (
    <div className={styles.field} key={key}>
      <label className={styles.fieldLabel} htmlFor={`quote-header-${key}`}>
        {label}
      </label>
      <InputField
        id={`quote-header-${key}`}
        ariaLabel={label}
        value={values[key]}
        onChange={(value) => update(key, value)}
      />
    </div>
  );

  return (
    <header>
      <ResponsiveGrid className={styles.header}>
        <Text size={500} weight="semibold" className={styles.title}>
          Quote/Variation
        </Text>
        <div className={styles.content}>
          <ResponsiveGrid className={styles.fields}>
            {inputField("quote", "Quote")}
            {inputField("account", "Account")}
            {inputField("lastName", "Last Name")}
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="quote-header-lead">
                Quote/Lead
              </label>
              <Dropdown
                id="quote-header-lead"
                ariaLabel="Quote or lead filter"
                options={QUOTE_LEAD_OPTIONS}
                value={values.quoteLead}
                onChange={(value) => update("quoteLead", value)}
              />
            </div>
            {inputField("promove", "Promove#")}
            {inputField("bookingAgent", "Booking Agent")}
            <div className={styles.field}>
              <label
                className={styles.fieldLabel}
                htmlFor="quote-header-raised-by"
              >
                Quote Raised By
              </label>
              <Dropdown
                id="quote-header-raised-by"
                ariaLabel="Quote raised by"
                options={QUOTE_RAISED_BY_OPTIONS}
                value={values.raisedBy}
                onChange={(value) => update("raisedBy", value)}
              />
            </div>
          </ResponsiveGrid>
          <div className={styles.actions}>
            <FluentButton type="button">Find</FluentButton>
            <FluentButton
              type="button"
              onClick={() => setValues(EMPTY_HEADER_VALUES)}
            >
              Clear
            </FluentButton>
          </div>
        </div>
      </ResponsiveGrid>
    </header>
  );
};
