import React, { useRef, useState } from "react";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import { makeStyles, tokens } from "@fluentui/react-components";
import {
  Button,
  Checkbox,
  CommonEditDialog,
  type CommonEditDialogAction,
  FieldLabel,
  FormDate,
  FormDropdown,
  FormInput,
  RadioGroup,
  SharedDataGrid,
  type GridColumnDef,
} from "@/shared";
import {
  AddRegular,
  ChevronRightRegular,
  DismissRegular,
  MoreHorizontalRegular,
} from "@fluentui/react-icons";

interface DialogProps {
  open: boolean;
  onClose: () => void;
}

interface NegativeMarginAction {
  id: string;
  actionName: string;
  briefComments: string;
  longComments: string;
  approverComments: string;
  status: string;
}

const negativeMarginActions: NegativeMarginAction[] = [
  {
    id: "negative-margin-1",
    actionName: "Negative Margin Explanation",
    briefComments: "Negative Margin Setup - Carrier cost",
    longComments: "",
    approverComments: "",
    status: "Cancelled",
  },
];

const negativeMarginColumns: GridColumnDef<NegativeMarginAction>[] = [
  { key: "actionName", label: "Action Name", minWidth: 210 },
  { key: "briefComments", label: "Brief Comments", minWidth: 230 },
  { key: "longComments", label: "Long Comments", minWidth: 200 },
  { key: "approverComments", label: "Approver Comments", minWidth: 220 },
  { key: "status", label: "Status", minWidth: 120 },
];

export const NegativeMarginDetailsDialog: React.FC<DialogProps> = ({
  open,
  onClose,
}) => (
  <CommonEditDialog
    open={open}
    heading="Negative Margin Actions List"
    content={
      <SharedDataGrid
        items={negativeMarginActions}
        columns={negativeMarginColumns}
        getRowId={(action) => action.id}
        showSearch={false}
      />
    }
    onClose={onClose}
    showCloseButton
    maxWidth="1000px"
  />
);

interface ShipmentQuote {
  quoteNumber: string;
  amount: string;
  description: string;
}

interface ShipmentQuoteGridRow extends ShipmentQuote {
  id: string;
  rowIndex: number;
}

interface ShipmentQuotesFormValues {
  quotes: ShipmentQuote[];
}

