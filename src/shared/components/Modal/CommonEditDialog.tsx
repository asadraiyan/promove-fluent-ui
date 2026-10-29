import React from "react";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  makeStyles,
  tokens,
  type ButtonProps,
} from "@fluentui/react-components";
import { DismissRegular } from "@fluentui/react-icons";
import { Button } from "../Button/Button";

export interface CommonEditDialogAction {
  label: React.ReactNode;
  onClick: () => void;
  position?: "start" | "end";
  appearance?: ButtonProps["appearance"];
  disabled?: ButtonProps["disabled"];
  icon?: ButtonProps["icon"];
  size?: ButtonProps["size"];
  shape?: ButtonProps["shape"];
  type?: "button" | "submit" | "reset";
}

interface CommonEditDialogProps {
  open: boolean;
  heading: React.ReactNode;
  content: React.ReactNode;
  actions?: CommonEditDialogAction[];
  actionsPosition?: "start" | "end";
  onClose: () => void;
  showCloseButton?: boolean;
  maxWidth?: React.CSSProperties["maxWidth"];
}

const useStyles = makeStyles({
  body: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minWidth: 0,
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    width: "100%",
    paddingBottom: tokens.spacingVerticalM,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    boxSizing: "border-box",
  },
  heading: {
    flexGrow: 1,
    minWidth: 0,
    margin: 0,
  },
  closeButton: {
    flexShrink: 0,
    minWidth: "32px",
    width: "32px",
    height: "32px",
    padding: 0,
    fontSize: tokens.fontSizeBase400,
  },
  actions: {
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "flex-end",
    width: "100%",
    gap: tokens.spacingHorizontalS,
  },
  actionGroup: {
    display: "flex",
    flexWrap: "nowrap",
    gap: tokens.spacingHorizontalS,
  },
  actionButton: {
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  dialogContent: {
    width: "100%",
    minWidth: 0,
    boxSizing: "border-box",
  },
  dialogActions: {
    width: "100%",
    boxSizing: "border-box",
  },
});

export const CommonEditDialog: React.FC<CommonEditDialogProps> = ({
  open,
  heading,
  content,
  actions = [],
  actionsPosition = "end",
  onClose,
  showCloseButton = false,
  maxWidth,
}) => {
  const styles = useStyles();
  const startActions = actions.filter((action) => action.position === "start");
  const endActions = actions.filter((action) => action.position !== "start");

  const renderActions = (items: CommonEditDialogAction[]) =>
    items.map((action, index) => (
      <Button
        as="button"
        className={styles.actionButton}
        key={`${String(action.label)}-${index}`}
        appearance={action.appearance}
        disabled={action.disabled}
        icon={action.icon}
        size={action.size}
        shape={action.shape}
        type={action.type}
        onClick={action.onClick}
      >
        {action.label}
      </Button>
    ));

  return (
    <Dialog
      open={open}
      onOpenChange={(_, data) => {
        if (!data.open) onClose();
      }}
    >
      <DialogSurface style={{ maxWidth }}>
        <DialogBody className={styles.body}>
          <div className={styles.header}>
            <DialogTitle className={styles.heading}>{heading}</DialogTitle>
            {showCloseButton && (
              <Button
                as="button"
                className={styles.closeButton}
                appearance="subtle"
                size="small"
                aria-label="Close dialog"
                onClick={onClose}
              >
                <DismissRegular />
              </Button>
            )}
          </div>
          <DialogContent className={styles.dialogContent}>
            {content}
          </DialogContent>
          {actions.length > 0 && (
            <DialogActions
              className={styles.dialogActions}
              position={actionsPosition}
            >
              <div className={styles.actions}>
                <div className={styles.actionGroup}>
                  {renderActions(startActions)}
                </div>
                <div className={styles.actionGroup}>
                  {renderActions(endActions)}
                </div>
              </div>
            </DialogActions>
          )}
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
