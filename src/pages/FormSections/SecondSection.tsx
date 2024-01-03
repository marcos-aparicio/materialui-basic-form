import { TextField } from "@mui/material";
import { extendProps } from "../../utils";

export const SecondSection = ({ formik }: { formik: any }) => {
  return (
    <>
      <TextField
        label="All the money I have"
        type="number"
        {...extendProps("money", formik)}
      />
    </>
  );
};
