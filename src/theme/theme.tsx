import { createTheme } from "@mui/material/styles";

export const useCustomTheme = (mode: "light" | "dark") => {
  return createTheme({
    palette: {
      mode,
    },
  });
};
