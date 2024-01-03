import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { extendProps } from "../../utils";

export const FirstSection = ({ formik }: { formik: any }) => {
  return (
    <>
      <TextField label="First Name" {...extendProps("firstName", formik)} />
      <TextField label="Last Name" {...extendProps("lastName", formik)} />
      <FormControlLabel
        label="Am i a millionaire?"
        labelPlacement="start"
        control={<Checkbox checked={formik.values.millionaire} />}
        {...extendProps("millionaire", formik)}
      />
    </>
  );
};
