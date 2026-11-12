import { FormInput } from "@/shared";
import React from "react";
import { DebtorsFormData } from "../types";
import { Control } from "react-hook-form";

export const SunSpecificsSection: React.FC<{
  control: Control<DebtorsFormData>;
}> = ({ control }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        marginTop: "16px",
      }}
    >
      <h4>SUN specifics</h4>
      <FormInput
        name="lookupCode"
        control={control}
        label="Lookup code"
        labelPosition="left"
      />
      <FormInput
        name="accountGroupParent"
        control={control}
        label="Account group parent"
        labelPosition="left"
      />
    </div>
  );
};
