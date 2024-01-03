import { useTheme } from "@mui/material/styles";
import { DarkMode, LightMode } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ThemeProvider } from "@mui/system";
import React from "react";
import { useCustomTheme } from "../theme/theme";
import { TheForm } from "./Form";

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });
const ThemeToggler = () => {
  const theme = useTheme();
  const { toggleColorMode } = React.useContext(ColorModeContext);
  return (
    <Button onClick={toggleColorMode}>
      {theme.palette.mode === "dark" ? (
        <DarkMode />
      ) : (
        <LightMode sx={{ color: "white" }} />
      )}
    </Button>
  );
};

export default function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = React.useState<"light" | "dark">(
    prefersDarkMode ? "dark" : "light"
  );
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  const theme = useCustomTheme(mode);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <AppBar position="fixed">
          <Toolbar
            variant="dense"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography variant="h6">Multi-Step Form</Typography>
            <ThemeToggler />
          </Toolbar>
        </AppBar>
        <CssBaseline />
        <Container>
          <Box mt={10}>
            <TheForm />
          </Box>
        </Container>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
