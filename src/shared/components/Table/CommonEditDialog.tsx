import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  makeStyles,
  type ButtonProps,
} from "@fluentui/react-components";

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
  onClose: () => void;
}

const useStyles = makeStyles({
  actions: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    rowGap: "8px",
  },
  actionGroup: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
});

export const CommonEditDialog: React.FC<CommonEditDialogProps> = ({
  open,
  heading,
  content,
  actions = [],
  onClose,
}) => {
  const styles = useStyles();
  const startActions = actions.filter((action) => action.position === "start");
  const endActions = actions.filter((action) => action.position !== "start");

  const renderActions = (items: CommonEditDialogAction[]) =>
    items.map((action, index) => (
      <Button
        as="button"
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
      <DialogSurface>
        <DialogBody>
          <DialogTitle>{heading}</DialogTitle>
          <DialogContent>{content}</DialogContent>
          {actions.length > 0 && (
            <DialogActions position="end">
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
