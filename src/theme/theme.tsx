import { createTheme } from "@mui/material/styles";

export const useCustomTheme = (mode: "light" | "dark") => {
  return createTheme({
    palette: {
      mode: mode,
    },
    shape: {
      borderRadius: 10,
    },
    components: {
      MuiTextField: { defaultProps: { fullWidth: true } },
      MuiButtonBase: { defaultProps: { disableRipple: true } },
      MuiGrid: {
        styleOverrides: {
          container: ({ theme }) =>
            theme.unstable_sx({
              my: 2,
              rowGap: 2,
            }),
          item: ({ theme }) =>
            theme.unstable_sx({
              display: "flex",
              justifyContent: "center",
            }),
        },
      },
    },
  });
};
