import { createTheme } from "@mui/material/styles";

export const useCustomTheme = (mode: "light" | "dark") => {
  return createTheme({
    palette: {
      mode: mode,
    },
    components: {
      MuiTextField: { defaultProps: { fullWidth: true } },
      MuiButtonBase: { defaultProps: { disableRipple: true } },
    },
  });
};
