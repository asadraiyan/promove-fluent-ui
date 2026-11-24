import React, { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  Button,
  Text,
  makeStyles,
  mergeClasses,
  tokens,
} from "@fluentui/react-components";
import { ChevronDownRegular, ChevronRightRegular } from "@fluentui/react-icons";
import { QuoteHistoryFilterState, QuoteHistoryItem } from "./types";
import {
  DEFAULT_QUOTE_HISTORY_FILTERS,
  FORM_FILTER_OPTIONS,
  INITIAL_QUOTE_HISTORY_ITEMS,
  QUOTE_HISTORY_COLUMNS,
} from "./contants";
import { SharedDataGrid, FormDropdown, FormDate } from "@/shared";

interface QuoteHistorySectionProps {
  items?: QuoteHistoryItem[];
  onSearch?: (filters: QuoteHistoryFilterState) => void;
}

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    width: "100%",
    minWidth: 0,
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  collapseButton: {
    minWidth: "auto",
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalXXS}`,
  },
  filterBar: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalL,
    rowGap: tokens.spacingVerticalS,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    color: tokens.colorNeutralForegroundOnBrand,
    borderRadius: tokens.borderRadiusSmall,
    "@media (max-width: 767px)": {
      flexDirection: "column",
      alignItems: "stretch",
      gap: tokens.spacingVerticalS,
      padding: tokens.spacingVerticalS,
    },
  },
  filterGroup: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    "@media (max-width: 767px)": {
      flexDirection: "column",
      alignItems: "stretch",
      gap: tokens.spacingVerticalXXS,
    },
  },
  filterLabel: {
    color: tokens.colorNeutralForegroundOnBrand,
    whiteSpace: "nowrap",
  },
  dateField: {
    width: "160px",
    minWidth: 0,
    "@media (max-width: 767px)": {
      width: "100%",
    },
    "& .fui-Field__label": {
      display: "none",
    },
    "& .fui-DatePicker": {
      width: "100%",
      minWidth: 0,
      backgroundColor: tokens.colorNeutralBackground1,
    },
  },
  formDropdown: {
    width: "140px",
    minWidth: 0,
    backgroundColor: tokens.colorNeutralBackground1,
    "@media (max-width: 767px)": {
      width: "100%",
    },
  },
  buttonGroup: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    marginLeft: "auto",
    "@media (max-width: 767px)": {
      marginLeft: 0,
      width: "100%",
      justifyContent: "flex-end",
      paddingTop: tokens.spacingVerticalXXS,
    },
  },
  actionButton: {
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground2,
    },
    "@media (max-width: 767px)": {
      flex: 1,
    },
  },
  gridContainer: {
    width: "100%",
    minWidth: 0,
  },
});

export const QuoteHistorySection: React.FC<QuoteHistorySectionProps> = ({
  items = INITIAL_QUOTE_HISTORY_ITEMS,
  onSearch,
}) => {
  const styles = useStyles();

  const [isExpanded, setIsExpanded] = useState(true);
  const [appliedFilters, setAppliedFilters] = useState<QuoteHistoryFilterState>(
    DEFAULT_QUOTE_HISTORY_FILTERS,
  );

  const { control, reset, getValues } = useForm<QuoteHistoryFilterState>({
    defaultValues: DEFAULT_QUOTE_HISTORY_FILTERS,
  });

  const watchedFilters = useWatch({ control });

  useEffect(() => {
    setAppliedFilters((prev) => ({
      ...prev,
      changeDateStart:
        watchedFilters.changeDateStart ??
        DEFAULT_QUOTE_HISTORY_FILTERS.changeDateStart,
    }));
  }, [watchedFilters.changeDateStart]);

  const formOptions = useMemo(() => {
    const uniqueForms = Array.from(
      new Set(
        items
          .map((item) => item.form)
          .filter((form): form is string => Boolean(form)),
      ),
    );

    const dynamicOptions = uniqueForms
      .filter((form) => !FORM_FILTER_OPTIONS.some((opt) => opt.value === form))
      .map((form) => ({ label: form, value: form }));

    return [...FORM_FILTER_OPTIONS, ...dynamicOptions];
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (
        appliedFilters.form &&
        appliedFilters.form !== "ALL" &&
        item.form !== appliedFilters.form
      ) {
        return false;
      }

      if (
        appliedFilters.changeDateStart &&
        item.changedDateIso < appliedFilters.changeDateStart
      ) {
        return false;
      }

      if (
        appliedFilters.changeDateEnd &&
        item.changedDateIso > appliedFilters.changeDateEnd
      ) {
        return false;
      }

      return true;
    });
  }, [items, appliedFilters]);

  const handleFind = () => {
    const currentValues = getValues();
    setAppliedFilters({ ...currentValues });
    onSearch?.(currentValues);
  };

  const handleClear = () => {
    const cleared: QuoteHistoryFilterState = {
      changeDateStart: "",
      changeDateEnd: "",
      form: "ALL",
    };
    reset(cleared);
    setAppliedFilters(cleared);
    onSearch?.(cleared);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.sectionHeader}>
        <Button
          appearance="subtle"
          size="small"
          className={styles.collapseButton}
          icon={isExpanded ? <ChevronDownRegular /> : <ChevronRightRegular />}
          aria-label={
            isExpanded ? "Collapse Quote History" : "Expand Quote History"
          }
          onClick={() => setIsExpanded((prev) => !prev)}
        />
        <Text weight="semibold" size={300}>
          Quote History
        </Text>
      </div>

      {isExpanded && (
        <>
          <div className={styles.filterBar}>
            <div className={styles.filterGroup}>
              <Text size={200} weight="semibold" className={styles.filterLabel}>
                Change Date (Start):
              </Text>
              <FormDate
                name="changeDateStart"
                label="Change Date (Start)"
                control={control as any}
                className={styles.dateField}
                placeholder="YYYY-MM-DD"
              />
            </div>

            <div className={styles.filterGroup}>
              <Text size={200} weight="semibold" className={styles.filterLabel}>
                Change Date (End):
              </Text>
              <FormDate
                name="changeDateEnd"
                label="Change Date (End)"
                control={control as any}
                className={styles.dateField}
                placeholder="YYYY-MM-DD"
              />
            </div>

            <div className={styles.filterGroup}>
              <Text size={200} weight="semibold" className={styles.filterLabel}>
                Form:
              </Text>
              <FormDropdown
                name="form"
                control={control}
                className={styles.formDropdown}
                options={formOptions}
                defaultValue={DEFAULT_QUOTE_HISTORY_FILTERS.form}
              />
            </div>

            <div className={mergeClasses(styles.buttonGroup)}>
              <Button
                size="small"
                appearance="secondary"
                className={styles.actionButton}
                onClick={handleFind}
              >
                Find
              </Button>
              <Button
                size="small"
                appearance="secondary"
                className={styles.actionButton}
                onClick={handleClear}
              >
                Clear
              </Button>
            </div>
          </div>

          <div className={styles.gridContainer}>
            <SharedDataGrid<QuoteHistoryItem>
              items={filteredItems}
              columns={QUOTE_HISTORY_COLUMNS}
              getRowId={(item) => item.id}
              showSearch={false}
              emptyState={<Text>No quote history records found.</Text>}
            />
          </div>
        </>
      )}
    </div>
  );
};
