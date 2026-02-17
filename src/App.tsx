
import { Container } from "@mui/material";
import Home from "./pages/Home.js";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
    const theme = createTheme({
      palette: {
        primary: {
          main: "#1976d2"
        },
        secondary: {
          main: "#9c27b0"
        }
      },
      typography: {
        fontFamily: "Roboto, sans-serif"
      }
    });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Home />
      </Container>
    </ThemeProvider>
  );
}

export default App;

