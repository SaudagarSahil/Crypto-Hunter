import axios, { AxiosRequestConfig } from "axios";
import React, { useEffect, useState } from "react";
import { CryptoState } from "../context/CryptoContext";
import { Constants } from "../shared/Constants";
import {
  Container,
  createTheme,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { Typography } from "@mui/material";

type Coin = {
  CoinInfo: {
    Name: string;
    ImageUrl: string;
    Internal: string;
    FullName: string;
  };
  DISPLAY: {
    [key: string]: { PRICE: string; CHANGEPCTDAY: string; MKTCAP: string };
  };
  RAW: {
    [key: string]: { PRICE: string; CHANGEPCTDAY: string; MKTCAP: string };
  };
};

interface Config extends AxiosRequestConfig {
  method: string;
  //   maxBodyLength: number;
  //   maxContentLength: number;
  url: string;
  headers: { Accept: string; authorization: string };
}

const CoinsTable: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [coins, setCoins] = useState<Coin[]>([]);

  const { currency } = CryptoState();

  let darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#ffffff",
      },
    },
  });

  let config: Config = {
    method: "get",
    url: `${Constants.BASE_URL}/top/totalvolfull?limit=10&tsym=USD`,
    headers: {
      Accept: "application/json",
      authorization: import.meta.env.VITE_CRYPTOCOMPARE_APIKEY || "",
    },
  };

  const fetchTableData = () => {
    setLoading(true);
    axios
      .request(config)
      .then((response) => {
        // setLoading(false);
        if (response.data.Message == "Success") {
          console.log("Table Data", response?.data?.Data);
          setCoins(response?.data?.Data);
        } else {
          console.log("Something went wrong while fetching Table Data");
        }
      })
      .catch((error) => {
        // setLoading(false);
        console.log("Error while fetching Table Data", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSearch = () => {
    return coins.filter((coin) =>
      coin?.CoinInfo.Name.toLowerCase().includes(search)
    );
  };

  useEffect(() => {
    fetchTableData();
  }, [currency]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <Typography variant="h4">
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress sx={{ backgroundColor: "gold" }} />
          ) : (
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {["Coin", "Price", "24 Hour Change", "Market Cap"].map(
                    (head) => (
                      <TableCell key={head}>{head}</TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch().map((row) => {
                  const profit = row?.DISPLAY?.USD?.CHANGEPCTDAY ?? 0.0;
                  const isProfit = +profit > 0;
                  console.log("Last 24 hours profit", profit);
                  return (
                    <TableRow>
                      <TableCell>
                        <img
                          src={`${Constants.BASE_IMAGE_URL}${row.CoinInfo.ImageUrl}`}
                          alt={row.CoinInfo.Internal}
                          style={{
                            height: "120px",
                            width: "120px",
                          }}
                        />
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                          }}
                        >
                          <span>{row.CoinInfo.Internal}</span>
                          <span>{row.CoinInfo.FullName}</span>
                        </div>
                      </TableCell>
                      <TableCell>{row?.DISPLAY?.USD?.PRICE}</TableCell>
                      <TableCell
                        // align="right"
                        style={{
                          color: isProfit ? "rgb(14, 203, 129)" : "red",
                          fontWeight: 500,
                        }}
                      >
                        {isProfit && "+"}
                        {profit}%
                      </TableCell>
                      <TableCell>{row?.DISPLAY?.USD?.MKTCAP}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
