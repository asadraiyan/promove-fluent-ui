import React from "react";
import { makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  grid: {
    display: "grid",
    minWidth: 0,
    "@media (max-width: 600px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
      alignItems: "stretch",
      "& > div:empty": {
        display: "none",
      },
      "& [data-responsive-grid-label]": {
        justifySelf: "start",
        textAlign: "left",
      },
    },
  },
  label: {
    justifySelf: "end",
    textAlign: "right",
  },
});

export type ResponsiveGridProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "style"
>;

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  className,
  ...props
}) => {
  const styles = useStyles();

  return (
    <div
      {...props}
      className={className ? `${styles.grid} ${className}` : styles.grid}
    />
  );
};

export type ResponsiveGridLabelProps = React.HTMLAttributes<HTMLDivElement>;

export const ResponsiveGridLabel: React.FC<ResponsiveGridLabelProps> = ({
  className,
  ...props
}) => {
  const styles = useStyles();

  return (
    <div
      {...props}
      className={`${styles.label} ${className || ""}`}
      data-responsive-grid-label
    />
  );
};
