import {
  AppBar,
  Container,
  createTheme,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import "../styles/header.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../context/CryptoContext";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const { currency, setCurrency } = CryptoState();
  console.log("currency", currency);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#ffffff",
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar
        sx={{
          // backgroundColor: "#e6ffe6",
          paddingY: 1,
        }}
        color="inherit"
        position="static"
      >
        <Container>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography
              variant="h5"
              className="title"
              sx={{
                color: "gold",
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              Crypto Hunter
            </Typography>
            <FormControl>
              {/* <InputLabel id="select">Currency</InputLabel> */}
              <Select
                labelId="select"
                sx={{
                  width: "100px",
                  height: '40px'
                }}
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value={"INR"}>INR</MenuItem>
                <MenuItem value={"USD"}>USD</MenuItem>
              </Select>
            </FormControl>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
