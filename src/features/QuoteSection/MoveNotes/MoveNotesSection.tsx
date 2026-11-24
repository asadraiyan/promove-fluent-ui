import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Text,
  Textarea,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { DeleteRegular, SaveRegular } from "@fluentui/react-icons";
import { GridColumnDef, SharedDataGrid, FormInput, FormDate } from "@/shared";
import { DEFAULT_NOTE_FORM_VALUES, INITIAL_NOTES } from "./constants";
import { NoteFormValues, NoteItem } from "./types";

interface NotesSectionProps {
  items?: NoteItem[];
  onChange?: (items: NoteItem[]) => void;
}

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    width: "100%",
    minWidth: 0,
  },
  headerBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: tokens.spacingVerticalXS,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  gridContainer: {
    width: "100%",
    minWidth: 0,
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    padding: tokens.spacingVerticalM,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  fieldRow: {
    display: "grid",
    gridTemplateColumns: "130px minmax(0, 320px)",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalM,
    rowGap: tokens.spacingVerticalXS,
    "@media (max-width: 767px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
    },
  },
  fieldRowTopAlign: {
    alignItems: "start",
  },
  fieldLabel: {
    color: tokens.colorNeutralForeground2,
    textAlign: "right",
    "@media (max-width: 767px)": {
      textAlign: "left",
    },
  },
  dateField: {
    width: "100%",
    minWidth: 0,
    "& .fui-Field__label": {
      display: "none",
    },
    "& .fui-DatePicker": {
      width: "100%",
      minWidth: 0,
      backgroundColor: tokens.colorNeutralBackground1,
    },
  },
  controlWidth: {
    width: "100%",
    minWidth: 0,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  textareaControl: {
    width: "100%",
    minWidth: 0,
    minHeight: "90px",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  actionsRow: {
    display: "flex",
    justifyContent: "flex-end",
    gap: tokens.spacingHorizontalS,
    paddingTop: tokens.spacingVerticalXS,
  },
});

const formatDisplayDate = (isoDate: string): string => {
  if (!isoDate) return "";
  const parts = isoDate.split("-");
  if (parts.length !== 3) return isoDate;
  const [yyyy, mm, dd] = parts;
  return `${dd}/${mm}/${yyyy}`;
};

export const MoveNotesSection: React.FC<NotesSectionProps> = ({
  items = INITIAL_NOTES,
  onChange,
}) => {
  const styles = useStyles();
  const [notes, setNotes] = useState<NoteItem[]>(items);

  const { control, register, handleSubmit, reset } = useForm<NoteFormValues>({
    defaultValues: DEFAULT_NOTE_FORM_VALUES,
  });

  const handleDeleteRow = (id: string) => {
    setNotes((prev) => {
      const updated = prev.filter((note) => note.id !== id);
      onChange?.(updated);
      return updated;
    });
  };

  const columns: GridColumnDef<NoteItem>[] = useMemo(
    () => [
      {
        key: "subject",
        label: "Subject",
        minWidth: 140,
      },
      {
        key: "subjectChoice",
        label: "Subject Choice",
        minWidth: 140,
      },
      {
        key: "text",
        label: "Text",
        minWidth: 220,
      },
      {
        key: "creationUser",
        label: "Creation User",
        minWidth: 150,
      },
      {
        key: "creationDate",
        label: "Creation Date",
        minWidth: 140,
        accessor: (item) => item.creationDateIso || item.creationDate,
      },
      {
        key: "id",
        label: "Actions",
        minWidth: 90,
        sortable: false,
        renderCell: (item) => (
          <Button
            appearance="subtle"
            size="small"
            icon={<DeleteRegular />}
            aria-label={`Delete note ${item.subject || item.id}`}
            onClick={() => handleDeleteRow(item.id)}
          />
        ),
      },
    ],
    [],
  );

  const onSaveNote = (values: NoteFormValues) => {
    const isoDate = values.date || DEFAULT_NOTE_FORM_VALUES.date;
    const newNote: NoteItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      subject: values.subject.trim(),
      subjectChoice: values.subjectChoice.trim(),
      text: values.text.trim(),
      creationUser: values.enteredBy.trim() || "Vilas Palve",
      creationDate: formatDisplayDate(isoDate),
      creationDateIso: isoDate,
    };

    setNotes((prev) => {
      const updated = [...prev, newNote];
      onChange?.(updated);
      return updated;
    });

    reset({
      ...values,
      subject: "",
      subjectChoice: "",
      text: "",
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerBar}>
        <Text weight="semibold" size={300}>
          Notes
        </Text>
      </div>

      <div className={styles.gridContainer}>
        <SharedDataGrid<NoteItem>
          items={notes}
          columns={columns}
          getRowId={(item) => item.id}
          showSearch={false}
          emptyState={<Text>No notes available.</Text>}
        />
      </div>

      <form
        className={styles.formContainer}
        onSubmit={handleSubmit(onSaveNote)}
      >
        <div className={styles.fieldRow}>
          <Text size={200} weight="semibold" className={styles.fieldLabel}>
            Date :
          </Text>
          <FormDate
            name="date"
            label="Date"
            control={control as any}
            className={styles.dateField}
            placeholder="YYYY-MM-DD"
          />
        </div>

        <div className={styles.fieldRow}>
          <Text size={200} weight="semibold" className={styles.fieldLabel}>
            Entered By :
          </Text>
          <FormInput
            name="enteredBy"
            control={control}
            ariaLabel="Entered By"
            className={styles.controlWidth}
          />
        </div>

        <div className={styles.fieldRow}>
          <Text size={200} weight="semibold" className={styles.fieldLabel}>
            Subject :
          </Text>
          <FormInput
            name="subject"
            control={control}
            ariaLabel="Subject"
            className={styles.controlWidth}
          />
        </div>

        <div className={styles.fieldRow}>
          <Text size={200} weight="semibold" className={styles.fieldLabel}>
            Subject Choice :
          </Text>
          <FormInput
            name="subjectChoice"
            control={control}
            ariaLabel="Subject Choice"
            className={styles.controlWidth}
          />
        </div>

        <div className={`${styles.fieldRow} ${styles.fieldRowTopAlign}`}>
          <Text size={200} weight="semibold" className={styles.fieldLabel}>
            Text :
          </Text>
          <Textarea
            size="small"
            aria-label="Text"
            className={styles.textareaControl}
            {...register("text")}
          />
        </div>

        <div className={styles.actionsRow}>
          <Button
            type="submit"
            size="small"
            appearance="primary"
            icon={<SaveRegular />}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};
