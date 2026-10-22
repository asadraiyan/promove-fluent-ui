import React, { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { makeStyles, tokens } from "@fluentui/react-components";

import {
  Button,
  CommonActionDialogContent,
  type CommonActionDialogValues,
  CommonEditDialog,
  type CommonEditDialogAction,
} from "@/shared";

export type AdhocGlobalcoDialogOutcome = "completed" | "open";
export type AdhocGlobalcoActionId = "adhoc" | "notes";

export interface CommonActionDialogConfiguration {
  id: AdhocGlobalcoActionId;
  heading: string;
  briefLabel: string;
  longLabel: string;
  instructions?: string[];
  cancellationLabel?: string;
}

export interface AdhocGlobalcoActionResult extends CommonActionDialogValues {
  action: AdhocGlobalcoActionId;
  outcome: AdhocGlobalcoDialogOutcome;
}

interface ActionButtonProps {
  onOpen: (configuration: CommonActionDialogConfiguration) => void;
}

interface CommonActionDialogCentreProps {
  open: boolean;
  configuration: CommonActionDialogConfiguration;
  onClose: () => void;
  onSubmit?: (result: AdhocGlobalcoActionResult) => void;
}

export const ADHOC_ACTION_DIALOG: CommonActionDialogConfiguration = {
  id: "adhoc",
  heading: "Adhoc",
  briefLabel: "Brief comment (appears in lists)",
  longLabel: "Long comment (Comments sent to Adhoc)",
  instructions: [
    "Clicking OK will mark the action as Completed.",
    "Clicking Save & Close will save the comments, but leave the action open.",
    "Clicking Cancel will leave the action open.",
  ],
  cancellationLabel: "Mark action as cancelled",
};

export const GLOBALCO_NOTES_DIALOG: CommonActionDialogConfiguration = {
  id: "notes",
  heading: "Add Notes to Globalcom",
  briefLabel: "Brief comment (appears in lists)",
  longLabel: "Long comment (Comments sent to GlobalCom)",
  instructions: [
    "Clicking OK will mark the action as Completed.",
    "Clicking Save & Close will save the comments, but leave the action open.",
    "Clicking Cancel will leave the action open.",
  ],
  cancellationLabel: "Mark action as cancelled",
};

export const AdhocActionButton: React.FC<ActionButtonProps> = ({ onOpen }) => (
  <Button appearance="primary" onClick={() => onOpen(ADHOC_ACTION_DIALOG)}>
    Adhoc Action
  </Button>
);

export const AddNotesToGlobalcoButton: React.FC<ActionButtonProps> = ({onOpen}) => (
  <Button appearance="primary" onClick={() => onOpen(GLOBALCO_NOTES_DIALOG)}>
    Add Notes to Globalco
  </Button>
);

const useStyles = makeStyles({
  actions: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalS,
    justifyContent: "flex-end",
    width: "min(100% - 32px, 1000px)",
    margin: `${tokens.spacingVerticalM} auto`,
  },
});

export const CommonActionDialogCentre: React.FC<
  CommonActionDialogCentreProps
> = ({ open, configuration, onClose, onSubmit }) => {
  const methods = useForm<CommonActionDialogValues>({
    defaultValues: {
      briefComment: "",
      longComment: "",
      markCancelled: false,
    },
  });

  useEffect(() => {
    if (open) methods.reset();
  }, [open, methods]);

  const submitWithOutcome = (outcome: AdhocGlobalcoDialogOutcome) =>
    methods.handleSubmit((values) => {
      onSubmit?.({ ...values, action: configuration.id, outcome });
      onClose();
    });

  const actions: CommonEditDialogAction[] = [
    {
      label: "OK",
      appearance: "primary",
      onClick: submitWithOutcome("completed"),
    },
    {
      label: "Save & Close",
      appearance: "primary",
      onClick: submitWithOutcome("open"),
    },
    {
      label: "Cancel",
      appearance: "secondary",
      onClick: onClose,
    },
  ];

  return (
    <FormProvider {...methods}>
      <CommonEditDialog
        open={open}
        heading={configuration.heading}
        content={
          <CommonActionDialogContent
            control={methods.control}
            briefLabel={configuration.briefLabel}
            longLabel={configuration.longLabel}
            instructions={configuration.instructions}
            cancellationLabel={configuration.cancellationLabel}
          />
        }
        actions={actions}
        onClose={onClose}
        showCloseButton
      />
    </FormProvider>
  );
};

interface AdhocGlobalcoActionsProps {
  onSubmit?: (result: AdhocGlobalcoActionResult) => void;
}

export const AdhocGlobalcoActions: React.FC<AdhocGlobalcoActionsProps> = ({
  onSubmit,
}) => {
  const styles = useStyles();
  const [configuration, setConfiguration] =
    useState<CommonActionDialogConfiguration>(ADHOC_ACTION_DIALOG);
  const [open, setOpen] = useState(false);

  const openDialog = (nextConfiguration: CommonActionDialogConfiguration) => {
    setConfiguration(nextConfiguration);
    setOpen(true);
  };

  return (
    <>
      <div className={styles.actions}>
        <AdhocActionButton onOpen={openDialog} />
        <AddNotesToGlobalcoButton onOpen={openDialog} />
      </div>
      <CommonActionDialogCentre
        open={open}
        configuration={configuration}
        onClose={() => setOpen(false)}
        onSubmit={onSubmit}
      />
    </>
  );
};
