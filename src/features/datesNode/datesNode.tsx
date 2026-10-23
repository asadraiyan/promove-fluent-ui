import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button, makeStyles, tokens } from "@fluentui/react-components";
import { Origin } from "./components/Origin";
import { Freight } from "./components/Fright";

const styles = makeStyles({
  layout: {
    padding: tokens.spacingVerticalXXL,
    maxWidth: "1200px",
    marginLeft: "auto",
    marginRight: "auto",
  },
});

function DatesNode() {
  const style = styles();
  const methods = useForm({
    defaultValues: {
      // enquiryDate: "",
      // dailyChargeAmount: 0,
      // reason: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Form Submitted:", data);
  };

  return (
    <div className={style.layout}>
      <h2>Dates Node</h2>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Origin />
          <Freight />

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          ></div>
        </form>
      </FormProvider>
    </div>
  );
}

export default DatesNode;
