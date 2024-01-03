import { TextField } from "@mui/material";
import { extendProps } from "../../utils";

export const ThirdSection = ({ formik }: { formik: any }) => {
  return (
    <>
      <TextField label="Description" {...extendProps("description", formik)} />
    </>
  );
};
