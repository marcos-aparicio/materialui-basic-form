import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { FormikConfig, FormikValues, useFormik } from "formik";
import { number, object, string } from "yup";
import React, { ReactNode } from "react";

const extendProps = (name: string, formik: any) => {
  return {
    name: name,
    id: name,
    value: formik.values[name],
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    error: formik.touched[name] && Boolean(formik.errors[name]),
    helperText: formik.touched[name] && formik.errors[name],
  };
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
    onSubmit: (values) => {
      console.log("values: ", values);
    },
    validationSchema: object({
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
      firstName: string().required(),
    }),
  });
  return (
    <Card>
      <CardContent>
        <FormikStepper>
          <div>
            <TextField
              label="First Name"
              {...extendProps("firstName", formik)}
            />
            <TextField label="Last Name" {...extendProps("lastName", formik)} />
            <FormControlLabel
              label="Am i a millionaire?"
              labelPlacement="start"
              control={<Checkbox checked={formik.values.millionaire} />}
              {...extendProps("millionaire", formik)}
            />
          </div>
          <div>
            <TextField
              label="Money"
              type="number"
              {...extendProps("money", formik)}
            />
          </div>
          <div>
            <TextField
              label="Description"
              {...extendProps("description", formik)}
            />
          </div>
        </FormikStepper>
      </CardContent>
    </Card>
  );
};

// const CustomForm = ({ children, ...props }) => {
//   const childrenArray = React.Children.toArray(children);
//   return <div>Hello world</div>;
// };
//
interface FormikStepperProps {
  children: ReactNode;
}
export const FormikStepper: React.FC<FormikStepperProps> = ({ children }) => {
  const childrenArray = React.Children.toArray(children);
  const [step, setStep] = React.useState(0);
  const currentChild = childrenArray[step];
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      millionaire: false,
      money: 0,
      description: "",
    },
    onSubmit: (values, helpers) => {
      if (step === childrenArray.length - 1) {
        // await props
        return;
      }
      setStep((s) => s + 1);
    },
    validationSchema: object({
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
      firstName: string().required(),
    }),
  });

  return (
    <form autoComplete="off">
      {currentChild}
      {step > 0 ? (
        <Button onClick={() => setStep((s) => s - 1)}>Back</Button>
      ) : null}
      {/* <Button onClick={() => setStep((s) => s + 1)}>Next</Button> */}

      <Button type="submit">Next</Button>
    </form>
  );
};
