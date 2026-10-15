import React from "react";
import {
  Button,
  makeStyles,
  mergeClasses,
  tokens,
  typographyStyles,
} from "@fluentui/react-components";
import {
  ArrowDownRegular,
  ArrowLeftRegular,
  ArrowRightRegular,
  ArrowUpRegular,
} from "@fluentui/react-icons";

export interface TransferUser {
  id: string;
  name: string;
}

export type ListSide = "available" | "selected";

export interface ActiveSelection {
  side: ListSide;
  userId: string;
}

interface UserTransferListViewProps {
  availableUsers: TransferUser[];
  selectedUsers: TransferUser[];
  activeSelection: ActiveSelection | null;
  activeIndex: number;
  onSelect: (selection: ActiveSelection) => void;
  onMoveSelected: (target: ListSide) => void;
  onMoveAll: (target: ListSide) => void;
  onMoveActive: (offset: -1 | 1) => void;
}

const useStyles = makeStyles({
  section: {
    marginBottom: tokens.spacingVerticalXXL,
    marginTop: tokens.spacingVerticalXXL,
  },
  heading: {
    ...typographyStyles.subtitle1,
    marginTop: 0,
    marginBottom: tokens.spacingVerticalM,
  },
  transferLayout: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) auto minmax(0, 1fr)",
    alignItems: "center",
    gap: tokens.spacingHorizontalL,
    "@media (max-width: 640px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
      gap: tokens.spacingVerticalM,
    },
  },
  listBox: {
    minWidth: 0,
    minHeight: "320px",
    padding: tokens.spacingVerticalM,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow2,
  },
  listHeading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: tokens.spacingVerticalS,
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  count: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightRegular,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    listStyleType: "none",
    margin: 0,
    padding: 0,
  },
  userButton: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    minHeight: "48px",
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    textAlign: "left",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusSmall,
    backgroundColor: tokens.colorNeutralBackground1,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  selectedUserButton: {
    border: `1px solid ${tokens.colorBrandStroke1}`,
    backgroundColor: tokens.colorBrandBackground2,
    ":hover": {
      backgroundColor: tokens.colorBrandBackground2Hover,
    },
  },
  userDetails: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
  },
  userName: {
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  userId: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
  },
  controls: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: tokens.spacingVerticalS,
    "@media (max-width: 640px)": {
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",
    },
  },
  controlButton: {
    minWidth: "40px",
  },
  controlDivider: {
    width: "28px",
    border: 0,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    marginTop: tokens.spacingVerticalXS,
    marginBottom: tokens.spacingVerticalXS,
    "@media (max-width: 640px)": {
      display: "none",
    },
  },
  emptyState: {
    paddingTop: tokens.spacingVerticalM,
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase300,
  },
});

export const UserTransferListView: React.FC<UserTransferListViewProps> = ({
  availableUsers,
  selectedUsers,
  activeSelection,
  activeIndex,
  onSelect,
  onMoveSelected,
  onMoveAll,
  onMoveActive,
}) => {
  const styles = useStyles();
  const activeListLength =
    activeSelection?.side === "available"
      ? availableUsers.length
      : selectedUsers.length;

  const renderList = (side: ListSide, title: string, users: TransferUser[]) => (
    <section className={styles.listBox} aria-label={title}>
      <div className={styles.listHeading}>
        <span>{title}</span>
        <span className={styles.count}>{users.length} users</span>
      </div>
      {users.length > 0 ? (
        <ul className={styles.list}>
          {users.map((user) => {
            const isSelected =
              activeSelection?.side === side &&
              activeSelection.userId === user.id;

            return (
              <li key={user.id}>
                <Button
                  appearance="subtle"
                  className={mergeClasses(
                    styles.userButton,
                    isSelected && styles.selectedUserButton,
                  )}
                  aria-pressed={isSelected}
                  aria-label={`${user.id}, ${user.name}`}
                  onClick={() => onSelect({ side, userId: user.id })}
                >
                  <span className={styles.userDetails}>
                    <span className={styles.userName}>{user.name}</span>
                    <span className={styles.userId}>{user.id}</span>
                  </span>
                </Button>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className={styles.emptyState}>No users in this list.</div>
      )}
    </section>
  );

  return (
    <section className={styles.section} aria-labelledby="user-transfer-heading">
      <h2 id="user-transfer-heading" className={styles.heading}>
        User assignment
      </h2>
      <div className={styles.transferLayout}>
        {renderList("available", "Available users", availableUsers)}
        <div className={styles.controls} aria-label="User list controls">
          <Button
            appearance="secondary"
            className={styles.controlButton}
            icon={<ArrowRightRegular />}
            aria-label="Move selected user to selected users"
            title="Move selected user to selected users"
            disabled={
              activeSelection === null ||
              activeSelection.side !== "available"
            }
            onClick={() => onMoveSelected("selected")}
          />
          <Button
            appearance="secondary"
            className={styles.controlButton}
            icon={<ArrowLeftRegular />}
            aria-label="Move selected user to available users"
            title="Move selected user to available users"
            disabled={
              activeSelection === null || activeSelection.side !== "selected"
            }
            onClick={() => onMoveSelected("available")}
          />
          <Button
            appearance="secondary"
            className={styles.controlButton}
            icon={
              <span aria-hidden="true">
                <ArrowRightRegular />
                <ArrowRightRegular />
              </span>
            }
            aria-label="Move all users to selected users"
            title="Move all users to selected users"
            disabled={availableUsers.length === 0}
            onClick={() => onMoveAll("selected")}
          />
          <Button
            appearance="secondary"
            className={styles.controlButton}
            icon={
              <span aria-hidden="true">
                <ArrowLeftRegular />
                <ArrowLeftRegular />
              </span>
            }
            aria-label="Move all users to available users"
            title="Move all users to available users"
            disabled={selectedUsers.length === 0}
            onClick={() => onMoveAll("available")}
          />
          <hr className={styles.controlDivider} />
          <Button
            appearance="secondary"
            className={styles.controlButton}
            icon={<ArrowUpRegular />}
            aria-label="Move selected user up"
            title="Move selected user up"
            disabled={!activeSelection || activeIndex <= 0}
            onClick={() => onMoveActive(-1)}
          />
          <Button
            appearance="secondary"
            className={styles.controlButton}
            icon={<ArrowDownRegular />}
            aria-label="Move selected user down"
            title="Move selected user down"
            disabled={
              !activeSelection ||
              activeIndex < 0 ||
              activeIndex >= activeListLength - 1
            }
            onClick={() => onMoveActive(1)}
          />
        </div>
        {renderList("selected", "Selected users", selectedUsers)}
      </div>
    </section>
  );
};
