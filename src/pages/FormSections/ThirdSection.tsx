import { Grid, TextField } from "@mui/material";
import { extendProps } from "../../utils";

export const ThirdSection = ({ formik }: { formik: any }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <TextField
          label="Description"
          {...extendProps("description", formik)}
        />
      </Grid>
    </Grid>
  );
};