const useQuoteStyles = makeStyles({
  input: {
    minWidth: "110px",
    width: "100%",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
});

export const ShipmentQuotesDialog: React.FC<DialogProps> = ({
  open,
  onClose,
}) => {
  const styles = useQuoteStyles();
  const { control } = useForm<ShipmentQuotesFormValues>({
    defaultValues: { quotes: [] },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "quotes",
  });

  const quoteRows: ShipmentQuoteGridRow[] = fields.map((field, rowIndex) => ({
    ...field,
    rowIndex,
  }));

  const columns: GridColumnDef<ShipmentQuoteGridRow>[] = [
    {
      key: "quoteNumber",
      label: "Quote Number",
      minWidth: 190,
      renderCell: (quote) => (
        <FormInput
          name={`quotes.${quote.rowIndex}.quoteNumber`}
          control={control}
          ariaLabel="Quote Number"
          className={styles.input}
        />
      ),
    },
    {
      key: "amount",
      label: "Amount",
      minWidth: 150,
      renderCell: (quote) => (
        <FormInput
          name={`quotes.${quote.rowIndex}.amount`}
          control={control}
          ariaLabel="Amount"
          className={styles.input}
          type="number"
        />
      ),
    },
    {
      key: "description",
      label: "Description",
      minWidth: 300,
      renderCell: (quote) => (
        <FormInput
          name={`quotes.${quote.rowIndex}.description`}
          control={control}
          ariaLabel="Description"
          className={styles.input}
        />
      ),
    },
  ];

  const toolbarActions = (
    <div className={styles.toolbar}>
      <Button
        icon={<AddRegular />}
        appearance="subtle"
        aria-label="Add quote"
        // onClick={() =>
        //   append({ quoteNumber: "", amount: "", description: "" })
        // }
      />
      <Button
        icon={<DismissRegular />}
        appearance="subtle"
        aria-label="Delete last quote"
        disabled={fields.length === 0}
        // onClick={() => remove(fields.length - 1)}
      />
    </div>
  );

  const actions: CommonEditDialogAction[] = [
    {
      label: "Save and Close",
      appearance: "secondary",
      onClick: onClose,
    },
  ];

  return (
    <CommonEditDialog
      open={open}
      heading="Shipment Quotes"
      content={
        <SharedDataGrid
          items={quoteRows}
          columns={columns}
          getRowId={(quote) => quote.id}
          showSearch={false}
          toolbarActions={toolbarActions}
          emptyState="No shipment quotes have been added."
        />
      }
      actions={actions}
      onClose={onClose}
      showCloseButton
      maxWidth="900px"
    />
  );
};

const useUploadStyles = makeStyles({
  content: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    paddingTop: tokens.spacingVerticalM,
  },
  fileRow: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 12rem) minmax(0, 1fr) auto",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  fileName: {
    width: "100%",
  },
  fileInput: {
    display: "none",
  },
  dropZone: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: tokens.spacingVerticalS,
    padding: tokens.spacingVerticalXXL,
    border: `1px dashed ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    color: tokens.colorNeutralForeground2,
  },
});

const documentTypeOptions = [
  { value: "bill-of-lading", label: "Bill of Lading" },
  { value: "commercial-invoice", label: "Commercial Invoice" },
  { value: "packing-list", label: "Packing List" },
  { value: "other", label: "Other" },
];

export const UploadToSistrsDialog: React.FC<DialogProps> = ({
  open,
  onClose,
}) => {
  const styles = useUploadStyles();
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploadMode, setUploadMode] = useState("documents");
  const { control, setValue } = useForm<{
    documentType: string;
    selectedDocument: string;
  }>({
    defaultValues: { documentType: "", selectedDocument: "" },
  });
  const selectedFile = useWatch({ control, name: "selectedDocument" });

  const chooseFile = (file?: File) => {
    if (file) {
      setValue("selectedDocument", file.name, { shouldDirty: true });
    }
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    chooseFile(event.dataTransfer.files[0]);
  };

  const actions: CommonEditDialogAction[] = [
    {
      label: "Close",
      appearance: "secondary",
      onClick: onClose,
    },
  ];

  return (
    <CommonEditDialog
      open={open}
      heading="Upload Document to SISTRS"
      content={
        <div className={styles.content}>
          <RadioGroup
            name="uploadMode"
            value={uploadMode}
            onChange={setUploadMode}
            options={[
              { label: "Select Documents", value: "documents" },
              { label: "Drag Drop Emails", value: "emails" },
            ]}
            direction="horizontal"
          />
          <FormDropdown
            name="documentType"
            control={control}
            label="Select Document Type"
            labelPosition="left"
            options={documentTypeOptions}
            placeholder="Select document type"
          />
          {uploadMode === "documents" ? (
            <div className={styles.fileRow}>
              <FieldLabel htmlFor="selectedDocument">
                Select Document
              </FieldLabel>
              <FormInput
                name="selectedDocument"
                control={control}
                className={styles.fileName}
                placeholder="Select a document"
                readOnly
              />
              <Button
                appearance="secondary"
                onClick={() => fileInput.current?.click()}
              >
                Browse
              </Button>
            </div>
          ) : (
            <div
              className={styles.dropZone}
              onDragOver={(event) => event.preventDefault()}
              onDrop={onDrop}
            >
              <span>{selectedFile || "Drop email files here or browse"}</span>
              <Button
                appearance="secondary"
                onClick={() => fileInput.current?.click()}
              >
                Browse
              </Button>
            </div>
          )}
          <input
            ref={fileInput}
            className={styles.fileInput}
            type="file"
            accept={
              uploadMode === "emails" ? ".eml,.msg,message/rfc822" : undefined
            }
            onChange={(event) => chooseFile(event.currentTarget.files?.[0])}
            aria-label="Choose upload file"
          />
        </div>
      }
      actions={actions}
      onClose={onClose}
      showCloseButton
      maxWidth="700px"
    />
  );
};

interface NewActionFormValues {
  actionType: string;
  shipment: string;
  assignedTo: string;
  runNow: boolean;
  dueDate: string;
  comment: string;
}

const newActionDefaults: NewActionFormValues = {
  actionType: "adhoc",
  shipment: "INT, A 1085 cuft, DTD, LCL",
  assignedTo: "syed-sahul",
  runNow: false,
  dueDate: "",
  comment: "",
};

const useNewActionStyles = makeStyles({
  content: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    minWidth: "min(100%, 560px)",
    paddingTop: tokens.spacingVerticalM,
  },
});

export const NewActionDialog: React.FC<DialogProps> = ({ open, onClose }) => {
  const styles = useNewActionStyles();
  const methods = useForm<NewActionFormValues>({
    defaultValues: newActionDefaults,
  });
  const runNow = useWatch({ control: methods.control, name: "runNow" });

  const actions: CommonEditDialogAction[] = [
    { label: "OK", appearance: "primary", onClick: onClose },
    { label: "Cancel", appearance: "secondary", onClick: onClose },
  ];

  return (
    <FormProvider {...methods}>
      <CommonEditDialog
        open={open}
        heading="New Action"
        content={
          <div className={styles.content}>
            <FormDropdown
              name="actionType"
              control={methods.control}
              label="Action Type:"
              labelPosition="left"
              options={[
                { label: "Ad hoc", value: "adhoc" },
                { label: "Add Notes to Globalco", value: "notes" },
              ]}
            />
            <FormInput
              name="shipment"
              control={methods.control}
              label="Shipment:"
              labelPosition="left"
              disabled
            />
            <FormDropdown
              name="assignedTo"
              control={methods.control}
              label="By:"
              labelPosition="left"
              options={[{ label: "Syed Sahul (1)", value: "syed-sahul" }]}
            />
            <Checkbox
              label="Run now"
              checked={Boolean(runNow)}
              onChange={(_, data) =>
                methods.setValue("runNow", Boolean(data.checked), {
                  shouldDirty: true,
                })
              }
            />
            <FormDate
              name="dueDate"
              label="Due date-time:"
              placeholder="Select date"
              orientation="horizontal"
            />
            <FormInput
              name="comment"
              control={methods.control}
              label="Comment:"
              labelPosition="left"
            />
          </div>
        }
        actions={actions}
        onClose={onClose}
        showCloseButton
        maxWidth="760px"
      />
    </FormProvider>
  );
};

export const actionRowIcons = {
  more: <MoreHorizontalRegular />,
  open: <ChevronRightRegular />,
};
