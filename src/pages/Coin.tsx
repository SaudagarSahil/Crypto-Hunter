import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../context/CryptoContext";
import CoinInfo from "../components/CoinInfo";
import CoinChart from "../components/CoinChart";

const Coin: React.FC = () => {
  const { coinSymbol } = useParams();

  // const { currency, symbol } = CryptoState();

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 2 }}>
        <CoinInfo coinSymbol={coinSymbol} />
      </div>
      <div style={{ flex: 4 }}>
        <CoinChart coinSymbol={coinSymbol} />
      </div>
    </div>
  );
};

export default Coin;
