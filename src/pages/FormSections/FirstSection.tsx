import { Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import { extendProps } from "../../utils";

export const FirstSection = ({ formik }: { formik: any }) => {
  return (
    <>
      <Grid item xs={12}>
        <TextField label="First Name" {...extendProps("firstName", formik)} />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Last Name" {...extendProps("lastName", formik)} />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          label="Am i a millionaire?"
          labelPlacement="start"
          control={<Checkbox checked={formik.values.millionaire} />}
          {...extendProps("millionaire", formik)}
        />
      </Grid>
    </>
  );
};
