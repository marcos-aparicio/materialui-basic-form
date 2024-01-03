import { Box, Button, Card, CardContent } from "@mui/material";
import { FormikProps, useFormik } from "formik";
import { useState } from "react";
import { objectSchema } from "../schema";
import { FirstSection } from "./FormSections/FirstSection";
import { SecondSection } from "./FormSections/SecondSection";
import { ThirdSection } from "./FormSections/ThirdSection";

interface CurrentStepProps {
  step: number;
  formik: FormikProps<any>; // Replace `any` with the appropriate type for your formik object
}
const CurrentStep = ({ step, formik }: CurrentStepProps) => {
  const Components = [
    <FirstSection formik={formik} />,
    <SecondSection formik={formik} />,
    <ThirdSection formik={formik} />,
  ];
  return Components[step] || <div>Page not found</div>;
};

export const TheForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      millionaire: false,
      money: 0,
      description: "",
    },
    onSubmit: (values, helpers) => { },
    validationSchema: objectSchema,
  });
  const [step, setStep] = useState(0);
  const handleBack = () => {
    setStep((s) => s - 1);
  };

  return (
    <Card>
      <CardContent>
        <CurrentStep step={step} formik={formik} />
        <Box className="navigation-buttons">
          <Button onClick={handleBack}>Back</Button>
          <Button type="submit">Next</Button>
        </Box>
      </CardContent>
    </Card>
  );
};
