import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import type { ReactElement } from "react";

export const ProvideTheme = ({ children }: { children: ReactElement }) => {
  return (
    <ThemeProvider theme={defineThemes()}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

function defineThemes() {
  return createTheme({
    palette: {
      text: { primary: "#FF0000", secondary: "#00FF00" },
    },
    typography: {
      fontFamily: "Blackletter",
      fontSize: 16,
    },
  });
}
