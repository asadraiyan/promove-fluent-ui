
import React from "react";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { makeStyles, tokens } from "@fluentui/react-components";
import { Control, useController } from "react-hook-form";

import {
  FieldLabel,
  FormDropdown,
  ResponsiveGrid,
  ResponsiveGridLabel,
} from "@/shared";

import { GoodsDropDetails } from "../SeaContainerDetails.types";
import { DROP_AT_OPTIONS } from "../constants";
import { formatDate, toDate } from "../SeaContainerDetails.utils";

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
  goodsDropGrid: {
    display: "flex",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    columnGap: tokens.spacingHorizontalL,
    rowGap: tokens.spacingVerticalM,
  },
  dateField: {
    gridTemplateColumns: "minmax(0, min(12rem, 40%)) minmax(0, 1fr)",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalM,
    minWidth: 0,
  },
  datePicker: {
    width: "100%",
    minWidth: 0,
  },
});

interface GoodsDropDetailsSectionProps {
  control: Control<GoodsDropDetails>;
}

const GoodsDropDetailsSection: React.FC<
  GoodsDropDetailsSectionProps
> = ({ control }) => {
  const styles = useStyles();

  const { field: dropDateField } = useController({
    name: "dropDate",
    control,
  });

  const { field: waitAndLoadDateTimeField } = useController({
    name: "waitAndLoadDateTime",
    control,
  });

  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>Goods Drop Details</h3>

      <ResponsiveGrid className={styles.goodsDropGrid}>
        <ResponsiveGrid className={styles.dateField}>
          <ResponsiveGridLabel>
            <FieldLabel htmlFor="dropDate">Drop date</FieldLabel>
          </ResponsiveGridLabel>

          <div>
            <DatePicker
              id="dropDate"
              className={styles.datePicker}
              placeholder="Select a date"
              value={toDate(dropDateField.value)}
              onSelectDate={(date) =>
                dropDateField.onChange(date ? formatDate(date) : "")
              }
              formatDate={(date) => (date ? formatDate(date) : "")}
            />
          </div>
        </ResponsiveGrid>

        <ResponsiveGrid className={styles.dateField}>
          <ResponsiveGridLabel>
            <FieldLabel htmlFor="waitAndLoadDateTime">
              Wait and Load date
            </FieldLabel>
          </ResponsiveGridLabel>

          <div>
            <DatePicker
              id="waitAndLoadDateTime"
              className={styles.datePicker}
              placeholder="Select a date"
              value={toDate(waitAndLoadDateTimeField.value)}
              onSelectDate={(date) =>
                waitAndLoadDateTimeField.onChange(
                  date ? formatDate(date) : "",
                )
              }
              formatDate={(date) => (date ? formatDate(date) : "")}
            />
          </div>
        </ResponsiveGrid>

        <FormDropdown
          name="dropAt"
          control={control}
          label="Drop at"
          labelPosition="left"
          placeholder="Select drop location"
          options={[
            ...DROP_AT_OPTIONS,
            { value: "Residence", label: "Residence" },
          ]}
        />
      </ResponsiveGrid>
    </section>
  );
};

export default GoodsDropDetailsSection;
