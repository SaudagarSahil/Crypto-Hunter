import axios, { AxiosRequestConfig } from "axios";
import React, { useEffect, useState } from "react";
import { CryptoState } from "../context/CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

interface Config extends AxiosRequestConfig {
  method: string;
  maxBodyLength: number;
  maxContentLength: number;
  url: string;
  headers: { Accept: string; "X-CoinApi-key": string };
}

const Carousel: React.FC = () => {
  const [Trending, setTrending] = useState<{ asset_id: string; url: string }[]>(
    []
  );

  const { currency } = CryptoState();

  let config: Config = {
    method: "get",
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
    url: "https://rest.coinapi.io/v1/assets/icons/2",
    headers: {
      Accept: "Application/json",
      "X-CoinApi-key": import.meta.env.VITE_COINAPI_APIKEY || "",
    },
  };

  const fetchData = () => {
    axios
      .request(config)
      .then((response) => {
        console.log(response);
        setTrending(response.data);
      })
      .catch((error) => console.log("Error :", error));
  };

  useEffect(() => {
    fetchData();
  }, [currency]);

  console.log("API DATA", Trending);

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  const items = Trending.slice(0, 10).map((coin) => {
    return (
      <Link to={`/coins/${coin.asset_id}`}>
        <img
          src={coin.url}
          alt={coin.asset_id}
          style={{
            height: "150px",
            width: "150px",
          }}
        />
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
