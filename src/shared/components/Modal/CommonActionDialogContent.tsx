import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { useController, type Control } from "react-hook-form";

import { Checkbox } from "../Checkbox/Checkbox";
import { FormInput } from "../Input/Input";
import { TextAreaField } from "../TextAreaField/TextAreaField";

export interface CommonActionDialogValues {
  briefComment: string;
  longComment: string;
  markCancelled: boolean;
}

export interface CommonActionDialogContentProps {
  control: Control<CommonActionDialogValues>;
  briefLabel: string;
  longLabel: string;
  longRows?: number;
  instructions?: string[];
  cancellationLabel?: string;
}

const useStyles = makeStyles({
  content: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    minWidth: "min(100%, 520px)",
    paddingTop: tokens.spacingVerticalM,
  },
  instructions: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
    color: tokens.colorNeutralForeground1,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
  },
  checkbox: {
    alignSelf: "flex-start",
  },
});

export const CommonActionDialogContent: React.FC<
  CommonActionDialogContentProps
> = ({
  control,
  briefLabel,
  longLabel,
  longRows = 8,
  instructions = [],
  cancellationLabel,
}) => {
  const styles = useStyles();
  const cancellation = useController({
    name: "markCancelled",
    control,
    defaultValue: false,
  });

  return (
    <div className={styles.content}>
      <FormInput
        name="briefComment"
        control={control}
        label={briefLabel}
        labelPosition="left"
      />
      <TextAreaField
        name="longComment"
        control={control}
        label={longLabel}
        labelPosition="left"
        rows={longRows}
      />
      {instructions.length > 0 && (
        <div className={styles.instructions}>
          {instructions.map((instruction) => (
            <div key={instruction}>{instruction}</div>
          ))}
        </div>
      )}
      {cancellationLabel && (
        <Checkbox
          className={styles.checkbox}
          label={cancellationLabel}
          checked={Boolean(cancellation.field.value)}
          onChange={(_, data) => cancellation.field.onChange(data.checked)}
        />
      )}
    </div>
  );
};
