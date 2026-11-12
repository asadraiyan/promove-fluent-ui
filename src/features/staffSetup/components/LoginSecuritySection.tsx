
import React from "react";
import { Text, makeStyles, tokens } from "@fluentui/react-components";
import {
  Control,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";
import { FormInput, Dropdown } from "@/shared";
import { Button } from "@/shared/components/Button/Button";

import { PERMISSION_OPTIONS } from "../constants";
import type { StaffFormValues } from "../StaffSetup.types";

const useStyles = makeStyles({
  section: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    padding: tokens.spacingHorizontalM,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
  },
  sectionTitle: {
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: tokens.spacingVerticalXS,
  },
  loginRow: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) auto",
    gap: tokens.spacingHorizontalS,
    maxWidth: "480px",
    minWidth: 0,
  },
  permissionRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    flexWrap: "wrap",
  },
  permissionSelect: {
    maxWidth: "320px",
    width: "100%",
  },
  permissionTable: {
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    paddingTop: tokens.spacingVerticalS,
  },
  permissionHeading: {
    marginBottom: tokens.spacingVerticalS,
    fontWeight: tokens.fontWeightSemibold,
  },
  permissionList: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    minHeight: "64px",
  },
  permissionItem: {
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusSmall,
    backgroundColor: tokens.colorNeutralBackground2,
  },
  emptyPermissions: {
    padding: tokens.spacingVerticalM,
    color: tokens.colorNeutralForeground3,
  },
});

interface LoginSecuritySectionProps {
  control: Control<StaffFormValues>;
  permissions: string[];
  getValues: UseFormGetValues<StaffFormValues>;
  setValue: UseFormSetValue<StaffFormValues>;
}

export const LoginSecuritySection: React.FC<
  LoginSecuritySectionProps
> = ({ control, permissions, getValues, setValue }) => {
  const styles = useStyles();

  const handleSelectPermission = (permission: string) => {
    const currentPermissions = getValues("permissions") ?? [];

    if (!permission || currentPermissions.includes(permission)) return;

    setValue("permissions", [...currentPermissions, permission], {
      shouldDirty: true,
    });
  };

  return (
    <section className={styles.section} aria-labelledby="security-title">
      <Text id="security-title" className={styles.sectionTitle}>
        Login &amp; Security
      </Text>

      <div className={styles.loginRow}>
        <FormInput
          name="login"
          control={control}
          label="Login:"
          labelPosition="left"
        />

        <Button type="button">Generate</Button>
      </div>

      <div className={styles.permissionRow}>
        <Text>Access permissions:</Text>

        <div className={styles.permissionSelect}>
          <Dropdown
            aria-label="Add access permission"
            options={PERMISSION_OPTIONS}
            value=""
            onChange={handleSelectPermission}
            placeholder="Select permission"
          />
        </div>
      </div>

      <div className={styles.permissionTable}>
        <Text className={styles.permissionHeading}>Permissions</Text>

        <div className={styles.permissionList}>
          {Array.isArray(permissions) && permissions.length > 0 ? (
            permissions.map((permission) => (
              <Text key={permission} className={styles.permissionItem}>
                {permission}
              </Text>
            ))
          ) : (
            <Text className={styles.emptyPermissions}>
              No permissions selected.
            </Text>
          )}
        </div>
      </div>
    </section>
  );
};
