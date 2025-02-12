import React, { useEffect, useState } from "react";
import { CryptoState } from "../context/CryptoContext";
import { Constants } from "../shared/Constants";
import axios from "axios";
import { LinearProgress, Typography } from "@mui/material";

interface Config {
  method: string;
  url: string;
  params: { asset_symbol: string | undefined; api_key: string };
  headers: { Accept: string };
}

type CoinInfo = {
  LOGO_URL: string;
  NAME: string;
  ASSET_DESCRIPTION_SUMMARY: string;
  ID: string;
  PRICE_USD: string;
  TOTAL_MKT_CAP_USD: string;
};

const CoinInfo: React.FC<{ coinSymbol: string | undefined }> = ({ coinSymbol }) => {
  const [coinInfo, setCoinInfo] = useState<CoinInfo>();
  const [loading, setLoading] = useState<boolean>(false);

  const { currency, symbol } = CryptoState();
  const config: Config = {
    method: "get",
    url: `${Constants.BASE_URL_DATA_API}/by/symbol`,
    params: {
      asset_symbol: coinSymbol,
      api_key: import.meta.env.VITE_CRYPTOCOMPARE_APIKEY || "",
    },
    headers: {
      Accept: "application/json",
    },
  };

  const fetchCoinMetadata = () => {
    setLoading(true);
    axios
      .request(config)
      .then((response) => {
        if (response.status == 200) {
          console.log(response.data.Data);
          setCoinInfo(response.data.Data);
        } else {
          console.log(response.data.Err);
        }
      })
      .catch((error) => {
        console.log("Error while fetching coin metadata: ", error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCoinMetadata();
  }, []);
  return (
    <React.Fragment>
      {loading ? (
        <LinearProgress />
      ) : (
        <div>
          <img
            src={coinInfo?.LOGO_URL}
            alt={coinInfo?.NAME}
            height="200"
            style={{ marginBottom: 20 }}
          />
          <Typography variant="h3">{coinInfo?.NAME}</Typography>
          <Typography variant="subtitle1">
            {coinInfo?.ASSET_DESCRIPTION_SUMMARY}
          </Typography>
          <div>
            <span style={{ display: "flex" }}>
              <Typography variant="h5">Rank:</Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {coinInfo?.ID}
              </Typography>
            </span>

            <span style={{ display: "flex" }}>
              <Typography variant="h5">Current Price:</Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {/* {symbol} {coinInfo?.PRICE_USD} = */}
                {`${symbol} ${Number(coinInfo?.PRICE_USD).toFixed(2)}`}
              </Typography>
            </span>
            <span style={{ display: "flex" }}>
              <Typography variant="h5">Market Cap:</Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {`${symbol} ${Number(coinInfo?.TOTAL_MKT_CAP_USD)
                  .toFixed(0)
                  .toString()
                  .slice(0, 6)} M`}
              </Typography>
            </span>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default CoinInfo;
