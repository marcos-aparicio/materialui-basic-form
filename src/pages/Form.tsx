import { number, object, ObjectSchema, string } from "yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
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
  return (
    (
      <Grid
        container
        sx={{
          mx: "auto",
          maxWidth: {
            xs: "100%",
            sm: "80%",
            md: "60%",
          },
        }}
      >
        {Components[step]}
      </Grid>
    ) || <div>Page not found</div>
  );
};

const stepSubtitles = ["Personal Data", "Bank Accounts", "More Info"];

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
        <Box
          sx={{
            pt: 2,
            mx: "auto",
            maxWidth: {
              xs: "250px",
              sm: "400px",
              md: "670px",
              lg: "900px",
            },
          }}
        >
          <Stepper activeStep={step} alternativeLabel>
            {stepSubtitles.map((subtitle, idx) => (
              <Step key={idx}>
                <StepLabel>{subtitle}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box
            sx={{
              pt: 2,
              display: "flex",
              alignItems: "center",
              minHeight: {
                xs: "200px",
                sm: "250px",
              },
            }}
          >
            <CurrentStep step={step} formik={formik} />
          </Box>
          <Grid container className="navigation-buttons">
            <Grid item xs={6} justifyContent="start">
              {step === 0 ? null : <Button onClick={handleBack}>Back</Button>}
            </Grid>
            <Grid item xs={6} sx={{ display: "flex", justifyContent: "end" }}>
              <Button
                onClick={() => {
                  formik.handleSubmit();
                }}
              >
                {step === LAST_STEP ? "Submit" : "Next"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};
