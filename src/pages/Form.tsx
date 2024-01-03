import { number, object, ObjectSchema, string } from "yup";
import { Box, Button, Card, CardContent } from "@mui/material";
import { FormikProps, useFormik } from "formik";
import React, { useState } from "react";
import { FirstSection } from "./FormSections/FirstSection";
import { SecondSection } from "./FormSections/SecondSection";
import { ThirdSection } from "./FormSections/ThirdSection";

interface CurrentStepProps {
  step: number;
  formik: FormikProps<any>;
}
const CurrentStep = ({ step, formik }: CurrentStepProps) => {
  const Components = [
    <FirstSection formik={formik} />,
    <SecondSection formik={formik} />,
    <ThirdSection formik={formik} />,
  ];
  return Components[step] || <div>Page not found</div>;
};

const LAST_STEP = 2;

export const TheForm = () => {
  const [step, setStep] = useState(0);

  const validationSchemaIncrementer = React.useMemo(() => {
    if (step === 0) {
      return object({
        firstName: string().required("Please enter your first name"),
        lastName: string().required("Please enter your last name"),
      });
    }
    if (step > 0) {
      return object({
        money: number()
          .required("Please fill the money!!")
          .when("millionaire", {
            is: true,
            then: (schema) =>
              schema
                .required()
                .min(
                  1_000_000,
                  "Because you said you are a millionaire you need to have 1 million dollars"
                ),
          }),
      });
    }
    return {};
  }, [step]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      millionaire: false,
      money: 0,
      description: "",
    },
    onSubmit: (values) => {
      if (isLastStep) {
        console.log("submitting form");
        console.log(values);
        return;
      }
      setStep((s) => s + 1);
    },
    validationSchema: validationSchemaIncrementer,
  });

  const isLastStep = React.useMemo(() => step === LAST_STEP, [step]);
  const handleBack = () => {
    setStep((s) => s - 1);
  };

  return (
    <Card>
      <CardContent>
        <CurrentStep step={step} formik={formik} />
        <Box className="navigation-buttons">
          {step === 0 ? null : <Button onClick={handleBack}>Back</Button>}
          <Button
            onClick={() => {
              formik.handleSubmit();
            }}
          >
            {step === LAST_STEP ? "Submit" : "Next"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
