import axios, { AxiosRequestConfig } from "axios";
import React, { useEffect, useState } from "react";
import { CryptoState } from "../context/CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { Constants } from "../shared/Constants";
import { Typography } from "@mui/material";

interface Config extends AxiosRequestConfig {
  method: string;
  url: string;
  params: { limit: number; tsym: string };
  headers: { Accept: string; authorization: string };
}

const Carousel: React.FC = () => {
  const [trending, setTrending] = useState<
    { CoinInfo: { Id: string; ImageUrl: string; Internal: string } }[]
  >([]);

  const { currency } = CryptoState();

  let config: Config = {
    method: "get",
    url: `${Constants.BASE_URL_MIN_API}/top/totalvolfull`,
    params: {
      limit: 10,
      tsym: "USD",
    },
    headers: {
      Accept: "Application/json",
      authorization: import.meta.env.VITE_CRYPTOCOMPARE_APIKEY,
    },
  };

  const fetchData = () => {
    axios
      .request(config)
      .then((response) => {
        console.log("Trending Icons Data: ", response.data.Data);
        setTrending(response.data.Data);
      })
      .catch((error) => console.log("Error :", error));
  };

  useEffect(() => {
    fetchData();
  }, [currency]);

  console.log("API DATA", trending);

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  const items = trending.map((coin) => {
    return (
      <Link style={{
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
      }} to={`/coins/${coin.CoinInfo.Internal}`}>
        <img
          src={`${Constants.BASE_IMAGE_URL}${coin.CoinInfo.ImageUrl}`}
          alt={coin.CoinInfo.Id}
          style={{
            height: "150px",
            width: "150px",
          }}
        />
        <Typography sx={{
          color: 'gold'
        }}>{coin.CoinInfo.Internal}</Typography>
      </Link>
    );
  });

  return (
    <div>
      <AliceCarousel
        infinite
        mouseTracking
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  );
};

export default Carousel;
