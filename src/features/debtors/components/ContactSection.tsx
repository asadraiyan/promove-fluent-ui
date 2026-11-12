import React from "react";
import constants from "../constants.json";
import { FormDropdown, FormInput } from "@/shared";
import { DebtorsFormData } from "../types";
import { Control } from "react-hook-form";
export const ContactSection: React.FC<{
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
      <h4>Contact</h4>
      <FormDropdown
        name="contactTitle"
        control={control}
        label="Title"
        labelPosition="left"
        options={constants.dropdownOptions.title}
      />
      <FormInput
        name="contactName"
        control={control}
        label="Name"
        labelPosition="left"
      />
      <FormInput
        name="contactEmail"
        control={control}
        label="e-mail"
        labelPosition="left"
      />
      <FormInput
        name="contactTel"
        control={control}
        label="Tel"
        labelPosition="left"
      />
      <FormInput
        name="contactMobile"
        control={control}
        label="Mobile"
        labelPosition="left"
      />
    </div>
  );
};
