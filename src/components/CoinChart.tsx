import React, { useEffect, useState } from "react";
import { Constants } from "../shared/Constants";
import axios from "axios";
import { CryptoState } from "../context/CryptoContext";
import CoinCandleChart from "./CoinCandleChart";
import { LinearProgress } from "@mui/material";
interface Config {
  method: string;
  url: string;
  params: { fsym: string | undefined; tsym: string | undefined; limit: number };
  headers: { Accept: string };
}
const CoinChart: React.FC<{ coinSymbol: string | undefined }> = ({
  coinSymbol,
}) => {
  const [coinData, setCoinData] =
    useState<
      { time: number; open: number; high: number; low: number; close: number }[]
    >();
  const [loading, setLoading] = useState<boolean>(false);

  const { currency } = CryptoState();

  const limit: number = 1000;

  const config: Config = {
    method: "get",
    url: `${Constants.BASE_URL_MIN_API}/v2/histominute`,
    params: {
      fsym: coinSymbol,
      tsym: currency,
      limit: limit,
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
          console.log("Coin Historical Data: ", response.data.Data);
          setCoinData(response.data.Data.Data);
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
    <div>
      {loading ? <LinearProgress /> : <CoinCandleChart data={coinData} />}
    </div>
  );
};

export default CoinChart;
