import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
} from "@mui/material";
import { ThemeProvider } from "@mui/system";
import React from "react";
import { theme } from "../theme/theme";
import { TheForm } from "./Form";

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar position="fixed">
          <Toolbar variant="dense">
            <Typography variant="h6">Multi-Step Form</Typography>
          </Toolbar>
        </AppBar>
        <CssBaseline />
        <Container>
          <Box mt={10}>
            <TheForm />
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
